import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import {
  Download,
  Edit,
  Check,
} from "@mui/icons-material";
import api from "@app/_utilities/api";

// Task interfaces
interface TaskUser {
  _id: string;
  name: string;
  email: string;
  profile_pic?: string;
}

interface TaskCompany {
  _id: string;
  name: string;
}

interface TaskDocument {
  _id: string;
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
  path: string;
  task: string;
  uploadedBy: TaskUser;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface TaskType {
  _id: string;
  title: string;
  description: string;
  type: 'file_upload' | 'mission';
  createdBy: TaskUser;
  assignedTo: TaskUser;
  company: TaskCompany;
  status: 'pending' | 'in_progress' | 'submitted' | 'under_review' | 'completed' | 'rejected';
  deadline?: string;
  submittedAt?: string;
  reviewedAt?: string;
  completedAt?: string;
  requiredFileTypes?: string[];
  maxFileSize?: number;
  allowMultipleFiles?: boolean;
  reviewNotes?: string;
  clientNotes?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  documents?: TaskDocument[];
  createdAt: string;
  updatedAt: string;
}

// Status display component
const getStatusChip = (status: TaskType['status']) => {
  const statusMap = {
    pending: { label: 'Pending', color: 'default' },
    in_progress: { label: 'In Progress', color: 'primary' },
    submitted: { label: 'Submitted', color: 'warning' },
    under_review: { label: 'Under Review', color: 'info' },
    completed: { label: 'Completed', color: 'success' },
    rejected: { label: 'Rejected', color: 'error' },
  };
  
  const { label, color } = statusMap[status];
  return <Chip label={label} color={color as any} size="small" />;
};

// Priority display component
const getPriorityChip = (priority: TaskType['priority']) => {
  const priorityMap = {
    low: { label: 'Low', color: 'default' },
    medium: { label: 'Medium', color: 'primary' },
    high: { label: 'High', color: 'warning' },
    urgent: { label: 'Urgent', color: 'error' },
  };
  
  const { label, color } = priorityMap[priority];
  return <Chip label={label} color={color as any} size="small" />;
};

// File size formatter
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

interface ClientTaskViewProps {
  task: TaskType;
  onTaskUpdate: (updatedTask: TaskType) => void;
}

const ClientTaskView: React.FC<ClientTaskViewProps> = ({ task, onTaskUpdate }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [submitNotes, setSubmitNotes] = useState("");
  
  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check file type if restrictions exist
      if (task.requiredFileTypes && task.requiredFileTypes.length > 0) {
        const fileExt = selectedFile.name.split('.').pop()?.toLowerCase();
        if (fileExt && !task.requiredFileTypes.includes(fileExt)) {
          setUploadError(`File type not allowed. Allowed types: ${task.requiredFileTypes.join(', ')}`);
          return;
        }
      }
      
      // Check file size
      if (task.maxFileSize && selectedFile.size > task.maxFileSize) {
        setUploadError(`File size exceeds limit of ${formatFileSize(task.maxFileSize)}`);
        return;
      }
      
      setFile(selectedFile);
      setUploadError(null);
    }
  };
  
  // Handle file upload
  const handleFileUpload = async () => {
    if (!file) return;
    
    try {
      setUploadLoading(true);
      setUploadError(null);
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('company', task.company._id);
      formData.append('category', 'task');
      formData.append('description', `Document for task: ${task.title}`);
      formData.append('task', task._id);
      
      await api.post('/documents', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      // Refresh task data
      const res = await api.get<TaskType>(`/tasks/${task._id}`);
      onTaskUpdate(res.data);
      
      setFile(null);
    } catch (err: any) {
      setUploadError(err.response?.data?.error || err.message || 'Upload failed');
    } finally {
      setUploadLoading(false);
    }
  };
  
  // Handle task submission
  const handleSubmitTask = async () => {
    try {
      const res = await api.post<TaskType>(`/tasks/${task._id}/submit`, {
        clientNotes: submitNotes,
      });
      onTaskUpdate(res.data);
      setSubmitDialogOpen(false);
      setSubmitNotes("");
    } catch (err: any) {
      console.error('Error submitting task:', err);
    }
  };
  
  // Download document
  const handleDownloadDocument = async (documentId: string) => {
    try {
      const res = await api.get(`/documents/${documentId}/download`, {
        responseType: 'blob',
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', res.headers['content-disposition']?.split('filename=')[1] || 'document');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err: any) {
      console.error('Error downloading document:', err);
    }
  };
  
  return (
    <Box>
      {/* Task Header */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Box>
              <Typography variant="h4" fontWeight={700} mb={1}>
                {task.title}
              </Typography>
              <Stack direction="row" spacing={1}>
                {getStatusChip(task.status)}
                {getPriorityChip(task.priority)}
              </Stack>
            </Box>
            <Box>
              {task.status === 'pending' || task.status === 'rejected' ? (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Edit />}
                  onClick={() => {
                    // Set task to in_progress
                    api.put(`/tasks/${task._id}`, { status: 'in_progress' })
                      .then(res => onTaskUpdate(res.data));
                  }}
                >
                  Start Task
                </Button>
              ) : task.status === 'in_progress' ? (
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<Check />}
                  onClick={() => setSubmitDialogOpen(true)}
                >
                  Submit Task
                </Button>
              ) : null}
            </Box>
          </Stack>
          
          <Typography variant="body1" color="text.secondary" mb={2}>
            {task.description}
          </Typography>
          
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
            {/* Created By */}
            <Box>
              <Typography variant="subtitle2" color="text.secondary" mb={1}>
                Created By
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {task.createdBy.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {task.createdBy.email}
              </Typography>
            </Box>
            
            {/* Company */}
            <Box>
              <Typography variant="subtitle2" color="text.secondary" mb={1}>
                Company
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {task.company.name}
              </Typography>
            </Box>
            
            {/* Deadline */}
            {task.deadline && (
              <Box>
                <Typography variant="subtitle2" color="text.secondary" mb={1}>
                  Deadline
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  {new Date(task.deadline).toLocaleDateString()}
                </Typography>
              </Box>
            )}
          </Stack>
        </CardContent>
      </Card>
      
      {/* File Upload Section (for file_upload tasks) */}
      {task.type === 'file_upload' && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" mb={2}>
              Upload Documents
            </Typography>
            
            {task.requiredFileTypes && task.requiredFileTypes.length > 0 && (
              <Typography variant="body2" color="text.secondary" mb={2}>
                Required file types: {task.requiredFileTypes.join(', ')}
              </Typography>
            )}
            
            {task.maxFileSize && (
              <Typography variant="body2" color="text.secondary" mb={2}>
                Maximum file size: {formatFileSize(task.maxFileSize)}
              </Typography>
            )}
            
            <Stack direction="row" spacing={2} alignItems="center">
              <input
                accept={task.requiredFileTypes ? `.${task.requiredFileTypes.join(',.')}` : "*"}
                style={{ display: "none" }}
                id="file-upload"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload">
                <Button variant="outlined" component="span" startIcon={<Edit />}>
                  Choose File
                </Button>
              </label>
              
              {file && (
                <Box>
                  <Typography variant="body2">
                    {file.name} ({formatFileSize(file.size)})
                  </Typography>
                </Box>
              )}
              
              <Button
                variant="contained"
                startIcon={<Check />}
                onClick={handleFileUpload}
                disabled={!file || uploadLoading}
              >
                {uploadLoading ? 'Uploading...' : 'Upload'}
              </Button>
            </Stack>
            
            {uploadError && (
              <Typography color="error" mt={1}>
                {uploadError}
              </Typography>
            )}
          </CardContent>
        </Card>
      )}
      
      {/* Documents Section */}
      {task.documents && task.documents.length > 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" mb={2}>
              Uploaded Documents
            </Typography>
            
            <List>
              {task.documents.map((doc) => (
                <ListItem key={doc._id} divider>
                  <ListItemText
                    primary={doc.originalname}
                    secondary={`${formatFileSize(doc.size)} • Uploaded on ${new Date(doc.createdAt).toLocaleDateString()}`}
                  />
                  <ListItemSecondaryAction>
                    <Tooltip title="Download">
                      <IconButton
                        edge="end"
                        onClick={() => handleDownloadDocument(doc._id)}
                      >
                        <Download />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
      
      {/* Notes Section */}
      {(task.clientNotes || task.reviewNotes) && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" mb={2}>
              Notes
            </Typography>
            
            {task.clientNotes && (
              <Box mb={2}>
                <Typography variant="subtitle2" color="text.secondary" mb={1}>
                  Your Notes
                </Typography>
                <Typography variant="body2">{task.clientNotes}</Typography>
              </Box>
            )}
            
            {task.reviewNotes && (
              <Box>
                <Typography variant="subtitle2" color="text.secondary" mb={1}>
                  Review Notes
                </Typography>
                <Typography variant="body2">{task.reviewNotes}</Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      )}
      
      {/* Submit Task Dialog */}
      <Dialog open={submitDialogOpen} onClose={() => setSubmitDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Submit Task</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Notes (optional)"
            multiline
            rows={4}
            value={submitNotes}
            onChange={(e) => setSubmitNotes(e.target.value)}
            placeholder="Add any notes about your submission..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSubmitDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmitTask}
            disabled={!submitNotes.trim()}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClientTaskView;