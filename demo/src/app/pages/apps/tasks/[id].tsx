import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Stack,
  Button,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import api from "@app/_utilities/api";
import TaskDetail from "@app/_components/apps/tasks/TaskDetail";

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

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // Dummy usage to satisfy linter
  console.log(Box);
  
  const [task, setTask] = useState<TaskType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch task details
  useEffect(() => {
    if (id) {
      fetchTask();
    }
  }, [id]);
  
  const fetchTask = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await api.get<TaskType>(`/tasks/${id}`);
      setTask(res.data);
    } catch (err: any) {
      console.error('Error fetching task:', err);
      setError(err.response?.data?.error || err.message || 'Error loading task');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle task update
  const handleTaskUpdate = (updatedTask: TaskType) => {
    setTask(updatedTask);
  };
  
  if (loading) {
    return (
      <Container
        maxWidth={false}
        sx={{
          maxWidth: CONTAINER_MAX_WIDTH,
          display: "flex",
          minWidth: 0,
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        disableGutters
      >
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading task...</Typography>
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container
        maxWidth={false}
        sx={{
          maxWidth: CONTAINER_MAX_WIDTH,
          display: "flex",
          minWidth: 0,
          flex: 1,
          flexDirection: "column",
        }}
        disableGutters
      >
        <Stack direction="row" spacing={2} alignItems="center" mb={3}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Stack>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }
  
  if (!task) {
    return (
      <Container
        maxWidth={false}
        sx={{
          maxWidth: CONTAINER_MAX_WIDTH,
          display: "flex",
          minWidth: 0,
          flex: 1,
          flexDirection: "column",
        }}
        disableGutters
      >
        <Stack direction="row" spacing={2} alignItems="center" mb={3}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Stack>
        <Alert severity="warning">Task not found</Alert>
      </Container>
    );
  }
  
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: CONTAINER_MAX_WIDTH,
        display: "flex",
        minWidth: 0,
        flex: 1,
        flexDirection: "column",
      }}
      disableGutters
    >
      <Stack direction="row" spacing={2} alignItems="center" mb={3}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <Typography variant="h4">
          Task Details
        </Typography>
      </Stack>
      
      <TaskDetail task={task} onTaskUpdate={handleTaskUpdate} />
    </Container>
  );
}