import React, { useEffect, useState, useMemo } from "react";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
// Import the WebSocket hook directly
const useWebSocket = () => ({
  isUserOnline: (_userId: string) => false // Default implementation
});
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  IconButton,
  Box,
  Card,
  Avatar,
  Badge,
} from "@mui/material";
import { Add, Edit, Delete, Star, StarBorder } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import api from "@app/_utilities/api";

// --- JWT helper to decode and get current user role ---
function getCurrentUserJwt(): { userId: string | null, role: string | null } {
  const token = localStorage.getItem('token');
  if (!token) return { userId: null, role: null };
  try {
    // JWT: header.payload.signature
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return {
      userId: decoded && decoded._id ? decoded._id : null,
      role: decoded && decoded.role ? decoded.role : null
    };
  } catch {
    return { userId: null, role: null };
  }
}

// The shape of a user as returned by the API backend
interface BackendUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  isFavorite?: boolean; // Locally-tracked favorite state
  companies?: string[]; // Array of company ObjectId strings assigned to user
  online?: boolean;     // User online status
  profile_pic?: string; // Profile picture URL
}

// Data held in the user creation/update dialog form
interface UserFormData {
  name: string;
  email: string;
  role: string;
  password?: string; // Only needed for creating new users
  companies?: string[]; // Added for form to edit assigned companies
  profile_pic?: string; // Add profile_pic URL
}

// Default state for form data
const emptyUser: UserFormData = {
  name: "",
  email: "",
  role: "user",
  password: "",
  companies: [],
};

// A set of sample avatar image URLs to add color to the list UI
const demoAvatars = [
  "/assets/images/avatar/avatar1.jpg",
  "/assets/images/avatar/avatar2.jpg",
  "/assets/images/avatar/avatar3.jpg",
  "/assets/images/avatar/avatar4.jpg",
  "/assets/images/avatar/avatar5.jpg",
  "/assets/images/avatar/avatar6.jpg",
];

// Type for a single company, as fetched from backend
interface Company {
  _id: string;
  name: string;
  accountant?: string; // ID of the accountant managing this company
  owner?: string;     // ID of the owner of this company
  // Add new properties here
  address?: string;
  phone?: string;
  email?: string;
}

