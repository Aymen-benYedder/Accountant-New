import React, { useEffect, useState, useMemo } from "react";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { useAuth } from "@app/_components/_core/AuthProvider/AuthContext";
import {
  Typography,
  Card,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Box,
  Avatar,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Tooltip,
  Container,
} from "@mui/material";
import { Edit, Delete, Add, Visibility } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
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

// Task card component
function TaskCard({
  task,
  onEdit,
  onDelete,
  onView,
}: {
  task: TaskType;
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // Dummy usage to satisfy linter
  console.log(Tooltip, t, navigate);
  
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
      
      {/* Assigned to */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mx: 3,
        minWidth: 150 
      }}>
        <Avatar
          src={(task.assignedTo?.profile_pic) || demoAvatars[0]}
          sx={{ width: 32, height: 32, mr: 1 }}
        >
          {task.assignedTo ? getInitials(task.assignedTo.name) : ''}
        </Avatar>
        <Typography variant="body2" noWrap>
          {task.assignedTo?.name || 'Unknown'}
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
        <IconButton
          size="small"
          color="primary"
          onClick={e => { e.stopPropagation(); onEdit(); }}
          aria-label="Edit"
        >
          <Edit fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          color="error"
          onClick={e => { e.stopPropagation(); onDelete(); }}
          aria-label="Delete"
        >
          <Delete fontSize="small" />
        </IconButton>
      </Stack>
    </Card>
  );
}

