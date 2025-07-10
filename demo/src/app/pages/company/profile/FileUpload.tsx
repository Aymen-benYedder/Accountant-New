import React, { useRef, useState } from "react";
import { Card, Button, Box, Alert, Typography, TextField, MenuItem, CircularProgress } from "@mui/material";
import { CloudUpload, ErrorOutline } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Progressbar } from "@app/_components/_core/Progressbar/Progressbar";

const ALLOWED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
  "text/csv",
];


const categories = [
  { value: "Invoice", label: "Invoice" },
  { value: "Contract", label: "Contract" },
  { value: "Tax", label: "Tax" },
  { value: "Report", label: "Report" },
];

type FileUploadProps = {
  companyId?: string;
  // refreshDocumentsKey is no longer used - removed
};

type FormInput = {
  file: File | null;
  category: string;
  description?: string;
};

export const FileUpload: React.FC<FileUploadProps> = ({ companyId }) => {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      file: null,
      category: "",
      description: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormInput) => {
      if (!data.file) throw new Error("No file selected");
      const formData = new FormData();
      formData.append("file", data.file);
      formData.append("company", companyId || "");
      formData.append("category", data.category);
      if (data.description) formData.append("description", data.description);

      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
      return await fetch(`${apiBaseUrl}/documents`, {
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`
        },
      });
    },
    onSuccess: async (res) => {
      if (res.ok) {
        // Invalidate the query with the exact key used in CompanyStoragePage
        await queryClient.invalidateQueries({ 
          queryKey: ['company-documents', companyId],
          refetchType: 'active' 
        });
        reset();
        setProgress(0);
      }
    },
  });

  // function validateFile(file: File | null): string | true {
  //   if (!file) return "File is required";
  //   if (file.size > MAX_SIZE) return "File too large (max 20MB)";
  //   if (!ALLOWED_TYPES.includes(file.type)) return "File type not allowed";
  //   return true;
  // }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setValue("file", file, { shouldValidate: true });
  }

  const currentFile = watch("file");

  return (
    <Card sx={{ mb: 5, p: 4, borderRadius: 4, boxShadow: 3 }}>
      <form
        onSubmit={handleSubmit((data) => mutation.mutate(data))}
        encType="multipart/form-data"
      >
        <Typography variant="h6" fontWeight={700} mb={1}>
          Upload Document
        </Typography>
        <Box
          sx={{
            border: dragOver ? "2px solid #1976d2" : "2px dashed #bdbdbd",
            p: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            bgcolor: dragOver ? "#e3f2fd" : "#fafcff",
            transition: "all 0.2s",
            mb: 2,
          }}
          onDragEnter={() => setDragOver(true)}
          onDragLeave={() => setDragOver(false)}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragOver(true);
          }}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
        >
          <CloudUpload sx={{ fontSize: 48, color: "#1976d2", mb: 1 }} />
          <Typography color="text.secondary">
            Drag & drop a file here, or <span style={{ textDecoration: "underline" }}>click to select</span>
          </Typography>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept={ALLOWED_TYPES.join(",")}
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files && e.target.files[0];
              if (file) setValue("file", file, { shouldValidate: true });
            }}
            tabIndex={-1}
          />
          {currentFile && (
            <Typography mt={1} fontSize={14} color="primary.main">
              {currentFile.name}
            </Typography>
          )}
        </Box>
        {errors.file && (
          <Alert severity="error" sx={{ mb: 2, alignItems: "center" }} icon={<ErrorOutline />}>
            {errors.file.message as string}
          </Alert>
        )}
        <Controller
          control={control}
          name="category"
          rules={{ required: "Category is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Category"
              fullWidth
              size="small"
              margin="dense"
              error={!!errors.category}
              helperText={errors.category?.message}
              sx={{ mb: 2, bgcolor: "#f5f7fa", borderRadius: 2 }}
              disabled={mutation.isPending}
            >
              <MenuItem value="">Select Category...</MenuItem>
              {categories.map((cat) => (
                <MenuItem value={cat.value} key={cat.value}>
                  {cat.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <TextField
              {...field}
              label="Description (optional)"
              fullWidth
              size="small"
              margin="dense"
              multiline
              maxRows={3}
              sx={{ mb: 2, bgcolor: "#f5f7fa", borderRadius: 2 }}
              disabled={mutation.isPending}
            />
          )}
        />
        <Box mt={2} display="flex" alignItems="center" gap={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={mutation.isPending}
            sx={{ px: 4, py: 1.3, borderRadius: 2, fontWeight: 700 }}
          >
            {mutation.isPending ? (
              <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
            ) : (
              "Upload"
            )}
          </Button>
          {mutation.isSuccess && !mutation.isPending && (
            <Typography color="success.main" ml={2} fontSize={15}>
              Uploaded!
            </Typography>
          )}
          {mutation.isError && (
            <Typography ml={2} color="error" display="flex" alignItems="center">
              <ErrorOutline sx={{ mr: 1, fontSize: 20 }} />
              {mutation.error instanceof Error
                ? mutation.error.message
                : "An error occurred!"}
            </Typography>
          )}
        </Box>
        {mutation.isPending && (
          <Box mt={3}>
            <Progressbar value={progress} />
          </Box>
        )}
      </form>
    </Card>
  );
};

export default FileUpload;