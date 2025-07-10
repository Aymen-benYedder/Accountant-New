import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  CircularProgress,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import api from "@app/_utilities/api";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  [key: string]: any;
}

// Default empty user for form resets (no password field for edit/add)
const emptyUser: Omit<User, "_id"> = {
  name: "",
  email: "",
  role: "user",
};

export default function UsersListPage() {
  const { t } = useTranslation();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<Omit<User, "_id">>(emptyUser);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Fetch all users
  function fetchUsers() {
    setLoading(true);
    setError(null);
    api
      .get<User[]>("/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
        console.log("[USERS] Loaded data:", res.data);
      })
      .catch((err) => {
        setError(err?.response?.data?.error || err.message);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  // --- Create / Update ---
  function handleOpenCreate() {
    setEditUser(null);
    setFormData(emptyUser);
    setDialogOpen(true);
  }

  function handleOpenEdit(user: User) {
    setEditUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "user",
    });
    setDialogOpen(true);
  }

  function handleCloseDialog() {
    setDialogOpen(false);
    setEditUser(null);
    setFormData(emptyUser);
  }

  function handleFormChange(field: string, value: string) {
    setFormData((fd) => ({ ...fd, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const req = editUser
      ? api.put<User>("/users/" + editUser._id, formData)
      : api.post<User>("/users", formData);
    req
      .then((res) => {
        handleCloseDialog();
        fetchUsers();
        console.log(editUser ? "Edited" : "Added", "user:", res.data);
      })
      .catch((err) => {
        setError(err?.response?.data?.error || err.message);
        setLoading(false);
      });
  }

  // --- Delete ---
  function handleDelete(id: string) {
    setDeleteId(id);
  }

  function handleConfirmDelete() {
    if (!deleteId) return;
    setLoading(true);
    api
      .delete("/users/" + deleteId)
      .then(() => {
        setDeleteId(null);
        fetchUsers();
        console.log("Deleted user with id:", deleteId);
      })
      .catch((err) => {
        setError(err?.response?.data?.error || err.message);
        setLoading(false);
      });
  }

  // --- UI ---
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h2" mb={3}>
        {t("views.title.users", "Users")}
      </Typography>
      <Button
        startIcon={<Add />}
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={handleOpenCreate}
      >
        Add User
      </Button>
      {loading && <CircularProgress />}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Role</strong></TableCell>
                <TableCell align="right"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleOpenEdit(user)}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(user._id)}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* --- Create/Edit Dialog --- */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editUser ? "Edit User" : "Add User"}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Stack spacing={2}>
              <TextField
                required
                label="Name"
                value={formData.name}
                onChange={(e) => handleFormChange("name", e.target.value)}
              />
              <TextField
                required
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleFormChange("email", e.target.value)}
              />
              <Select
                required
                value={formData.role}
                onChange={(e) => handleFormChange("role", e.target.value as string)}
                label="Role"
              >
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="client">Client</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {editUser ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* --- Delete confirmation dialog --- */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