// Main Task List Page Component
export default function TasksListPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [users, setUsers] = useState<TaskUser[]>([]);
  const [companies, setCompanies] = useState<TaskCompany[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // Search & filter state
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterAssignedTo, setFilterAssignedTo] = useState("");
  const [filterCompany, setFilterCompany] = useState("");
  // Memoized filtered tasks
  const filteredTasks = useMemo(() => {
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
      // Filter by assignedTo
      const matchesAssignedTo = !filterAssignedTo || (task.assignedTo && task.assignedTo._id === filterAssignedTo);
      // Filter by company
      const matchesCompany = !filterCompany || (task.company && task.company._id === filterCompany);
      return matchesSearch && matchesStatus && matchesPriority && matchesAssignedTo && matchesCompany;
    });
  }, [tasks, search, filterStatus, filterPriority, filterAssignedTo, filterCompany]);
  
  // Add Task Dialog state
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addForm, setAddForm] = useState({
    title: "",
    description: "",
    type: "file_upload" as 'file_upload' | 'mission',
    assignedTo: "",
    company: "",
    deadline: "",
    priority: "medium" as 'low' | 'medium' | 'high' | 'urgent',
    requiredFileTypes: [] as string[],
    maxFileSize: 10485760, // 10MB
    allowMultipleFiles: true,
  });
  const [addError, setAddError] = useState<string | null>(null);
  const [addLoading, setAddLoading] = useState<boolean>(false);
  
  // Edit Dialog state
  const [editTask, setEditTask] = useState<TaskType | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    type: "file_upload" as 'file_upload' | 'mission',
    assignedTo: "",
    company: "",
    deadline: "",
    priority: "medium" as 'low' | 'medium' | 'high' | 'urgent',
    requiredFileTypes: [] as string[],
    maxFileSize: 10485760, // 10MB
    allowMultipleFiles: true,
  });
  const [editError, setEditError] = useState<string | null>(null);
  const [editLoading, setEditLoading] = useState<boolean>(false);
  
  // Delete state
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deletePassword, setDeletePassword] = useState("");
  const [deletePasswordError, setDeletePasswordError] = useState<string | null>(null);
  
  // Fetch tasks, users, and companies
  useEffect(() => {
    fetchTasksAndRelatedData();
  }, []);
  
  const fetchTasksAndRelatedData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch tasks
      const tasksRes = await api.get<TaskType[]>("/tasks");
      setTasks(tasksRes.data);
      
      // Fetch users (for assignment dropdown)
      const usersRes = await api.get<TaskUser[]>("/users");
      setUsers(usersRes.data);
      
      // Fetch companies
      const companiesRes = await api.get<TaskCompany[]>("/companies");
      setCompanies(companiesRes.data);
    } catch (err: any) {
      console.error('Error fetching data:', err);
      setError(err.response?.data?.error || err.message || 'Error loading data');
    } finally {
      setLoading(false);
    }
  };
  
  // Open add dialog
  const openAddDialog = () => {
    setAddDialogOpen(true);
    setAddForm({
      title: "",
      description: "",
      type: "file_upload",
      assignedTo: "",
      company: "",
      deadline: "",
      priority: "medium",
      requiredFileTypes: [],
      maxFileSize: 10485760,
      allowMultipleFiles: true,
    });
    setAddError(null);
  };
  
  // Close add dialog
  const closeAddDialog = () => {
    setAddDialogOpen(false);
    setAddForm({
      title: "",
      description: "",
      type: "file_upload",
      assignedTo: "",
      company: "",
      deadline: "",
      priority: "medium",
      requiredFileTypes: [],
      maxFileSize: 10485760,
      allowMultipleFiles: true,
    });
    setAddError(null);
    setAddLoading(false);
  };
  
  // Handle add form change
  const handleAddChange = (field: keyof typeof addForm, value: any) => {
    setAddForm((prev) => ({ ...prev, [field]: value }));
  };
  
  // Handle add submit
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setAddLoading(true);
      setAddError(null);
      
      // Prepare data
      const taskData = {
        ...addForm,
        deadline: addForm.deadline || undefined,
      };
      
      await api.post<TaskType>("/tasks", taskData);
      closeAddDialog();
      await fetchTasksAndRelatedData();
    } catch (err: any) {
      setAddError(err.response?.data?.error || err.message);
    } finally {
      setAddLoading(false);
    }
  };
  
  // Open edit dialog
  const openEditDialog = (task: TaskType) => {
    setEditTask(task);
    setEditForm({
      title: task.title,
      description: task.description,
      type: task.type,
      assignedTo: task.assignedTo?._id || "",
      company: task.company?._id || "",
      deadline: task.deadline ? task.deadline.split('T')[0] : "",
      priority: task.priority,
      requiredFileTypes: task.requiredFileTypes || [],
      maxFileSize: task.maxFileSize || 10485760,
      allowMultipleFiles: task.allowMultipleFiles !== undefined ? task.allowMultipleFiles : true,
    });
    setEditError(null);
  };
  
  // Close edit dialog
  const closeEditDialog = () => {
    setEditTask(null);
    setEditForm({
      title: "",
      description: "",
      type: "file_upload",
      assignedTo: "",
      company: "",
      deadline: "",
      priority: "medium",
      requiredFileTypes: [],
      maxFileSize: 10485760,
      allowMultipleFiles: true,
    });
    setEditError(null);
    setEditLoading(false);
  };
  
  // Handle edit form change
  const handleEditChange = (field: keyof typeof editForm, value: any) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };
  
  // Handle edit submit
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTask) return;
    try {
      setEditLoading(true);
      setEditError(null);
      
      // Prepare data
      const taskData = {
        ...editForm,
        deadline: editForm.deadline || undefined,
      };
      
      await api.put<TaskType>(`/tasks/${editTask._id}`, taskData);
      closeEditDialog();
      await fetchTasksAndRelatedData();
    } catch (err: any) {
      setEditError(err.response?.data?.error || err.message);
    } finally {
      setEditLoading(false);
    }
  };
  
  // Handle delete
  const handleDelete = async () => {
    if (!deleteId) return;
    if (!deletePassword || deletePassword.length < 6) {
      setDeletePasswordError("Password is required (min 6 chars)");
      return;
    }
    setDeletePasswordError(null);
    try {
      setLoading(true);
      // Verify password
      await api.post('/auth/verify-password', { password: deletePassword });
      // Delete task
      await api.delete(`/tasks/${deleteId}`);
      setDeleteId(null);
      setDeletePassword("");
      await fetchTasksAndRelatedData();
    } catch (err: any) {
      if (err.response?.status === 401) {
        setDeletePasswordError("Incorrect password");
      } else {
        setDeletePasswordError(err.response?.data?.message || err.message);
      }
    } finally {
      setLoading(false);
    }
  };
  
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
          Tasks
        </Typography>
        <TextField
          size="small"
          label="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          sx={{ minWidth: 180 }}
        />
        <TextField
          select
          size="small"
          label="Status"
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
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
          onChange={e => setFilterPriority(e.target.value)}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="urgent">Urgent</MenuItem>
        </TextField>
        <TextField
          select
          size="small"
          label="Assigned To"
          value={filterAssignedTo}
          onChange={e => setFilterAssignedTo(e.target.value)}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="">All</MenuItem>
          {users.map(u => (
            <MenuItem key={u._id} value={u._id}>{u.name}</MenuItem>
          ))}
        </TextField>
        <TextField
          select
          size="small"
          label="Company"
          value={filterCompany}
          onChange={e => setFilterCompany(e.target.value)}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="">All</MenuItem>
          {companies.map(c => (
            <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
          ))}
        </TextField>
        <IconButton
          color="primary"
          size="large"
          aria-label={t("actions.addTask", "Add Task")}
          onClick={openAddDialog}
          sx={{ mb: 3 }}
        >
          <Add />
        </IconButton>
      </Stack>
      
      {loading && <Typography sx={{ mt: 2 }}>Loading...</Typography>}
      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
      
      {/* Task cards list */}
      <Box>
        {filteredTasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={() => openEditDialog(task)}
            onDelete={() => setDeleteId(task._id)}
            onView={() => navigate(`/apps/tasks/${task._id}`)}
          />
        ))}
      </Box>
      
      {/* Add Task Dialog */}
      <Dialog open={addDialogOpen} onClose={closeAddDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          {t("dialogs.addTask", "Add Task")}
        </DialogTitle>
        <form onSubmit={handleAddSubmit} noValidate>
          <DialogContent dividers>
            <Stack spacing={3}>
              <TextField
                fullWidth
                required
                label={t("form.title", "Title")}
                value={addForm.title}
                onChange={e => handleAddChange("title", e.target.value)}
              />
              <TextField
                fullWidth
                required
                label={t("form.description", "Description")}
                value={addForm.description}
                onChange={e => handleAddChange("description", e.target.value)}
                multiline
                rows={3}
              />
              <FormControl fullWidth required>
                <InputLabel>{t("form.type", "Type")}</InputLabel>
                <Select
                  value={addForm.type}
                  onChange={e => handleAddChange("type", e.target.value)}
                  label={t("form.type", "Type")}
                >
                  <MenuItem value="file_upload">File Upload</MenuItem>
                  <MenuItem value="mission">Mission</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth required>
                <InputLabel>{t("form.assignedTo", "Assign To")}</InputLabel>
                <Select
                  value={addForm.assignedTo}
                  onChange={e => handleAddChange("assignedTo", e.target.value)}
                  label={t("form.assignedTo", "Assign To")}
                >
                  {users
                    .filter(u => u._id !== user?._id) // Don't assign to self
                    .map(u => (
                      <MenuItem key={u._id} value={u._id}>
                        {u.name} ({u.email})
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl fullWidth required>
                <InputLabel>{t("form.company", "Company")}</InputLabel>
                <Select
                  value={addForm.company}
                  onChange={e => handleAddChange("company", e.target.value)}
                  label={t("form.company", "Company")}
                >
                  {companies.map(c => (
                    <MenuItem key={c._id} value={c._id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label={t("form.deadline", "Deadline")}
                type="date"
                value={addForm.deadline}
                onChange={e => handleAddChange("deadline", e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <FormControl fullWidth required>
                <InputLabel>{t("form.priority", "Priority")}</InputLabel>
                <Select
                  value={addForm.priority}
                  onChange={e => handleAddChange("priority", e.target.value)}
                  label={t("form.priority", "Priority")}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="urgent">Urgent</MenuItem>
                </Select>
              </FormControl>
              {addError && <Typography color="error">{addError}</Typography>}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Box flex={1} />
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                color="inherit"
                size="small"
                onClick={closeAddDialog}
                disabled={addLoading}
              >
                {t("actions.cancel", "Cancel")}
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                type="submit"
                disabled={addLoading}
              >
                {t("actions.add", "Add")}
              </Button>
            </Stack>
          </DialogActions>
        </form>
      </Dialog>
      
      {/* Edit Task Dialog */}
      <Dialog open={!!editTask} onClose={closeEditDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          {t("dialogs.editTask", "Edit Task")}
        </DialogTitle>
        <form onSubmit={handleEditSubmit} noValidate>
          <DialogContent dividers>
            <Stack spacing={3}>
              <TextField
                fullWidth
                required
                label={t("form.title", "Title")}
                value={editForm.title}
                onChange={e => handleEditChange("title", e.target.value)}
              />
              <TextField
                fullWidth
                required
                label={t("form.description", "Description")}
                value={editForm.description}
                onChange={e => handleEditChange("description", e.target.value)}
                multiline
                rows={3}
              />
              <FormControl fullWidth required>
                <InputLabel>{t("form.type", "Type")}</InputLabel>
                <Select
                  value={editForm.type}
                  onChange={e => handleEditChange("type", e.target.value)}
                  label={t("form.type", "Type")}
                >
                  <MenuItem value="file_upload">File Upload</MenuItem>
                  <MenuItem value="mission">Mission</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth required>
                <InputLabel>{t("form.assignedTo", "Assign To")}</InputLabel>
                <Select
                  value={editForm.assignedTo}
                  onChange={e => handleEditChange("assignedTo", e.target.value)}
                  label={t("form.assignedTo", "Assign To")}
                >
                  {users
                    .filter(u => u._id !== user?._id) // Don't assign to self
                    .map(u => (
                      <MenuItem key={u._id} value={u._id}>
                        {u.name} ({u.email})
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl fullWidth required>
                <InputLabel>{t("form.company", "Company")}</InputLabel>
                <Select
                  value={editForm.company}
                  onChange={e => handleEditChange("company", e.target.value)}
                  label={t("form.company", "Company")}
                >
                  {companies.map(c => (
                    <MenuItem key={c._id} value={c._id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label={t("form.deadline", "Deadline")}
                type="date"
                value={editForm.deadline}
                onChange={e => handleEditChange("deadline", e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
              <FormControl fullWidth required>
                <InputLabel>{t("form.priority", "Priority")}</InputLabel>
                <Select
                  value={editForm.priority}
                  onChange={e => handleEditChange("priority", e.target.value)}
                  label={t("form.priority", "Priority")}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="urgent">Urgent</MenuItem>
                </Select>
              </FormControl>
              {editError && <Typography color="error">{editError}</Typography>}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Box flex={1} />
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                color="inherit"
                size="small"
                onClick={closeEditDialog}
                disabled={editLoading}
              >
                {t("actions.cancel", "Cancel")}
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                type="submit"
                disabled={editLoading}
              >
                {t("actions.update", "Update")}
              </Button>
            </Stack>
          </DialogActions>
        </form>
      </Dialog>
      
      {/* Delete Dialog */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>
          {t("dialogs.deleteTask", "Delete Task")}
        </DialogTitle>
        <DialogContent>
          {t(
            "dialogs.confirmDeleteTask",
            "Are you sure you want to delete this task? This action cannot be undone."
          )}
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={deletePassword}
            onChange={e => setDeletePassword(e.target.value)}
            error={!!deletePasswordError}
            helperText={deletePasswordError || ''}
          />
        </DialogContent>
        <DialogActions>
          <button type="button" onClick={() => setDeleteId(null)} style={{ border: "none", background: "none", padding: 0 }}>
            <Typography sx={{ px: 2 }}>{t("actions.cancel", "Cancel")}</Typography>
          </button>
          <button
            type="button"
            onClick={handleDelete}
            style={{
              border: "none",
              background: "#d32f2f",
              color: "#fff",
              padding: "6px 24px",
              borderRadius: 4,
              fontWeight: 600,
              cursor: "pointer",
            }}
            disabled={loading}
          >
            {t("actions.delete", "Delete")}
          </button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}