// Helper function for displaying initials if no user avatar is available
function getInitials(name: string, email?: string) {
  if (name && name.trim()) {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "U";
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  if (email) return email[0].toUpperCase();
  return "U";
}

// The user card as shown in the list.
// Shows: favorite star, avatar, name, email, role, edit/delete buttons.
function UserCard({
  user,
  onEdit,
  onDelete,
  onToggleFavorite,
  idx,
  companiesList,
  onCardClick,
  currentUserRole,
  onMessage,
}: {
  user: BackendUser;
  onEdit: () => void;
  onDelete: () => void;
  onToggleFavorite: () => void;
  idx: number;
  companiesList: Company[];
  onCardClick: () => void;
  currentUserRole: string | null;
  onMessage: () => void;
}) {
  const { isUserOnline } = useWebSocket();
  const theme = useTheme();
  // Remove unused isXs variable since we're not using it in the component
  useMediaQuery(theme.breakpoints.down('sm'));

  return (
    // Card container using MUI's <Card>
    <Card
      onClick={onCardClick}
      sx={{
        mb: 2,
        px: 2,
        py: 1,
        display: "flex",
        alignItems: "center",
        flexDirection: { xs: "column", sm: "row" },
        width: "100%",
        minWidth: 0,
        cursor: "pointer"
      }}
    >
      {/* Left: Favorite and Avatar */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          mr: { xs: 0, sm: 2 },
          mb: { xs: 1, sm: 0 },
          minWidth: 0,
        }}
      >
        <IconButton
          color={user.isFavorite ? "warning" : "default"}
          onClick={e => { e.stopPropagation(); onToggleFavorite(); }}
          size="small"
          sx={{ mr: 1 }}
          aria-label="Favorite"
        >
          {user.isFavorite ? <Star /> : <StarBorder />}
        </IconButton>
        {/* Avatar with online status badge (gray when offline) */}
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          invisible={!user._id} // Hide badge if no user ID
          classes={{
            badge: isUserOnline(user._id) ? "MuiBadge-badge MuiBadge-do" : "MuiBadge-badge MuiBadge-do offline"
          }}
          sx={{
            "& .MuiBadge-dot, & .MuiBadge-badge": {
              backgroundColor: isUserOnline(user._id) ? "#44b700" : "#999",
              color: isUserOnline(user._id) ? "#44b700" : "#999",
              borderRadius: "50%",
              height: 13,
              minWidth: 13,
              border: "2px solid white",
              boxShadow: "0 0 0 2px white",
              opacity: user._id ? 1 : 0.5
            }
          }}
        >
          <Avatar
            src={user.profile_pic || demoAvatars[idx % demoAvatars.length]}
            sx={{ width: 56, height: 56, fontWeight: 600, fontSize: 22 }}
          >
            {getInitials(user.name, user.email)}
          </Avatar>
        </Badge>
      </Box>
      {/* Center: User Info */}
      <Box sx={{ flex: 2, minWidth: 0, textAlign: { xs: "center", sm: "left" } }}>
        <Typography variant="h6" fontWeight={700} noWrap>
          {user.name || "-"}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {user.email}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textTransform: "capitalize" }}
          noWrap
        >
          {user.role}
        </Typography>
      </Box>
      {/* Middle: Company Avatars */}
      {user.role !== "admin" && Array.isArray(user.companies) && user.companies.length > 0 && (
        <Stack
          direction="row"
          spacing={0.5}
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
          sx={{
            flex: 1,
            minWidth: 0,
            mx: { xs: 0, sm: 2 },
            my: { xs: 1, sm: 0 },
          }}
        >
          {user.companies.map((companyId) => {
            const company = companiesList.find((c) => c._id === companyId);
            return (
              <Avatar
                key={companyId}
                sx={{
                  width: 28,
                  height: 28,
                  fontSize: 14,
                  bgcolor: "primary.light",
                  border: "2px solid #fff",
                  boxShadow: 1,
                }}
                alt={company?.name || ""}
              >
                {company?.name?.[0]?.toUpperCase() || "?"}
              </Avatar>
            );
          })}
        </Stack>
      )}
      {/* Right: Actions */}
      <Stack
        direction="row"
        spacing={0.5}
        sx={{
          ml: { xs: 0, sm: "auto" },
          alignSelf: { xs: "flex-end", sm: "center" },
          mt: { xs: 1, sm: 0 },
        }}
      >
        <IconButton size="small" onClick={e => { e.stopPropagation(); onEdit(); }} color="primary" aria-label="Edit">
          <Edit fontSize="small" />
        </IconButton>
        <IconButton size="small" color="error" onClick={e => { e.stopPropagation(); onDelete(); }} aria-label="Delete">
          <Delete fontSize="small" />
        </IconButton>
        {(currentUserRole === "accountant" && user.role === "owner") && (
          <IconButton
            size="small"
            color="info"
            onClick={e => {
              e.stopPropagation();
              onMessage();
            }}
            aria-label="Message Owner"
          >
<svg viewBox="0 0 24 24" style={{ width: 22, height: 22 }}>
  <path fill="none" stroke="currentColor" strokeWidth="2" d="M3 4h18c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H6l-3 3v-3H3c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
</svg>





          </IconButton>
        )}
      </Stack>
    </Card>
  );
}

/**
 * Main User List Page Component
 * - Fetches users from backend
 * - Displays user cards (see above)
 * - Provides dialogs for adding/editing users
 * - Handles user deletion with confirmation
 */
