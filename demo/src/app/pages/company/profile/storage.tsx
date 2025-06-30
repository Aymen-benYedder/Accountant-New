import { FileUpload } from "./FileUpload";
import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Typography,
  Button,
  CircularProgress,
  Alert,
  InputAdornment,
  MenuItem,
  TextField,
  Chip,
  Card,
  List,
  Avatar,
  Box,
  Stack,
  Divider,
  Tooltip,
  CardHeader,
  CardContent,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import {
  Search as SearchIcon,
  Download as DownloadIcon,
  PictureAsPdf as PdfIcon,
  Image as ImageIcon,
  InsertDriveFile as GenericFileIcon,
  InsertChart as ExcelIcon,
  TableChart as TableIcon,
  TextSnippet as TextIcon,
  InsertDriveFileOutlined as WordIcon,
} from "@mui/icons-material";
import api from "@app/_utilities/api";

// Type definitions
type Owner = { _id: string; name: string; email?: string };
type Company = { _id: string; name: string };
type Document = {
  _id: string;
  originalname: string;
  filename: string;
  category: string;
  owner: Owner;
  company: Company;
  description: string;
  createdAt: string;
  size?: number;
  path: string;
};

const formatDate = (dateStr: string): string =>
  new Date(dateStr).toLocaleString(undefined, {
    year: "2-digit",
    month: "short",
    day: "2-digit",
  });

const categoryColors: Record<string, string> = {
  Invoice: "#16a34a",
  Contract: "#2563eb",
  Tax: "#d97706",
  Report: "#db2777",
};

