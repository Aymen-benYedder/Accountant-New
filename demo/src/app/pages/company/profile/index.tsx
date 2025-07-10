import {
  LicenseCertificate,
  ProfileWorkHistory,
} from "@app/_components/common";
import { experiencesData } from "@app/_components/common/data";
import {
  Profile2Header,
  Profile2Sidebar,
  Profile2Skill,
} from "@app/_components/user/profile-2";
// TODO: Replace with @app/_components/company/profile when available

import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { ContentLayout } from "@app/_layouts";
import { JumboCard, JumboDdMenu } from "@jumbo/components";
import { useJumboTheme } from "@jumbo/components/JumboTheme/hooks";
import { Container, Box, CircularProgress, Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack, Button, Typography, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "@app/_utilities/api"; // use app's API instance
import CompanyBasicInformation from "./CompanyBasicInformation";
import CompanyHeader from "./CompanyHeader";
import CompanyDocumentsSection from "./CompanyDocumentsSection";

const useProfileLayout = () => {
  const { theme } = useJumboTheme();
  return React.useMemo(
    () => ({
      rightSidebarOptions: {
        sx: {
          display: "flex",
          flexShrink: 0,
          flexDirection: "column",
          width: { md: "auto", lg: 350 },
        },
      },
      wrapperOptions: {
        sx: {
          flexDirection: { xs: "column", lg: "row" },
        },
      },
      contentOptions: {
        sx: {
          p: { lg: 0, sm: 0, xs: 0 },
          mr: { lg: 3 },
        },
      },
      mainOptions: {
        sx: {
          minHeight: 0,
        },
      },
    }),
    [theme]
  );
};

const fetchCompany = async (id: string) => {
  const { data } = await api.get(`/companies/${id}`);
  return data;
};

import { useAuth } from "@app/_components/_core/AuthProvider/AuthContext";
import { useQuery as useUserQuery } from "@tanstack/react-query";

const CompanyProfilePage = () => {
  const profileLayoutConfig = useProfileLayout();
  const { id } = useParams<{ id: string }>();
  const {
    data: company,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["company", id],
    queryFn: () => fetchCompany(id!),
    enabled: !!id,
  });

  // Auth and users context
  const { user } = useAuth();
  const { data: users = [] } = useUserQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      // Call your backend as needed (may require admin or expose an endpoint)
      const res = await api.get("/users");
      return res.data || [];
    },
    enabled: !!user && user.role === "admin",
  });

  // Edit Modal for Company
  const [editOpen, setEditOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);
  // Removed unused editPreview state
  const [editForm, setEditForm] = useState({
    name: "",
    address: "",
    tin: "",
    accountant: "",
    logo: "",
    logoFile: null as File | null,
  });
  const editLogoInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (company && editOpen) {
      setEditForm({
        name: company.name ?? "",
        address: company.address ?? "",
        tin: company.tin ?? "",
        accountant: company.accountant ?? "",
        logo: company.logo ?? "",
        logoFile: null,
      });
      setEditError(null);
    }
    // eslint-disable-next-line
  }, [company, editOpen]);

  const handleEditChange = (field: string, value: any) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company) return;
    try {
      setEditLoading(true);
      setEditError(null);
      const formData = new FormData();
      formData.append("name", editForm.name);
      formData.append("address", editForm.address);
      formData.append("tin", editForm.tin);
      formData.append("accountant", editForm.accountant);
      if (editForm.logoFile) {
        formData.append("logo", editForm.logoFile);
      } else {
        formData.append("logo", editForm.logo);
      }
      await api.put(`/companies/${company._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setEditOpen(false);
      refetch();
    } catch (err: any) {
      setEditError(err.response?.data?.error || err.message);
    } finally {
      setEditLoading(false);
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
      <ContentLayout
        rightSidebar={<Profile2Sidebar />}
        header={
          <>
            {company ? (
              <CompanyHeader
                logo={company.logo}
                name={company.name}
                tin={company.tin}
                onEdit={() => setEditOpen(true)}
              />
            ) : (
              <Profile2Header />
            )}
            {/* Show CompanyBasicInformation instead of BasicInformation */}
            {company?._id && (
              <Button
                variant="outlined"
                size="small"
                component={Link}
                to={`/company/profile/${company._id}/storage`}
                sx={{ mt: 2, mb: 2 }}
              >
                Shared Storage
              </Button>
            )}
            {isLoading ? (
              <Box py={3}>
                <CircularProgress />
              </Box>
            ) : isError ? (
              <Alert severity="error">
                Error loading company info: {error instanceof Error ? error.message : "Unknown error"}
              </Alert>
            ) : company ? (
              <CompanyBasicInformation company={company} />
            ) : null}
          </>
        }
        {...profileLayoutConfig}
      >
        <JumboCard
          title={"About the Company"}
          subheader={"About and Overview"}
          action={<JumboDdMenu />}
          contentWrapper
          contentSx={{ pt: 0 }}
          sx={{ mb: 3.75 }}
        >
          {/* You can show detailed "About" here, or show more info as desired */}
        </JumboCard>
        {/* Company Portfolio/Experience */}
        <JumboCard
          title={"Portfolio & Experience"}
          subheader={"Company experience, case studies and achievements"}
          action={<JumboDdMenu />}
          contentWrapper
          contentSx={{ pt: 0 }}
          sx={{ mb: 3.75 }}
        >
          <ProfileWorkHistory data={experiencesData} />
        </JumboCard>

        <JumboCard
          title={"Expertise & Skills"}
          action={<JumboDdMenu />}
          contentWrapper
          contentSx={{ pt: 0 }}
          sx={{ mb: 3.75 }}
        >
          <Profile2Skill />
        </JumboCard>

        {/* License & Certificate */}
        <JumboCard
          title={"Licenses & Certificates"}
          subheader={"Company certifications and legal documents"}
          action={<JumboDdMenu />}
          contentWrapper
          contentSx={{ pt: 0 }}
          sx={{ mb: 3.75 }}
        >
          <LicenseCertificate />
        </JumboCard>
        {company?._id && <CompanyDocumentsSection companyId={company._id} />}
      </ContentLayout>

      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Company</DialogTitle>
        <form onSubmit={handleEditSubmit} noValidate encType="multipart/form-data">
          <DialogContent dividers>
            <Stack spacing={3}>
              <TextField
                fullWidth
                required
                label="Name"
                value={editForm.name}
                onChange={e => handleEditChange("name", e.target.value)}
              />
              <TextField
                fullWidth
                label="Address"
                value={editForm.address}
                onChange={e => handleEditChange("address", e.target.value)}
              />
              {/* Accountant Dropdown for admin only */}
              {/* Optionally, import and use user, users list from context like in projects page */}
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
                    .filter((u: any) => u.role === "accountant")
                    .map((acct: any) => (
                      <MenuItem key={acct._id} value={acct._id}>
                        {acct.name} ({acct.email})
                      </MenuItem>
                    ))}
                </TextField>
              )}
              {/* File upload input for logo */}
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
                  Upload Logo
                </Button>
                <span style={{ verticalAlign: "middle", fontSize: 14, marginLeft: 8 }}>
                  {editForm.logoFile ? editForm.logoFile.name : "No file chosen"}
                </span>
              </Box>
              <TextField
                fullWidth
                required
                label="TIN"
                value={editForm.tin}
                onChange={e => handleEditChange("tin", e.target.value)}
              />
              {editError && <Typography color="error">{editError}</Typography>}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                color="inherit"
                size="small"
                onClick={() => setEditOpen(false)}
                disabled={editLoading}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                type="submit"
                disabled={editLoading}
              >
                Update
              </Button>
            </Stack>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default CompanyProfilePage;