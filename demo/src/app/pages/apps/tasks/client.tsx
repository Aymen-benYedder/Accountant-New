import React, { useState, useEffect } from "react";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { useAuth } from "@app/_components/_core/AuthProvider/AuthContext";
import {
  Typography,
  Card,
  CardContent,
  IconButton,
  Stack,
  Box,
  Avatar,
  Chip,
  Container,
  TextField,
  MenuItem,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
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
  priority: 'low' | 'medium' | 'high' | 'urgent';
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
  
  const priorityInfo = priorityMap[priority];
  if (!priorityInfo) {
    console.error(`Unknown priority: ${priority}`);
    return <Chip label="Unknown" color="default" size="small" />;
  }
  
  const { label, color } = priorityInfo;
  return <Chip label={label} color={color as any} size="small" />;
};

// Task card component
function TaskCard({
  task,
  onView,
}: {
  task: TaskType;
  onView: () => void;
}) {
  const navigate = useNavigate();
  // Dummy usage to satisfy linter
  console.log(navigate);
  
  // Get initials for avatar
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };
  
  // Demo avatars
  const demoAvatars = [
    "/assets/images/avatar/avatar1.jpg",
    "/assets/images/avatar/avatar2.jpg",
    "/assets/images/avatar/avatar3.jpg",
    "/assets/images/avatar/avatar4.jpg",
    "/assets/images/avatar/avatar5.jpg",
    "/assets/images/avatar/avatar6.jpg",
  ];
  
  return (
    <Card
      sx={{
        mb: 2,
        px: 3,
        py: 2,
        display: "flex",
        alignItems: "center",
        flexDirection: { xs: "column", md: "row" },
        cursor: "pointer"
      }}
      onClick={onView}
    >
      {/* Task info */}
      <Box sx={{ flex: 2, minWidth: 0 }}>
        <Typography variant="h6" fontWeight={700} noWrap>
          {task.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {task.description}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          {getStatusChip(task.status)}
          {getPriorityChip(task.priority)}
        </Stack>
      </Box>
      
      {/* Created By */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mx: 3,
        minWidth: 150 
      }}>
        {task.createdBy && (
          <Avatar
            src={(task.createdBy && task.createdBy.profile_pic) || demoAvatars[0]}
            sx={{ width: 32, height: 32, mr: 1 }}
          >
            {task.createdBy ? getInitials(task.createdBy.name) : ''}
          </Avatar>
        )}
        <Typography variant="body2" noWrap>
          {task.createdBy?.name || 'Unknown'}
        </Typography>
      </Box>
      
      {/* Company */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mx: 3,
        minWidth: 150 
      }}>
        <Typography variant="body2" noWrap>
          {task.company?.name || 'Unknown Company'}
        </Typography>
      </Box>
      
      {/* Deadline */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mx: 3,
        minWidth: 120 
      }}>
        <Typography variant="body2" noWrap>
          {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No deadline'}
        </Typography>
      </Box>
      
      {/* Actions */}
      <Stack
        direction="row"
        spacing={0.5}
        sx={{
          ml: { xs: 0, sm: "auto" },
          alignSelf: { xs: "flex-end", sm: "center" },
          mt: { xs: 1, sm: 0 },
        }}
      >
        <IconButton
          size="small"
          color="primary"
          onClick={e => { e.stopPropagation(); onView(); }}
          aria-label="View"
        >
          <Visibility fontSize="small" />
        </IconButton>
      </Stack>
    </Card>
  );
}

// Main Client Task List Page Component
export default function ClientTasksListPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // Search & filter state
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterCompany, setFilterCompany] = useState("");
  
  // Fetch tasks assigned to the current user
  useEffect(() => {
    fetchClientTasks();
  }, []);
  
  const fetchClientTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch tasks assigned to the current user
      const res = await api.get<TaskType[]>(`/tasks?assignedTo=${user?._id}`);
      console.log('Fetched tasks:', res.data); // Add logging here
      setTasks(res.data);
    } catch (err: any) {
      console.error('Error fetching tasks:', err);
      setError(err.response?.data?.error || err.message || 'Error loading tasks');
    } finally {
      setLoading(false);
    }
  };
  
  // Memoized filtered tasks
  const filteredTasks = React.useMemo(() => {
    return tasks.filter(task => {
      // Search by title/description
      const searchText = search.trim().toLowerCase();
      const matchesSearch =
        !searchText ||
        task.title?.toLowerCase().includes(searchText) ||
        task.description?.toLowerCase().includes(searchText);
      // Filter by status
      const matchesStatus = !filterStatus || task.status === filterStatus;
      // Filter by priority
      const matchesPriority = !filterPriority || task.priority === filterPriority;
      // Filter by company
      const matchesCompany = !filterCompany || task.company?._id === filterCompany;
      return matchesSearch && matchesStatus && matchesPriority && matchesCompany;
    });
  }, [tasks, search, filterStatus, filterPriority, filterCompany]);

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
        <Typography sx={{ mt: 2 }}>Loading tasks...</Typography>
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
        <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
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
      {/* Search and filter toolbar */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ xs: "stretch", sm: "center" }} mb={3}>
        <Typography variant={"h2"} mb={3} sx={{ flex: 1 }}>
          My Tasks
        </Typography>
        <TextField
          size="small"
          label="Search"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          sx={{ minWidth: 180 }}
        />
        <TextField
          select
          size="small"
          label="Status"
          value={filterStatus}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterStatus(e.target.value)}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="in_progress">In Progress</MenuItem>
          <MenuItem value="submitted">Submitted</MenuItem>
          <MenuItem value="under_review">Under Review</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
        </TextField>
        <TextField
          select
          size="small"
          label="Priority"
          value={filterPriority}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterPriority(e.target.value)}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="urgent">Urgent</MenuItem>
        </TextField>
        {/* Company filter: collect unique companies from tasks */}
        <TextField
          select
          size="small"
          label="Company"
          value={filterCompany}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterCompany(e.target.value)}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="">All</MenuItem>
          {Array.from(new Map(tasks.map(t => [t.company?._id, t.company])).values())
            .filter(c => c && c._id)
            .map(company => (
              <MenuItem key={company._id} value={company._id}>{company.name}</MenuItem>
            ))}
        </TextField>
      </Stack>

      {filteredTasks.length === 0 ? (
        <Card>
          <CardContent>
            <Typography variant="h6" align="center" py={4}>
              You have no assigned tasks
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Box>
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onView={() => navigate(`/apps/tasks/${task._id}`)}
            />
          ))}
        </Box>
      )}
    </Container>
  );
}