export default function UsersListPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { userId: currentUserId, role: currentUserRole } = getCurrentUserJwt();

  // ...
  // State for all users (fetched from backend)
  const [users, setUsers] = useState<BackendUser[]>([]);
  // Search & filter state
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterCompany, setFilterCompany] = useState("");
  // State for loading and errors
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Dialog open states
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editUser, setEditUser] = useState<BackendUser | null>(null);
  // Companies list for assignCompany multi-select
  const [companiesList, setCompaniesList] = useState<Company[]>([]);
  const [managedOwners, setManagedOwners] = useState<string[]>([]);

  // Helper to fetch companies from backend
  const fetchCompanies = async () => {
    try {
      const res = await api.get<Company[]>("/companies");
      setCompaniesList(res.data);
      // Add: If accountant, find owned owner ids.
      if (currentUserRole === "accountant" && currentUserId) {
        // Get owner user IDs for companies managed by this accountant
        const ownerIDs = Array.from(
          new Set(
            res.data
              .filter((c): c is Company & { accountant: string; owner: string } => 
                !!c.accountant && !!c.owner
              )
              .filter((c) => c.accountant === currentUserId)
              .map((c) => c.owner)
          )
        );
        setManagedOwners(ownerIDs);
      }
    } catch {
      setCompaniesList([]);
      setManagedOwners([]);
    }
  };

  useEffect(() => {
    if (dialogOpen) {
      fetchCompanies();
    }
  }, [dialogOpen]);
  // Form input state (controlled input)
  const [formData, setFormData] = useState<UserFormData>(emptyUser);
  // Deletion confirmation dialog
  const [deleteId, setDeleteId] = useState<string | null>(null);
  // Password error messaging (registration only)
  const [passwordError, setPasswordError] = useState<string | null>(null);
  // New: Password state for delete confirmation
  const [deletePassword, setDeletePassword] = useState<string>("");
  const [deletePasswordError, setDeletePasswordError] = useState<string | null>(null);
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null); // State for the selected file
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null); // State for image preview

  // Fetch users from backend on mount
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  // Fetch all users and reattach their favorite state from localStorage
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get<BackendUser[]>("/users");
      const result = res.data.map(u => ({
        ...u,
        isFavorite: getFavorite(u._id) // restore favorite state per user
      }));
      setUsers(result);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * STORE FAVORITES
   * We keep favorite state in localStorage so it persists across page reloads (for demo purposes).
   * In a production app, this could live in the backend.
   */
  function getFavorite(id: string) {
    if (typeof window === "undefined") return false;
    const favs = JSON.parse(localStorage.getItem("user_favs") || "{}");
    return !!favs[id];
  }
  function setFavorite(id: string, v: boolean) {
    const favs = JSON.parse(localStorage.getItem("user_favs") || "{}");
    if (v) favs[id] = true;
    else delete favs[id];
    localStorage.setItem("user_favs", JSON.stringify(favs));
  }

  // Opens the dialog for adding or editing a user. Prefills fields for editing.
  const openDialog = (user?: BackendUser) => {
    if (user) {
      setEditUser(user);
      setFormData({ name: user.name, email: user.email, role: user.role, companies: user.companies || [], profile_pic: user.profile_pic || "" }); // Include profile_pic
      setProfilePicPreview(user.profile_pic || null); // Set preview if existing user has pic
    } else {
      setEditUser(null);
      setFormData(emptyUser);
      setProfilePicPreview(null); // Clear preview for new user
    }
    setProfilePicFile(null); // Clear selected file
    setPasswordError(null);
    setDialogOpen(true);
  };

  // Close add/edit dialog and reset form state
  const closeDialog = () => {
    setDialogOpen(false);
    setEditUser(null);
    setFormData(emptyUser);
    setPasswordError(null);
    setProfilePicFile(null); // Clear selected file on close
    setProfilePicPreview(null); // Clear preview on close
  };

  // Handles all user input form changes
  const handleFormChange = (field: keyof UserFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    
    console.log("[Frontend] handleSubmit: Starting user form submission.");

    if (!editUser && (!formData.password || formData.password.length < 6)) {
      setPasswordError("Password is required (min 6 chars)");
      console.warn("[Frontend] handleSubmit: Password validation failed for new user.");
      return;
    }
    
    try {
      setLoading(true);
      let profilePicUrl = editUser?.profile_pic || ""; // Retain existing URL for edit mode
      console.log("[Frontend] handleSubmit: Initial profilePicUrl:", profilePicUrl);

      if (profilePicFile) {
        console.log("[Frontend] handleSubmit: Profile picture file selected. Uploading...");
        const formData = new FormData();
        formData.append('profile_pic', profilePicFile);
        try {
          const uploadRes = await api.post('/upload/profile-pic', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          profilePicUrl = uploadRes.data.fileUrl; // Get the URL of the uploaded file
          console.log("[Frontend] handleSubmit: Profile picture uploaded successfully. URL:", profilePicUrl);
        } catch (uploadErr: any) {
          const errorMessage = uploadErr.response?.data?.error || uploadErr.message || "Failed to upload profile picture";
          setError(errorMessage);
          setLoading(false);
          console.error("[Frontend] handleSubmit: Profile picture upload failed:", errorMessage, uploadErr);
          return;
        }
      } else {
        console.log("[Frontend] handleSubmit: No new profile picture file selected.");
      }

      const userData = {
        name: formData.name,
        email: formData.email,
        role: currentUserRole === "accountant" ? "owner" : formData.role,
        password: formData.password, // Only for new users, will be ignored by backend for updates
        companies: formData.companies,
        profile_pic: profilePicUrl, // Include profile picture URL
      };

      console.log("[Frontend] handleSubmit: Sending user data to backend:", userData);

      if (editUser) {
        console.log("[Frontend] handleSubmit: Updating existing user:", editUser._id);
        await api.put<BackendUser>(`/users/${editUser._id}`, userData);
        console.log("[Frontend] handleSubmit: User updated successfully.");
      } else {
        console.log("[Frontend] handleSubmit: Creating new user.");
        await api.post<BackendUser>("/users", userData);
        console.log("[Frontend] handleSubmit: User created successfully.");
      }
      closeDialog();
      await fetchUsers();
      await fetchCompanies();
      console.log("[Frontend] handleSubmit: Dialog closed, users and companies refetched.");
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message;
      setError(errorMessage);
      console.error("[Frontend] handleSubmit: User submission failed:", errorMessage, err);
    } finally {
      setLoading(false);
      console.log("[Frontend] handleSubmit: Submission process finished.");
    }
  };

  // Delete user after confirmation
  const confirmDelete = async () => {
    if (!deleteId) return;
    if (!deletePassword || deletePassword.length < 6) {
      setDeletePasswordError("Password is required (min 6 chars)");
      return;
    }
    setDeletePasswordError(null);
    try {
      setLoading(true);
      // New: Include password in delete request
      await api.delete(`/users/${deleteId}`, {
        data: { password: deletePassword }
      });
      setDeleteId(null);
      setDeletePassword("");
      await fetchUsers();
    } catch (err: any) {
      setDeletePasswordError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Toggle favorite star for a user (persist in localStorage, update UI state)
  const toggleFavorite = (id: string) => {
    setUsers(prev =>
      prev.map(user =>
        user._id === id ? { ...user, isFavorite: !user.isFavorite } : user
      )
    );
    setFavorite(id, !users.find(u => u._id === id)?.isFavorite);
  };

  // Memoized filtered users
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      // If accountant, show only owners this accountant manages
      if (currentUserRole === "accountant" && managedOwners.length > 0) {
        if (!(user.role === "owner" && managedOwners.includes(user._id))) return false;
      }
      // Search by name/email
      const searchText = search.trim().toLowerCase();
      const matchesSearch =
        !searchText ||
        user.name?.toLowerCase().includes(searchText) ||
        user.email?.toLowerCase().includes(searchText);
      // Filter by role
      const matchesRole = !filterRole || user.role === filterRole;
      // Filter by company
      const matchesCompany = !filterCompany || (user.companies || []).includes(filterCompany);
      return matchesSearch && matchesRole && matchesCompany;
    });
  }, [users, search, filterRole, filterCompany, currentUserRole, managedOwners]);

  // Render the main UI
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
      {/* Accountant notice */}
      {currentUserRole === "accountant" && (
        <Box sx={{
          bgcolor: "#fffbe5",
          border: "1px solid #ffe066",
          borderRadius: 1,
          p: 2, mb: 3, color: "#9e7700"
        }}>
          <Typography fontWeight={600}>Note:</Typography>
          <Typography variant="body2">
            As an accountant, you only see the users and companies you created.
          </Typography>
        </Box>
      )}
      {/* Top toolbar: Title, search, filters, and Add button */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ xs: "stretch", sm: "center" }} mb={3}>
        <Typography variant={"h2"} mb={3} sx={{ flex: 1 }}>
          {t("views.title.users")}
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
          label="Role"
          value={filterRole}
          onChange={e => setFilterRole(e.target.value)}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="client">Client</MenuItem>
          <MenuItem value="owner">Owner</MenuItem>
          <MenuItem value="accountant">Accountant</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
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
          {companiesList.map(company => (
            <MenuItem key={company._id} value={company._id}>{company.name}</MenuItem>
          ))}
        </TextField>
        <Button variant="contained" startIcon={<Add />} onClick={() => openDialog()}>
          {t("actions.addUser", "Add User")}
        </Button>
      </Stack>
      {/* Loader and error display */}
      {loading && <Typography sx={{ mt: 2 }}>Loading...</Typography>}
      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

      {/* The user card list (main content) */}
      <Box>
        {filteredUsers.map((user: BackendUser, idx: number) => (
          <UserCard
            key={user._id}
            user={user}
            idx={idx}
            onEdit={() => openDialog(user)}
            onDelete={() => setDeleteId(user._id)}
            onToggleFavorite={() => toggleFavorite(user._id)}
            companiesList={companiesList}
            onCardClick={() => navigate(`/user/profile-2/${user._id}`)}
            currentUserRole={currentUserRole}
            onMessage={() => navigate(`/apps/chat/contact/${user._id}`)}
          />
        ))}
      </Box>

      {/* Dialog for Adding/Editing Users */}
      <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="sm" sx={{ '& .MuiDialog-paper': { m: 0, width: '100%', maxWidth: '600px' } }}>
        <DialogTitle>
          {editUser
            ? t("dialogs.editUser", "Edit User")
            : t("dialogs.addUser", "Add User")}
        </DialogTitle>
        {/* The add/edit user form */}
        <form onSubmit={handleSubmit} noValidate>
          <DialogContent dividers>
            <Stack spacing={3}>
              {/* Profile Picture Upload */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                <Avatar
                  src={profilePicPreview || undefined}
                  sx={{ width: 80, height: 80, mb: 2 }}
                >
                  {getInitials(formData.name, formData.email)}
                </Avatar>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="profile-pic-upload"
                  type="file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setProfilePicFile(e.target.files[0]);
                      setProfilePicPreview(URL.createObjectURL(e.target.files[0]));
                    }
                  }}
                />
                <label htmlFor="profile-pic-upload">
                  <Button variant="outlined" component="span">
                    {profilePicPreview ? "Change Picture" : "Upload Picture"}
                  </Button>
                </label>
              </Box>

              {/* Name input */}
              <TextField
                fullWidth
                required
                label={t("form.name", "Name")}
                value={formData.name}
                onChange={(e) => handleFormChange("name", e.target.value)}
              />
              {/* Email input */}
              <TextField
                fullWidth
                required
                type="email"
                label={t("form.email", "Email")}
                value={formData.email}
                onChange={(e) => handleFormChange("email", e.target.value)}
              />
              {/* Role selector */}
              <FormControl fullWidth required>
                <InputLabel>{t("form.role", "Role")}</InputLabel>
                <Select
                  label={t("form.role", "Role")}
                  value={currentUserRole === "accountant" ? "owner" : formData.role}
                  onChange={(e) => {
                    if (currentUserRole !== "accountant") {
                      handleFormChange("role", e.target.value as string);
                    }
                  }}
                  disabled={currentUserRole === "accountant"}
                >
                  {currentUserRole === "accountant" ? (
                    <MenuItem value="owner">{t("roles.owner", "Owner")}</MenuItem>
                  ) : (
                    <>
                      <MenuItem value="user">{t("roles.user", "User")}</MenuItem>
                      <MenuItem value="client">{t("roles.client", "Client")}</MenuItem>
                      <MenuItem value="owner">{t("roles.owner", "Owner")}</MenuItem>
                      <MenuItem value="accountant">{t("roles.accountant", "Accountant")}</MenuItem>
                      <MenuItem value="admin">{t("roles.admin", "Admin")}</MenuItem>
                    </>
                  )}
                </Select>
              </FormControl>
              {/* Companies multi-select */}
              <FormControl fullWidth>
                <InputLabel>{t("form.companies", "Companies")}</InputLabel>
                <Select
                  multiple
                  value={formData.companies || []}
                  onChange={(e) => handleFormChange("companies", e.target.value as string[])}
                  renderValue={(selected) => (selected as string[]).join(", ")}
                >
                  {companiesList.map((company) => (
                    <MenuItem key={company._id} value={company._id}>
                      {company.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* Password input only when creating new user */}
              {!editUser && (
                <TextField
                  fullWidth
                  required
                  type="password"
                  label={t("form.password", "Password")}
                  value={formData.password || ""}
                  onChange={(e) => handleFormChange("password", e.target.value)}
                  inputProps={{ minLength: 6 }}
                  helperText={passwordError || t("form.passwordHint", "At least 6 characters")}
                  error={!!passwordError}
                />
              )}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog}>{t("actions.cancel", "Cancel")}</Button>
            <Button type="submit" variant="contained" disabled={loading}> {/* Disable button while loading */}
              {loading ? (editUser ? "Updating..." : "Adding...") : (editUser ? t("actions.update", "Update") : t("actions.add", "Add"))}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {/* Delete Confirmation Dialog */}
      {deleteId && (
        <Dialog 
          open={true}
          onClose={() => setDeleteId('')}
        >
          <DialogTitle>{"Delete User"}</DialogTitle>
          <DialogContent>
            {"Are you sure you want to delete this user? This action cannot be undone."}
            <TextField
              autoFocus
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              value={deletePassword || ''}
              onChange={e => setDeletePassword(e.target.value)}
              error={!!deletePasswordError}
              helperText={deletePasswordError || ''}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteId('')}>{"Cancel"}</Button>
            <Button 
              onClick={confirmDelete} 
              variant="contained" 
              color="error"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
}