function getInitials(name: string, email?: string) {
  if (name && name.trim()) {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "U";
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  if (email) return email[0].toUpperCase();
  return "U";
}
const demoDocColors = [
  "#38b6ff", "#ffaa2c", "#00c9a7", "#f86868", "#845ec2", "#ffc75f", "#f9f871"
];

// Select icon based on extension
function getIconByExtension(filename: string) {
  const ext = filename.split('.').pop()?.toLowerCase();
  switch (ext) {
    case "pdf":
      return <PdfIcon sx={{ color: "#e03e32" }} fontSize="medium" />;
    case "xls":
    case "xlsx":
      return <ExcelIcon sx={{ color: "#359852" }} fontSize="medium" />;
    case "csv":
      return <TableIcon sx={{ color: "#359892" }} fontSize="medium" />;
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return <ImageIcon sx={{ color: "#1774c0" }} fontSize="medium" />;
    case "doc":
    case "docx":
      return <WordIcon sx={{ color: "#2765b5" }} fontSize="medium" />;
    case "txt":
      return <TextIcon sx={{ color: "#4c5157" }} fontSize="medium" />;
    default:
      return <GenericFileIcon sx={{ color: "#b69c5c" }} fontSize="medium" />;
  }
}

// Minimal, horizontally-aligned Document Row
function DocumentCardRow(props: { doc: Document; idx: number; groupIdx: number }) {
  const { doc, idx, groupIdx } = props;
  return (
    <Card
      sx={{
        mb: 1.8,
        px: 1.3,
        py: 1.1,
        minHeight: 48,
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        boxShadow: 0,
        borderRadius: 2.2,
        background: "#ffffff",
        border: "1px solid #e5e6e7",
        gap: 2,
        "&:hover": { boxShadow: 3, borderColor: "primary.light", background: "#f9fafb" },
      }}
      elevation={0}
    >
      {/* Doc icon */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 46,
          height: 46,
          mr: 1.3,
          bgcolor: demoDocColors[(idx + groupIdx) % demoDocColors.length] + "22",
          borderRadius: 2,
        }}
      >
        {getIconByExtension(doc.originalname)}
      </Box>
      {/* Main info (no wrap, tighter) */}
      <Box sx={{
        flex: 2,
        minWidth: 100,
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}>
        <Tooltip title={doc.originalname} followCursor>
          <Typography variant="subtitle1" fontWeight={600} noWrap minWidth={0} sx={{ fontSize: 15, mr: 1.1, color: "#101622" }}>
            {doc.originalname}
          </Typography>
        </Tooltip>
        <Chip
          size="small"
          label={doc.category}
          sx={{
            bgcolor: categoryColors[doc.category] || "#bdbebe",
            color: "white",
            fontWeight: 600,
            letterSpacing: 0.2,
            fontSize: 12,
            height: 21,
          }}
        />
      </Box>
      {/* Owner/Date info (row) */}
      <Stack direction="row" alignItems="center" gap={1} flex={1} minWidth={120} sx={{ ml: 0.8 }}>
        <Avatar
          sx={{ width: 27, height: 27, bgcolor: "#e0e7ef", color: "#1e293b", fontWeight: 700, fontSize: 13 }}
          variant="circular"
        >
          {getInitials(doc.owner?.name, doc.owner?.email)}
        </Avatar>
        <Typography variant="caption" fontWeight={500} sx={{ color: "#2f3847", fontSize: 13, minWidth: 65 }} noWrap>
          {doc.owner?.name}
        </Typography>
        <Typography variant="caption" fontWeight={400} sx={{ color: "#556", fontSize: 13, minWidth: 42 }}>
          {formatDate(doc.createdAt)}
        </Typography>
        {doc.size && (
          <Typography
            variant="caption"
            sx={{ color: "#868787", fontSize: 12, minWidth: 32 }}
          >
            {Math.round(doc.size / 1024)} KB
          </Typography>
        )}
      </Stack>
      {/* Download button */}
      <Box flex={0} ml="auto">
        <Button
          href={doc.path}
          target="_blank"
          download
          size="small"
          variant="outlined"
          color="primary"
          aria-label="Download file"
          startIcon={<DownloadIcon />}
          sx={{
            fontWeight: 700,
            px: 2,
            borderRadius: 2.2,
            fontSize: 14,
            ml: 1.3,
            minWidth: 89,
            boxShadow: 0,
          }}
        >
          Download
        </Button>
      </Box>
    </Card>
  );
}


// ...rest of CompanyStoragePage code remains unchanged, including advanced filters and rendering

function CompanyStoragePage() {
  const { id } = useParams<{ id: string }>();

  const [globalFilter, setGlobalFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [ownerFilter, setOwnerFilter] = useState<string>("");
  const [groupBy, setGroupBy] = useState<"none" | "category" | "owner">("none");
  const [yearFilter, setYearFilter] = useState<string>("");
  const [monthFilter, setMonthFilter] = useState<string>("");

  const { data, isLoading, isError, error } = useQuery<Document[], Error>({
    queryKey: ["company-documents", id],
    queryFn: async () => {
      const res = await api.get(`/documents?company=${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const availableYears = useMemo(
    () =>
      data
        ? Array.from(
            new Set(
              data.map(doc => new Date(doc.createdAt).getFullYear())
            )
          ).sort((a, b) => b - a)
        : [],
    [data]
  );

  const availableMonths = useMemo(() => {
    if (!yearFilter) return [];
    return Array.from(
      new Set(
        data
          ?.filter((doc) => new Date(doc.createdAt).getFullYear().toString() === yearFilter)
          .map(doc => new Date(doc.createdAt).getMonth() + 1)
      ) || []
    ).sort((a, b) => a - b);
  }, [data, yearFilter]);

  const filteredData = useMemo(() => {
    let docs = data || [];
    if (categoryFilter) docs = docs.filter((d) => d.category === categoryFilter);
    if (ownerFilter) docs = docs.filter((d) => d.owner?._id === ownerFilter);
    if (yearFilter) docs = docs.filter((d) => new Date(d.createdAt).getFullYear().toString() === yearFilter);
    if (monthFilter) docs = docs.filter((d) => (new Date(d.createdAt).getMonth() + 1).toString() === monthFilter);
    if (globalFilter) {
      const lower = globalFilter.toLowerCase();
      docs = docs.filter(
        (d) =>
          d.originalname.toLowerCase().includes(lower) ||
          d.category.toLowerCase().includes(lower) ||
          (d.owner?.name?.toLowerCase().includes(lower) ?? false) ||
          (d.description?.toLowerCase().includes(lower) ?? false)
      );
    }
    return docs;
  }, [data, categoryFilter, ownerFilter, yearFilter, monthFilter, globalFilter]);

  const uniqueCategories = useMemo(
    () =>
      filteredData
        ? Array.from(new Set(filteredData.map(doc => doc.category).filter(Boolean))).sort()
        : [],
    [filteredData]
  );

  const uniqueOwners = useMemo(
    () =>
      filteredData
        ? Array.from(
            new Map(
              filteredData
                .filter((doc) => doc.owner?.name?.trim())
                .map(doc => [doc.owner._id, doc.owner])
            ).values()
          )
        : [],
    [filteredData]
  );

  const groupedRows = useMemo(() => {
    if (groupBy === "none") return [{ group: null, rows: filteredData }];
    const groups = new Map<string, Document[]>();
    for (const doc of filteredData) {
      let key =
        groupBy === "category"
          ? doc.category
          : doc.owner?.name || "Unknown";
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(doc);
    }
    return Array.from(groups.entries()).map(([group, rows]) => ({
      group,
      rows,
    }));
  }, [filteredData, groupBy]);

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", pb: 8 }}>
{/* --- File Upload (World-class, Advanced, Secure) --- */}
      <FileUpload companyId={id} />
      <Box maxWidth="xl" mx="auto" pt={5} px={{ xs: 1, md: 3 }}>
        <Stack direction={{ xs: "column", md: "row" }} alignItems="center" justifyContent="space-between" spacing={2} mb={2}>
          <Typography variant="h3" fontWeight={700} color="primary.main">
            Company Storage Space
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to={`/company/profile/${id}`}
            sx={{ minWidth: 140 }}
          >
            ← Back to Profile
          </Button>
        </Stack>
        <Card sx={{
          p: { xs: 1, md: 2 },
          pt: 2,
          bgcolor: "background.paper",
          mb: 3,
          boxShadow: 3,
          borderRadius: 4
        }}>
          <CardHeader
            title={<Typography variant="h5" fontWeight={600}>Documents</Typography>}
            subheader={
              <Typography color="text.secondary">
                All documents for this company. Search, filter by type/date, group visually. Click to download.
              </Typography>
            }
            sx={{ pb: 1 }}
          />
          <CardContent sx={{ pt: 0 }}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="center" justifyContent="start" mb={3}>
              <TextField
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                variant="outlined"
                size="small"
                label="Search"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                sx={{ minWidth: 220, bgcolor: "#f3f4f6", borderRadius: 2 }}
              />
              <TextField
                select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                label="Category"
                size="small"
                sx={{ minWidth: 140, bgcolor: "#f3f4f6", borderRadius: 2 }}
              >
                <MenuItem value="">All Categories</MenuItem>
                {uniqueCategories.map(cat => (
                  <MenuItem key={cat} value={cat}>
                    <Chip size="small" label={cat} sx={{
                      bgcolor: categoryColors[cat] || "grey.300",
                      color: "white",
                      mr: 1
                    }} /> {cat}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                value={ownerFilter}
                onChange={(e) => setOwnerFilter(e.target.value)}
                label="Owner"
                size="small"
                sx={{ minWidth: 140, bgcolor: "#f3f4f6", borderRadius: 2 }}
              >
                <MenuItem value="">All Owners</MenuItem>
                {uniqueOwners.map(owner => (
                  <MenuItem key={owner._id} value={owner._id}>
                    {owner.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                value={yearFilter}
                onChange={(e) => { setYearFilter(e.target.value); setMonthFilter(""); }}
                label="Year"
                size="small"
                sx={{ minWidth: 100, bgcolor: "#f3f4f6", borderRadius: 2 }}
              >
                <MenuItem value="">All Years</MenuItem>
                {availableYears.map(year => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
              </TextField>
              <TextField
                select
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
                label="Month"
                size="small"
                sx={{ minWidth: 100, bgcolor: "#f3f4f6", borderRadius: 2 }}
                disabled={!yearFilter}
              >
                <MenuItem value="">All Months</MenuItem>
                {availableMonths.map(month => (
                  <MenuItem key={month} value={month}>
                    {new Date(2000, month - 1).toLocaleString(undefined, { month: "short" })}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value as "none" | "category" | "owner")}
                label="Group By"
                size="small"
                sx={{ minWidth: 130, bgcolor: "#f3f4f6", borderRadius: 2 }}
              >
                <MenuItem value="none">No Grouping</MenuItem>
                <MenuItem value="category">Category</MenuItem>
                <MenuItem value="owner">Owner</MenuItem>
              </TextField>
            </Stack>
            {isLoading ? (
              <Box py={6} display="flex" justifyContent="center"><CircularProgress /></Box>
            ) : isError ? (
              <Alert severity="error" sx={{ my: 2 }}>{error?.message || "Failed to load documents"}</Alert>
            ) : filteredData.length > 0 ? (
              groupedRows.map(
                (
                  { group, rows }: { group: string | null, rows: Document[] },
                  groupIdx: number
                ) => (
                  <Box key={String(group) + groupIdx} mb={5}>
                    {group && (
                      <Typography variant="subtitle2" color="primary" sx={{ mb: 2, fontWeight: 700, pl: 1 }}>
                        {groupBy === "category" ? "Category" : "Owner"}: <span className="ml-2">{group}</span>
                      </Typography>
                    )}
                    <List>
                      {rows.map((doc, idx: number) => (
                        <React.Fragment key={doc._id}>
                          <DocumentCardRow doc={doc} idx={idx} groupIdx={groupIdx} />
                          {idx < rows.length - 1 && <Divider component="li" />}
                        </React.Fragment>
                      ))}
                    </List>
                  </Box>
                )
              )
            ) : (
              <Typography sx={{ mt: 5 }}>No documents found for this company.</Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default CompanyStoragePage;