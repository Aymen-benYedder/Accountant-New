import React, { useEffect, useState, useRef, useMemo } from "react";
import { MenuItem } from "@mui/material";
import { useAuth } from "@app/_components/_core/AuthProvider/AuthContext";
import type { ProjectType } from "@app/_components/views/list/Projects/data";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import {
  Container,
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
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import api from "@app/_utilities/api";

interface CompanyBackend {
  _id: string;
  name: string;
  address?: string;
  tin: string;
  taxIdentificationKey?: string;
  commercialRegistryNumber?: string;
  ein?: string;
  taxpayerCategory?: string;
  establishmentNumber?: string;
  phoneNumber?: string;
  emailAddress?: string;
  faxNumber?: string;
  city?: string;
  street?: string;
  streetNumber?: string;
  postalCode?: string;
  iban?: string;
  businessActivity?: string;
  accountant: string;
  owner?: string; // <--- Add this line
  owners: {
    _id: string;
    name: string;
    email: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
  logo?: string;
}

// --- Map company from backend to ProjectType for template ---
function mapCompanyToProject(c: CompanyBackend, _idx: number): ProjectType & { tin?: string } {
  const created = c.createdAt ? new Date(c.createdAt) : undefined;
  const updated = c.updatedAt ? new Date(c.updatedAt) : undefined;
  const demoAvatars = [
    "/assets/images/avatar/avatar1.jpg",
    "/assets/images/avatar/avatar2.jpg",
    "/assets/images/avatar/avatar3.jpg",
    "/assets/images/avatar/avatar4.jpg",
    "/assets/images/avatar/avatar5.jpg",
    "/assets/images/avatar/avatar6.jpg",
  ];
  return {
    id: c._id,
    logo: c.logo && c.logo.trim() !== "" ? c.logo : "/assets/images/logos/project-logo-1.png",
    name: c.name,
    description: c.address ?? "",
    tin: c.tin,
    date: created ? created.toLocaleDateString() : "--",
    deadline: updated ? updated.toLocaleDateString() : "--",
    progress: 80,
    status: {
      linear_color: "success",
      chip_color: "success",
      label: "Owned",
    },
    team: Array.isArray(c.owners) && c.owners.length > 0
      ? c.owners.map((owner, i) => ({
          name: owner.name,
          profilePic: demoAvatars[i % demoAvatars.length],
        }))
      : c.owner && typeof c.owner === 'string'
        ? [{
            name: c.owner,
            profilePic: demoAvatars[0],
          }]
        : [],
  };
}

export default function ProjectsListPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Get the authenticated user from AuthProvider (fix for role-based UI)
  const { user } = useAuth();

  // DEV: show user context for debug.
  // Remove or comment after verifying!
  useEffect(() => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-console
      console.log("Current user from context:", user);
    }
  }, [user]);

  // File input refs for logo upload
  const addLogoInputRef = useRef<HTMLInputElement>(null);
  const editLogoInputRef = useRef<HTMLInputElement>(null);

  // Data
  const [companies, setCompanies] = useState<CompanyBackend[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Search & filter state
  const [search, setSearch] = useState("");
  const [filterOwner, setFilterOwner] = useState("");
  const [filterAccountant, setFilterAccountant] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Add Company Dialog state
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addForm, setAddForm] = useState({
    name: "",
    address: "",
    tin: "",
    taxIdentificationKey: "",
    commercialRegistryNumber: "",
    ein: "",
    taxpayerCategory: "",
    establishmentNumber: "",
    phoneNumber: "",
    emailAddress: "",
    faxNumber: "",
    city: "",
    street: "",
    streetNumber: "",
    postalCode: "",
    iban: "",
    businessActivity: "",
    accountant: "", // Set below on openAddDialog for accountant users
    owner: "",
    logo: "",
    logoFile: null as File | null,
  });
  const [addError, setAddError] = useState<string | null>(null);
  const [addLoading, setAddLoading] = useState<boolean>(false);

  // Edit Dialog/modal state
  const [editCompany, setEditCompany] = useState<CompanyBackend | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    address: "",
    tin: "",
    taxIdentificationKey: "",
    commercialRegistryNumber: "",
    ein: "",
    taxpayerCategory: "",
    establishmentNumber: "",
    phoneNumber: "",
    emailAddress: "",
    faxNumber: "",
    city: "",
    street: "",
    streetNumber: "",
    postalCode: "",
    iban: "",
    businessActivity: "",
    accountant: "",
    owner: "",
    logo: "",
    logoFile: null as File | null,
  });
  const [editError, setEditError] = useState<string | null>(null);
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deletePassword, setDeletePassword] = useState("");
  const [deletePasswordError, setDeletePasswordError] = useState<string | null>(null);

  useEffect(() => {
    fetchCompaniesAndUsers();
  }, []);

  const fetchCompaniesAndUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Always fetch companies
      const companiesRes = await api.get<CompanyBackend[]>("/companies");
      setCompanies(companiesRes.data);
      
      // Only fetch users if admin or accountant
      if (user?.role === 'admin' || user?.role === 'accountant') {
        try {
          const usersRes = await api.get<any[]>("/users");
          setUsers(usersRes.data);
        } catch (err) {
          console.warn('Could not fetch users (expected if not admin/accountant):', err);
        }
      }
    } catch (err: any) {
      console.error('Error fetching data:', err);
      setError(err.response?.data?.error || err.message || 'Error loading data');
    } finally {
      setLoading(false);
    }
  };

  const isLoaded = !loading && companies.length > 0 && users.length > 0;

  // Memoized filtered companies
  const filteredCompanies = useMemo(() => {
    return companies.filter(company => {
      // Search by name, TIN, address
      const searchText = search.trim().toLowerCase();
      const matchesSearch =
        !searchText ||
        company.name?.toLowerCase().includes(searchText) ||
        company.tin?.toLowerCase().includes(searchText) ||
        company.address?.toLowerCase().includes(searchText);

      // Filter by owner
      const matchesOwner = !filterOwner || (company.owner === filterOwner || company.owners?.some(o => o._id === filterOwner));

      // Filter by accountant
      const matchesAccountant = !filterAccountant || company.accountant === filterAccountant;

      // Filter by status (demo: always 'Owned')
      const matchesStatus = !filterStatus || filterStatus === 'Owned';

      return matchesSearch && matchesOwner && matchesAccountant && matchesStatus;
    });
  }, [companies, search, filterOwner, filterAccountant, filterStatus]);

  const openEditDialog = (c: CompanyBackend) => {
    setEditCompany(c);
    setEditForm({
      name: c.name ?? "",
      address: c.address ?? "",
      tin: c.tin ?? "",
      taxIdentificationKey: c.taxIdentificationKey ?? "",
      commercialRegistryNumber: c.commercialRegistryNumber ?? "",
      ein: c.ein ?? "",
      taxpayerCategory: c.taxpayerCategory ?? "",
      establishmentNumber: c.establishmentNumber ?? "",
      phoneNumber: c.phoneNumber ?? "",
      emailAddress: c.emailAddress ?? "",
      faxNumber: c.faxNumber ?? "",
      city: c.city ?? "",
      street: c.street ?? "",
      streetNumber: c.streetNumber ?? "",
      postalCode: c.postalCode ?? "",
      iban: c.iban ?? "",
      businessActivity: c.businessActivity ?? "",
      accountant: c.accountant ?? "",
      owner:
        // Use company.owner if present, else use the first id from owners array
        typeof c.owner === "string" && c.owner
          ? c.owner
          : Array.isArray(c.owners) && c.owners.length > 0 && c.owners[0]._id
            ? c.owners[0]._id
            : "",
      logo: c.logo ?? "",
      logoFile: null,
    });
    setEditError(null);
  };
  const closeEditDialog = () => {
    setEditCompany(null);
    setEditForm({
      name: "",
      address: "",
      tin: "",
      taxIdentificationKey: "",
      commercialRegistryNumber: "",
      ein: "",
      taxpayerCategory: "",
      establishmentNumber: "",
      phoneNumber: "",
      emailAddress: "",
      faxNumber: "",
      city: "",
      street: "",
      streetNumber: "",
      postalCode: "",
      iban: "",
      businessActivity: "",
      accountant: "",
      owner: "",
      logo: "",
      logoFile: null,
    });
    setEditError(null);
    setEditLoading(false);
  };
  const handleEditChange = (field: keyof typeof editForm, value: any) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCompany) return;
    try {
      setEditLoading(true);
      setEditError(null);

      const formData = new FormData();
      formData.append("name", editForm.name);
      formData.append("address", editForm.address);
      formData.append("tin", editForm.tin);
      formData.append("taxIdentificationKey", editForm.taxIdentificationKey);
      formData.append("commercialRegistryNumber", editForm.commercialRegistryNumber);
      formData.append("ein", editForm.ein);
      formData.append("taxpayerCategory", editForm.taxpayerCategory);
      formData.append("establishmentNumber", editForm.establishmentNumber);
      formData.append("iban", editForm.iban);
      formData.append("businessActivity", editForm.businessActivity);
      formData.append("accountant", editForm.accountant);
      formData.append("owner", editForm.owner);
      formData.append("phoneNumber", editForm.phoneNumber);
      if (editForm.logoFile) {
        formData.append("logo", editForm.logoFile);
      } else {
        formData.append("logo", editForm.logo);
      }

      await api.put(`/companies/${editCompany._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      closeEditDialog();
      await fetchCompaniesAndUsers();
    } catch (err: any) {
      setEditError(err.response?.data?.error || err.message);
    } finally {
      setEditLoading(false);
    }
  };

  // Delete handlers (unchanged)
  const handleDelete = async () => {
    if (!deleteId) return;
    if (!deletePassword || deletePassword.length < 6) {
      setDeletePasswordError("Password is required (min 6 chars)");
      return;
    }
    setDeletePasswordError(null);
    try {
      setLoading(true);
      // Step 1: Verify password with backend
      await api.post('/auth/verify-password', { password: deletePassword });
      // Step 2: If password is correct, proceed to delete
      await api.delete(`/companies/${deleteId}`);
      setDeleteId(null);
      setDeletePassword("");
      await fetchCompaniesAndUsers();
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

  // Add Company handlers
  const openAddDialog = () => {
    setAddDialogOpen(true);
    setAddForm({
      name: "",
      address: "",
      tin: "",
      taxIdentificationKey: "",
      commercialRegistryNumber: "",
      ein: "",
      taxpayerCategory: "",
      establishmentNumber: "",
      phoneNumber: "",
      emailAddress: "",
      faxNumber: "",
      city: "",
      street: "",
      streetNumber: "",
      postalCode: "",
      iban: "",
      businessActivity: "",
      accountant: user?.role === "accountant" ? user._id : "",
      owner: user?.role === "admin" ? user._id : "",
      logo: "",
      logoFile: null,
    });
    setAddError(null);
  };
  const closeAddDialog = () => {
    setAddDialogOpen(false);
    setAddForm({
      name: "",
      address: "",
      tin: "",
      taxIdentificationKey: "",
      commercialRegistryNumber: "",
      ein: "",
      taxpayerCategory: "",
      establishmentNumber: "",
      phoneNumber: "",
      emailAddress: "",
      faxNumber: "",
      city: "",
      street: "",
      streetNumber: "",
      postalCode: "",
      iban: "",
      businessActivity: "",
      accountant: user?.role === "accountant" ? user._id : "",
      owner: "",
      logo: "",
      logoFile: null,
    });
    setAddError(null);
    setAddLoading(false);
  };
  const handleAddChange = (field: keyof typeof addForm, value: any) => {
    setAddForm((prev) => ({ ...prev, [field]: value }));
  };
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setAddLoading(true);
      setAddError(null);

      const formData = new FormData();
      formData.append("name", addForm.name);
      formData.append("address", addForm.address);
      formData.append("tin", addForm.tin);
      formData.append("taxIdentificationKey", addForm.taxIdentificationKey);
      formData.append("commercialRegistryNumber", addForm.commercialRegistryNumber);
      formData.append("ein", addForm.ein);
      formData.append("taxpayerCategory", addForm.taxpayerCategory);
      formData.append("establishmentNumber", addForm.establishmentNumber);
      formData.append("iban", addForm.iban);
      formData.append("businessActivity", addForm.businessActivity);
      formData.append("accountant", addForm.accountant);
      formData.append("owner", addForm.owner);
      formData.append("phoneNumber", addForm.phoneNumber);
      if (addForm.logoFile) {
        formData.append("logo", addForm.logoFile);
      } else {
        formData.append("logo", addForm.logo);
      }
      await api.post(`/companies`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      closeAddDialog();
      await fetchCompaniesAndUsers();
    } catch (err: any) {
      setAddError(err.response?.data?.error || err.message);
    } finally {
      setAddLoading(false);
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
          {/* {t("views.title.projects")} */}
          Archive
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
          label="Owner"
          value={filterOwner}
          onChange={e => setFilterOwner(e.target.value)}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="">All</MenuItem>
          {users.filter(u => u.role === "owner").map(owner => (
            <MenuItem key={owner._id} value={owner._id}>{owner.name}</MenuItem>
          ))}
        </TextField>
        <TextField
          select
          size="small"
          label="Accountant"
          value={filterAccountant}
          onChange={e => setFilterAccountant(e.target.value)}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="">All</MenuItem>
          {users.filter(u => u.role === "accountant").map(acct => (
            <MenuItem key={acct._id} value={acct._id}>{acct.name}</MenuItem>
          ))}
        </TextField>
        <TextField
          select
          size="small"
          label="Status"
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Owned">Owned</MenuItem>
        </TextField>
        <IconButton
          color="primary"
          size="large"
          aria-label={t("actions.addCompany", "Add Company")}
          onClick={openAddDialog}
          sx={{ mb: 3 }}
        >
          <Add />
        </IconButton>
      </Stack>
      {loading && <Typography sx={{ mt: 2 }}>Loading...</Typography>}
      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
      {!isLoaded && !loading && (
        <Typography sx={{ mt: 2 }}>Loading data...</Typography>
      )}

      {/* Company cards list */}
      <Box>
        {(filteredCompanies ?? []).map((company, idx) => {
          const project = mapCompanyToProject(company, idx);
          return (
            <Card
              key={company._id}
              onClick={() => navigate(`/company/profile/${company._id}`)}
              sx={{
                mb: 2,
                px: 3,
                py: 2,
                display: "flex",
                alignItems: "center",
                flexDirection: { xs: "column", md: "row" },
                cursor: "pointer"
              }}
            >
              {/* Avatar and info */}
              <Box sx={{ mr: 2, flexShrink: 0 }}>
                <img
                  src={
                    company.logo && company.logo.trim() !== ""
                      ? company.logo.startsWith("http")
                        ? company.logo
                        // Always load files from backend root for relative /uploads paths!
                        : `${import.meta.env.VITE_API_BASE_URL?.replace('/api', '')}${company.logo}`
                      : project.logo
                  }
                  alt={company.name}
                  width={52}
                  height={52}
                  style={{ borderRadius: 8, objectFit: "cover" }}
                />
              </Box>
              <Box sx={{ flex: 2, minWidth: 0 }}>
                <Typography variant="h6" fontWeight={700} noWrap>
                  {company.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  TIN: {company.tin}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {company.address}
                </Typography>
              </Box>
              {/* Owners avatars row */}
              <Stack
                direction="row"
                spacing={0.5}
                sx={{
                  ml: 3,
                  mr: 2,
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                {(company.owners || []).slice(0, 4).map((owner, i) => {
                  const user = users.find((u) => u._id === owner._id);
                  const demoAvatars = [
                    "/assets/images/avatar/avatar1.jpg",
                    "/assets/images/avatar/avatar2.jpg",
                    "/assets/images/avatar/avatar3.jpg",
                    "/assets/images/avatar/avatar4.jpg",
                    "/assets/images/avatar/avatar5.jpg",
                    "/assets/images/avatar/avatar6.jpg",
                  ];
                  const showImg = false;
                  const initials =
                    (user?.name || owner.name || "")
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase() || (user?.email || owner.email || "?")[0]?.toUpperCase() || "?";
                  return (
                    <Avatar
                      key={owner._id}
                      src={showImg ? undefined : demoAvatars[i % demoAvatars.length]}
                      alt={user?.name || owner.name}
                      sx={{
                        width: 34,
                        height: 34,
                        fontSize: 16,
                        fontWeight: 600,
                        bgcolor: "primary.light",
                        color: "primary.contrastText",
                        border: "2px solid #fff",
                        boxShadow: 1,
                      }}
                    >
                      {initials}
                    </Avatar>
                  );
                })}
              </Stack>
              <Stack
                direction="row"
                spacing={0.5}
                sx={{
                  ml: { xs: 0, sm: "auto" },
                  alignSelf: { xs: "flex-end", sm: "center" },
                  mt: { xs: 1, sm: 0 },
                  flexShrink: 0,
                }}
              >
                <IconButton
                  size="small"
                  color="primary"
                  onClick={e => { e.stopPropagation(); openEditDialog(company); }}
                  aria-label="Edit"
                >
                  <Edit fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={e => { e.stopPropagation(); setDeleteId(company._id); }}
                  aria-label="Delete"
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Stack>
            </Card>
          );
        })}
      </Box>

      {/* Add Company Dialog */}
      <Dialog open={addDialogOpen} onClose={closeAddDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          {t("dialogs.addCompany", "Add Company")}
        </DialogTitle>
        <form onSubmit={handleAddSubmit} noValidate encType="multipart/form-data">
          <DialogContent dividers>
            <Stack spacing={3}>
              <TextField
                fullWidth
                required
                label={t("form.name", "Name")}
                value={addForm.name}
                onChange={e => handleAddChange("name", e.target.value)}
              />
              <TextField
                fullWidth
                required
                label="TIN"
                value={addForm.tin}
                onChange={e => handleAddChange("tin", e.target.value)}
              />
              <TextField
                fullWidth
                label="Tax Identification Key"
                value={addForm.taxIdentificationKey}
                onChange={e => handleAddChange("taxIdentificationKey", e.target.value)}
              />
              <TextField
                fullWidth
                label="Commercial Registry Number"
                value={addForm.commercialRegistryNumber}
                onChange={e => handleAddChange("commercialRegistryNumber", e.target.value)}
              />
              <TextField
                fullWidth
                label="Employer Identification Number (EIN)"
                value={addForm.ein}
                onChange={e => handleAddChange("ein", e.target.value)}
              />
              <TextField
                fullWidth
                label="Taxpayer Category"
                value={addForm.taxpayerCategory}
                onChange={e => handleAddChange("taxpayerCategory", e.target.value)}
              />
              <TextField
                fullWidth
                label="Establishment Number"
                value={addForm.establishmentNumber}
                onChange={e => handleAddChange("establishmentNumber", e.target.value)}
              />
              <TextField
                fullWidth
                label="IBAN"
                value={addForm.iban}
                onChange={e => handleAddChange("iban", e.target.value)}
              />
              <TextField
                fullWidth
                label="Business Activity"
                value={addForm.businessActivity}
                onChange={e => handleAddChange("businessActivity", e.target.value)}
              />
              {/* Accountant dropdown for admin only */ }
              {/* Show both fields for admin, only owner for accountant */}
              {(user?.role === "admin" || user?.role === "accountant") && (
                <>
                  {console.log("🟢 ADD COMPANY DROPDOWN DEBUG", {
                    user,
                    users,
                    ownerValue: addForm.owner,
                    availableOwners: users
                      .filter(u => ["admin", "user", "client", "owner", "accountant"].includes(u.role))
                      .map(u => ({ _id: u._id, role: u.role, name: u.name })),
                    accountantValue: addForm.accountant,
                    availableAccountants: users
                      .filter(u => u.role === "accountant")
                      .map(u => ({ _id: u._id, name: u.name })),
                  })}
                  <TextField
                    select
                    required
                    label="Owner"
                    value={addForm.owner || ""}
                    onChange={e => handleAddChange("owner", e.target.value)}
                  >
{users
  .filter(u => {
    if (user?.role === "admin") {
      if (addForm.accountant) {
        return u.role === "owner" && u.createdBy === addForm.accountant;
      }
      return u.role === "owner";
    }
    if (user?.role === "accountant") {
      return u.role === "owner" && u.createdBy === user._id;
    }
    return false;
  })
  .map(owner => (
    <MenuItem key={owner._id} value={owner._id}>
      {owner.name}
    </MenuItem>
  ))}
                  </TextField>
                  {user?.role === "admin" && (
                    <TextField
                      select
                      required
                      label="Accountant"
                      value={addForm.accountant}
                      onChange={e => handleAddChange("accountant", e.target.value)}
                    >
                      {users
                        .filter(u => u.role === "accountant")
                        .map(acct => (
                          <MenuItem key={acct._id} value={acct._id}>
                            {acct.name} ({acct.email})
                          </MenuItem>
                        ))}
                    </TextField>
                  )}
                </>
              )}
              <TextField
                fullWidth
                label={t("form.address", "Address")}
                value={addForm.address}
                onChange={e => handleAddChange("address", e.target.value)}
              />
              <TextField
                fullWidth
                label={t("form.phoneNumber", "Phone Number")}
                value={addForm.phoneNumber}
                onChange={e => handleAddChange("phoneNumber", e.target.value)}
              />
              <TextField
                fullWidth
                label="Email Address"
                value={addForm.emailAddress}
                onChange={e => handleAddChange("emailAddress", e.target.value)}
              />
              <TextField
                fullWidth
                label="Fax Number"
                value={addForm.faxNumber}
                onChange={e => handleAddChange("faxNumber", e.target.value)}
              />
              <TextField
                fullWidth
                label="City"
                value={addForm.city}
                onChange={e => handleAddChange("city", e.target.value)}
              />
              <TextField
                fullWidth
                label="Street"
                value={addForm.street}
                onChange={e => handleAddChange("street", e.target.value)}
              />
              <TextField
                fullWidth
                label="Street Number"
                value={addForm.streetNumber}
                onChange={e => handleAddChange("streetNumber", e.target.value)}
              />
              <TextField
                fullWidth
                label="Postal Code"
                value={addForm.postalCode}
                onChange={e => handleAddChange("postalCode", e.target.value)}
              />
              <TextField
                fullWidth
                label="Tax Identification Key"
                value={addForm.taxIdentificationKey}
                onChange={e => handleAddChange("taxIdentificationKey", e.target.value)}
              />
              <TextField
                fullWidth
                label="Commercial Registry Number"
                value={addForm.commercialRegistryNumber}
                onChange={e => handleAddChange("commercialRegistryNumber", e.target.value)}
              />
              <TextField
                fullWidth
                label="Employer Identification Number (EIN)"
                value={addForm.ein}
                onChange={e => handleAddChange("ein", e.target.value)}
              />
              <TextField
                fullWidth
                label="Taxpayer Category"
                value={addForm.taxpayerCategory}
                onChange={e => handleAddChange("taxpayerCategory", e.target.value)}
              />
              <TextField
                fullWidth
                label="Establishment Number"
                value={addForm.establishmentNumber}
                onChange={e => handleAddChange("establishmentNumber", e.target.value)}
              />
              <TextField
                fullWidth
                label="IBAN"
                value={addForm.iban}
                onChange={e => handleAddChange("iban", e.target.value)}
              />
              <TextField
                fullWidth
                label="Business Activity"
                value={addForm.businessActivity}
                onChange={e => handleAddChange("businessActivity", e.target.value)}
              />

              {/* File upload input for logo */}
              <Box>
                <input
                  ref={addLogoInputRef}
                  accept="image/*"
                  style={{ display: "none" }}
                  id="add-logo-upload"
                  type="file"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    handleAddChange("logoFile", file || null);
                  }}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => addLogoInputRef.current?.click()}
                  sx={{ marginRight: 1 }}
                >
                  {t("form.uploadLogo", "Upload Logo")}
                </Button>
                <span style={{ verticalAlign: "middle", fontSize: 14, marginLeft: 8 }}>
                  {addForm.logoFile ? addForm.logoFile.name : t("form.noFile", "No file chosen")}
                </span>
                {/* {addPreview && (
                  <Box sx={{ mt: 1 }}>
                    <img
                      src={addPreview}
                      alt="Logo Preview"
                      style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8, border: "1px solid #eee" }}
                    />
                  </Box>
                )} */}
              </Box>
              <TextField
                fullWidth
                required
                label={t("form.tin", "TIN")}
                value={addForm.tin}
                onChange={e => handleAddChange("tin", e.target.value)}
              />
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

      {/* Edit Dialog */}
      <Dialog open={!!editCompany} onClose={closeEditDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          {t("dialogs.editCompany", "Edit Company")}
        </DialogTitle>
        <form onSubmit={handleEditSubmit} noValidate encType="multipart/form-data">
          <DialogContent dividers>
            <Stack spacing={3} direction={{ xs: "column", md: "row" }} gap={4}>
              {/* LEFT COLUMN */}
              <Stack spacing={3} flex={1}>
                {/* Company Identification */}
                <Typography variant="h6" sx={{ mt: 2, mb: 0 }}>Company Identification</Typography>
                <TextField
                  fullWidth
                  required
                  label="Name"
                  value={editForm.name}
                  onChange={e => handleEditChange("name", e.target.value)}
                />
                <TextField
                  fullWidth
                  required
                  label="TIN"
                  value={editForm.tin}
                  onChange={e => handleEditChange("tin", e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Tax Identification Key"
                  value={editForm.taxIdentificationKey}
                  onChange={e => handleEditChange("taxIdentificationKey", e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Commercial Registry Number"
                  value={editForm.commercialRegistryNumber}
                  onChange={e => handleEditChange("commercialRegistryNumber", e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Employer Identification Number (EIN)"
                  value={editForm.ein}
                  onChange={e => handleEditChange("ein", e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Taxpayer Category"
                  value={editForm.taxpayerCategory}
                  onChange={e => handleEditChange("taxpayerCategory", e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Establishment Number"
                  value={editForm.establishmentNumber}
                  onChange={e => handleEditChange("establishmentNumber", e.target.value)}
                />
                {/* Banking Information */}
                <Typography variant="h6" sx={{ mt: 2, mb: 0 }}>Banking Information</Typography>
                <TextField
                  fullWidth
                  label="IBAN"
                  value={editForm.iban}
                  onChange={e => handleEditChange("iban", e.target.value)}
                />
                {/* Business Details */}
                <Typography variant="h6" sx={{ mt: 2, mb: 0 }}>Business Details</Typography>
                <TextField
                  fullWidth
                  label="Business Activity"
                  value={editForm.businessActivity}
                  onChange={e => handleEditChange("businessActivity", e.target.value)}
                />
                {/* Accountant Dropdown for admin only */}
                {/* Accountant dropdown visible for admin only, hidden for accountants */}
                {/* Render both owner and accountant assignment for admin, and owner for accountant */}
                {(user?.role === "admin" || user?.role === "accountant") && (
                  <Stack spacing={3}>
                    <TextField
                      select
                      fullWidth
                      required
                      label="Owner"
                      value={editForm.owner || ""}
                      onChange={e => handleEditChange("owner", e.target.value)}
                    >
                      {users
 .filter(u => {
   if (user?.role === "admin") {
     if (editForm.accountant) {
       return u.role === "owner" && u.createdBy === editForm.accountant;
     }
     return u.role === "owner";
   }
   if (user?.role === "accountant") {
     return u.role === "owner" && u.createdBy === user._id;
   }
   return false;
 })
 .map(owner => (
   <MenuItem key={owner._id} value={owner._id}>
     {owner.name}
   </MenuItem>
 ))}
                    </TextField>
                    {user?.role === "admin" && (
                      <TextField
                        select
                        fullWidth
                        required
                        label="Accountant"
                        value={editForm.accountant || ""}
                        onChange={e => handleEditChange("accountant", e.target.value)}
                      >
                        {users
                          .filter(u => u.role === "accountant")
                          .map(acct => (
                            <MenuItem key={acct._id} value={acct._id}>
                              {acct.name} ({acct.email})
                            </MenuItem>
                          ))}
                      </TextField>
                    )}
                  </Stack>
                )}
                {/* Field is hidden (not rendered) for accountants; for users/owners, also not shown */}
                {/* File upload input for logo */}
                <Typography variant="h6" sx={{ mt: 2, mb: 0 }}>Logo</Typography>
                <Box>
                  <input
                    ref={editLogoInputRef}
                    accept="image/*"
                    style={{ display: "none" }}
                    id="edit-logo-upload"
                    type="file"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      handleEditChange("logoFile", file || null);
                    }}
                  />
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => editLogoInputRef.current?.click()}
                    sx={{ marginRight: 1 }}
                  >
                    {t("form.uploadLogo", "Upload Logo")}
                  </Button>
                  <span style={{ verticalAlign: "middle", fontSize: 14, marginLeft: 8 }}>
                    {editForm.logoFile ? editForm.logoFile.name : t("form.noFile", "No file chosen")}
                  </span>
                  {/* {editPreview && (
                    <Box sx={{ mt: 1 }}>
                      <img
                        src={editPreview}
                        alt="Logo Preview"
                        style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8, border: "1px solid #eee" }}
                      />
                    </Box>
                  )} */}
                </Box>
                {editError && <Typography color="error">{editError}</Typography>}
              </Stack>
              {/* RIGHT COLUMN */}
              <Stack spacing={3} flex={1}>
                {/* Contact Information */}
                <Typography variant="h6" sx={{ mt: 2, mb: 0 }}>Contact Information</Typography>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={editForm.phoneNumber}
                  onChange={e => handleEditChange("phoneNumber", e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Fax Number"
                  value={editForm.faxNumber}
                  onChange={e => handleEditChange("faxNumber", e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  value={editForm.emailAddress}
                  onChange={e => handleEditChange("emailAddress", e.target.value)}
                />
                {/* Address Information */}
                <Typography variant="h6" sx={{ mt: 2, mb: 0 }}>Address Information</Typography>
                <TextField
                  fullWidth
                  label="Legacy Address"
                  value={editForm.address}
                  onChange={e => handleEditChange("address", e.target.value)}
                />
                <TextField
                  fullWidth
                  label="City"
                  value={editForm.city}
                  onChange={e => handleEditChange("city", e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Street"
                  value={editForm.street}
                  onChange={e => handleEditChange("street", e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Street Number"
                  value={editForm.streetNumber}
                  onChange={e => handleEditChange("streetNumber", e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Postal Code"
                  value={editForm.postalCode}
                  onChange={e => handleEditChange("postalCode", e.target.value)}
                />
              </Stack>
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
          {t("dialogs.deleteCompany", "Delete Company")}
        </DialogTitle>
        <DialogContent>
          {t(
            "dialogs.confirmDeleteCompany",
            "Are you sure you want to delete this company? This action cannot be undone."
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
