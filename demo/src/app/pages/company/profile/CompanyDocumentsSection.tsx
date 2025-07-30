import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
  CircularProgress,
  Tooltip,
  Chip,
  InputLabel,
  FormControl,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import UploadIcon from "@mui/icons-material/Upload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@app/_utilities/api";

type Document = {
  _id: string;
  name: string;
  category: string;
  url: string;
  uploadedAt: string;
};

type Category = {
  _id: string;
  name: string;
};

type Props = {
  companyId: string;
};

const CompanyDocumentsSection: React.FC<Props> = ({ companyId }) => {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  // Fetch categories (for selection)
  React.useEffect(() => {
    api.get("/categories")
      .then((res) => setCategories(res.data))
      .catch(() => setCategories([]));
  }, []);

  // Fetch all company documents
  const {
    data: documents,
    isLoading,
    isError,
    error,
  } = useQuery<Document[]>({
    queryKey: ["companyDocuments", companyId],
    queryFn: async () => {
      const res = await api.get(`/documents?company=${companyId}`);
      return res.data;
    },
    enabled: !!companyId,
  });

  // Upload Mutation
  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!selectedFile || !selectedCategory) throw new Error("Missing fields");
      setUploadError(null);
      setUploadLoading(true);

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("category", selectedCategory);
      formData.append("company", companyId);

      await api.post("/documents", formData);
    },
    onSuccess: () => {
      setUploadOpen(false);
      setSelectedFile(null);
      setSelectedCategory("");
      setUploadLoading(false);
      queryClient.invalidateQueries({ queryKey: ["companyDocuments", companyId] });
    },
    onError: (err: any) => {
      setUploadError(err?.response?.data?.error || err.message);
      setUploadLoading(false);
    }
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (docId: string) => {
      await api.delete(`/documents/${docId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companyDocuments", companyId] });
    }
  });

  // Download file
  const handleDownload = async (doc: Document) => {
    try {
      const res = await api.get(`/documents/${doc._id}/download`, {
        responseType: "blob",
      });
      const contentType = res.headers["content-type"];
      console.log("Download response headers:", res.headers);
      // Try to read the blob as text to check for error
      const blob = new Blob([res.data], { type: contentType });
      if (contentType && (contentType.includes("application/json") || contentType.includes("text/html"))) {
        const text = await blob.text();
        console.log("Download response text:", text);
        try {
          const error = JSON.parse(text);
          alert(error.error || "Failed to download file.");
        } catch {
          alert("Failed to download file. Server returned HTML or unknown error.");
        }
        return;
      }
      // If not error, download as file
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = doc.name || "document";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Download failed. Please try again.");
    }
  };

  // Group documents by category
  const docsByCategory: { [category: string]: Document[] } = React.useMemo(() => {
    if (!documents) return {};
    return documents.reduce((acc, doc) => {
      if (!acc[doc.category]) acc[doc.category] = [];
      acc[doc.category].push(doc);
      return acc;
    }, {} as { [category: string]: Document[] });
  }, [documents]);

  return (
    <Card elevation={2} sx={{ mb: 3.75 }}>
      <CardHeader
        title={
          <Stack direction="row" alignItems="center" spacing={1}>
            <InsertDriveFileIcon fontSize="medium" color="primary" />
            <Typography variant="h6" fontWeight={600}>
              Company Documents
            </Typography>
            <Chip
              label={documents ? documents.length : 0}
              size="small"
              color="default"
              sx={{ fontWeight: 700, ml: 1 }}
            />
          </Stack>
        }
        action={
          <Button
            variant="contained"
            startIcon={<UploadIcon />}
            onClick={() => setUploadOpen(true)}
            size="small"
            sx={{ minWidth: 120, fontWeight: 600 }}
          >
            Upload
          </Button>
        }
        sx={{
          background: theme => theme.palette.mode === "dark"
            ? theme.palette.grey[900]
            : "#f7f9fb",
          borderBottom: "1px solid #ededed",
        }}
      />
      <CardContent>
        {isLoading ? (
          <Stack alignItems="center" sx={{ minHeight: 96 }}>
            <CircularProgress />
          </Stack>
        ) : isError ? (
          <Typography color="error" align="center">
            Error loading documents: {error instanceof Error ? error.message : "Unknown error"}
          </Typography>
        ) : documents && documents.length === 0 ? (
          <Typography align="center" color="text.secondary">
            No documents uploaded yet.
          </Typography>
        ) : (
          <Box>
            {Object.entries(docsByCategory).map(([cat, docs]) => (
              <Box key={cat} mb={4}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, color: "primary.main" }}>
                  {categories.find(c => c._id === cat)?.name ?? cat}
                </Typography>
                <List dense sx={{
                  borderRadius: 2,
                  background: t => t.palette.mode === 'dark'
                    ? t.palette.background.paper
                    : "#fcfcfc",
                  boxShadow: "0 1px 4px rgba(25,40,80,0.05)",
                  border: "1px solid #eee",
                }}>
                  {docs.map(doc => (
                    <ListItem
                      key={doc._id}
                      divider
                      secondaryAction={
                        <Stack direction="row" spacing={1}>
                          <Tooltip title="Download">
                            <span>
                              <IconButton color="primary" size="small" onClick={() => handleDownload(doc)}>
                                <CloudDownloadIcon />
                              </IconButton>
                            </span>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <span>
                              <IconButton color="error" size="small"
                                disabled={deleteMutation.isPending}
                                onClick={() => deleteMutation.mutate(doc._id)}>
                                <DeleteIcon />
                              </IconButton>
                            </span>
                          </Tooltip>
                        </Stack>
                      }
                    >
                      <ListItemIcon>
                        <InsertDriveFileIcon color="disabled" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography fontWeight={500}>
                            {doc.name}
                          </Typography>
                        }
                        secondary={
                          <Typography color="text.secondary" variant="caption">
                            Uploaded {new Date(doc.uploadedAt).toLocaleString()}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))}
          </Box>
        )}
      </CardContent>

      {/* Upload Dialog */}
      <Dialog open={uploadOpen} onClose={() => setUploadOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Upload Document</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} pt={1}>
            <FormControl fullWidth required>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                value={selectedCategory}
                label="Category"
                onChange={e => setSelectedCategory(e.target.value as string)}
              >
                {categories.map(cat => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box>
              <input
                ref={fileInputRef}
                accept="*"
                style={{ display: "none" }}
                id="file-upload"
                type="file"
                onChange={e => {
                  const file = e.target.files?.[0] || null;
                  setSelectedFile(file);
                }}
              />
              <Button
                variant="outlined"
                startIcon={<UploadIcon />}
                size="medium"
                onClick={() => fileInputRef.current?.click()}
              >
                {selectedFile ? "Change File" : "Choose File"}
              </Button>
              <Typography variant="body2" component="span" sx={{ ml: 2 }}>
                {selectedFile ? selectedFile.name : "No file selected"}
              </Typography>
            </Box>
            {uploadError && <Typography color="error">{uploadError}</Typography>}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadOpen(false)} disabled={uploadLoading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => uploadMutation.mutate()}
            disabled={uploadLoading || !selectedFile || !selectedCategory}
          >
            {uploadLoading ? <CircularProgress size={20} /> : "Upload"}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default CompanyDocumentsSection;