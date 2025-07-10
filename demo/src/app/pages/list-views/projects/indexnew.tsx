// import React, { useEffect, useState, useRef } from "react";
// import { MenuItem, Container, Typography, Card, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack, Box, Avatar, Button } from "@mui/material";
// import { Edit, Delete, Add } from "@mui/icons-material";
// import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";
// import api from "@app/_utilities/api";
// import { useAuth } from "@app/_components/_core/AuthProvider/AuthContext";
// import type { ProjectType } from "@app/_components/views/list/Projects/data";
// import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";

// interface CompanyBackend {
//   _id: string;
//   name: string;
//   address?: string;
//   tin: string;
//   taxIdentificationKey?: string;
//   commercialRegistryNumber?: string;
//   ein?: string;
//   taxpayerCategory?: string;
//   establishmentNumber?: string;
//   phoneNumber?: string;
//   emailAddress?: string;
//   faxNumber?: string;
//   city?: string;
//   street?: string;
//   streetNumber?: string;
//   postalCode?: string;
//   iban?: string;
//   businessActivity?: string;
//   accountant: string;
//   owner?: string;
//   owners: {
//     _id: string;
//     name: string;
//     email: string;
//   }[];
//   createdAt?: string;
//   updatedAt?: string;
//   logo?: string;
// }

// function mapCompanyToProject(c: CompanyBackend, idx: number): ProjectType & { tin?: string } {
//   const created = c.createdAt ? new Date(c.createdAt) : undefined;
//   const updated = c.updatedAt ? new Date(c.updatedAt) : undefined;
//   const demoAvatars = [
//     "/assets/images/avatar/avatar1.jpg",
//     "/assets/images/avatar/avatar2.jpg",
//     "/assets/images/avatar/avatar3.jpg",
//     "/assets/images/avatar/avatar4.jpg",
//     "/assets/images/avatar/avatar5.jpg",
//     "/assets/images/avatar/avatar6.jpg",
//   ];
//   return {
//     id: c._id,
//     logo: c.logo && c.logo.trim() !== "" ? c.logo : "/assets/images/logos/project-logo-1.png",
//     name: c.name,
//     description: c.address ?? "",
//     tin: c.tin,
//     date: created ? created.toLocaleDateString() : "--",
//     deadline: updated ? updated.toLocaleDateString() : "--",
//     progress: 80,
//     status: {
//       linear_color: "success",
//       chip_color: "success",
//       label: "Owned",
//     },
//     team: Array.isArray(c.owners)
//       ? c.owners.map((owner, i) => ({
//           name: owner.name,
//           profilePic: demoAvatars[i % demoAvatars.length],
//         }))
//       : typeof c.owner === "object" && c.owner !== null && "name" in c.owner
//         ? [{
//             name: (c.owner as any).name ?? "Owner",
//             profilePic: demoAvatars[0],
//           }]
//         : [],
//   };
// }

// export default function ProjectsListPage() {
//   const { t } = useTranslation();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const addLogoInputRef = useRef<HTMLInputElement>(null);
//   const editLogoInputRef = useRef<HTMLInputElement>(null);
//   const [companies, setCompanies] = useState<CompanyBackend[]>([]);
//   const [users, setUsers] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const [addDialogOpen, setAddDialogOpen] = useState(false);
//   const [addForm, setAddForm] = useState({
//     name: "",
//     address: "",
//     tin: "",
//     taxIdentificationKey: "",
//     commercialRegistryNumber: "",
//     ein: "",
//     taxpayerCategory: "",
//     establishmentNumber: "",
//     phoneNumber: "",
//     emailAddress: "",
//     faxNumber: "",
//     city: "",
//     street: "",
//     streetNumber: "",
//     postalCode: "",
//     iban: "",
//     businessActivity: "",
//     accountant: "",
//     owner: "",
//     logo: "",
//     logoFile: null as File | null,
//   });
//   const [addPreview, setAddPreview] = useState<string | null>(null);
//   const [addError, setAddError] = useState<string | null>(null);
//   const [addLoading, setAddLoading] = useState<boolean>(false);

//   // Edit Dialog State
//   const [editCompany, setEditCompany] = useState<CompanyBackend | null>(null);
//   const [editForm, setEditForm] = useState({
//     name: "",
//     address: "",
//     tin: "",
//     taxIdentificationKey: "",
//     commercialRegistryNumber: "",
//     ein: "",
//     taxpayerCategory: "",
//     establishmentNumber: "",
//     phoneNumber: "",
//     emailAddress: "",
//     faxNumber: "",
//     city: "",
//     street: "",
//     streetNumber: "",
//     postalCode: "",
//     iban: "",
//     businessActivity: "",
//     accountant: "",
//     owner: "",
//     logo: "",
//     logoFile: null as File | null,
//   });
//   const [editPreview, setEditPreview] = useState<string | null>(null);
//   const [deleteId, setDeleteId] = useState<string | null>(null);
//   const [editError, setEditError] = useState<string | null>(null);
//   const [editLoading, setEditLoading] = useState<boolean>(false);

//   useEffect(() => {
//     fetchCompaniesAndUsers();
//   }, []);

//   const fetchCompaniesAndUsers = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const [companiesRes, usersRes] = await Promise.all([
//         api.get<CompanyBackend[]>("/companies"),
//         api.get<any[]>("/users"),
//       ]);
//       setCompanies(companiesRes.data);
//       setUsers(usersRes.data);
//     } catch (err: any) {
//       setError(err.response?.data?.error || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isLoaded = !loading && companies.length > 0 && users.length > 0;

//   const openEditDialog = (c: CompanyBackend) => {
//     let accountantId = "";
//     if (typeof c.accountant === "object" && c.accountant !== null && "_id" in c.accountant) {
//       accountantId = (c.accountant as any)._id;
//     } else if (typeof c.accountant === "string") {
//       accountantId = c.accountant;
//     }

//     let ownerId = "";
//     if (typeof c.owner === "object" && c.owner !== null && "_id" in c.owner) {
//       ownerId = (c.owner as any)._id;
//     } else if (typeof c.owner === "string" && c.owner) {
//       ownerId = c.owner;
//     } else if (Array.isArray(c.owners) && c.owners.length > 0 && c.owners[0]._id) {
//       ownerId = c.owners[0]._id;
//     }

//     setEditCompany(c);
//     setEditForm({
//       name: c.name ?? "",
//       address: c.address ?? "",
//       tin: c.tin ?? "",
//       taxIdentificationKey: c.taxIdentificationKey ?? "",
//       commercialRegistryNumber: c.commercialRegistryNumber ?? "",
//       ein: c.ein ?? "",
//       taxpayerCategory: c.taxpayerCategory ?? "",
//       establishmentNumber: c.establishmentNumber ?? "",
//       phoneNumber: c.phoneNumber ?? "",
//       emailAddress: c.emailAddress ?? "",
//       faxNumber: c.faxNumber ?? "",
//       city: c.city ?? "",
//       street: c.street ?? "",
//       streetNumber: c.streetNumber ?? "",
//       postalCode: c.postalCode ?? "",
//       iban: c.iban ?? "",
//       businessActivity: c.businessActivity ?? "",
//       accountant: accountantId,
//       owner: ownerId,
//       logo: c.logo ?? "",
//       logoFile: null,
//     });
//     setEditPreview(c.logo ?? null);
//     setEditError(null);
//   };
//   const closeEditDialog = () => {
//     setEditCompany(null);
//     setEditForm({
//       name: "",
//       address: "",
//       tin: "",
//       taxIdentificationKey: "",
//       commercialRegistryNumber: "",
//       ein: "",
//       taxpayerCategory: "",
//       establishmentNumber: "",
//       phoneNumber: "",
//       emailAddress: "",
//       faxNumber: "",
//       city: "",
//       street: "",
//       streetNumber: "",
//       postalCode: "",
//       iban: "",
//       businessActivity: "",
//       accountant: "",
//       owner: "",
//       logo: "",
//       logoFile: null,
//     });
//     setEditPreview(null);
//     setEditError(null);
//     setEditLoading(false);
//   };
//   const handleEditChange = (field: keyof typeof editForm, value: any) => {
//     setEditForm((prev) => ({ ...prev, [field]: value }));
//     if (field === "logoFile" && value instanceof File) {
//       const url = URL.createObjectURL(value);
//       setEditPreview(url);
//     }
//     if (field === "logo" && value && !editForm.logoFile) {
//       setEditPreview(value);
//     }
//   };
//   const handleEditSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!editCompany) return;
//     try {
//       setEditLoading(true);
//       setEditError(null);

//       const formData = new FormData();
//       formData.append("name", editForm.name);
//       formData.append("address", editForm.address);
//       formData.append("tin", editForm.tin);
//       formData.append("taxIdentificationKey", editForm.taxIdentificationKey);
//       formData.append("commercialRegistryNumber", editForm.commercialRegistryNumber);
//       formData.append("ein", editForm.ein);
//       formData.append("taxpayerCategory", editForm.taxpayerCategory);
//       formData.append("establishmentNumber", editForm.establishmentNumber);
//       formData.append("iban", editForm.iban);
//       formData.append("businessActivity", editForm.businessActivity);
//       formData.append("accountant", editForm.accountant);
//       formData.append("owner", editForm.owner);
//       formData.append("phoneNumber", editForm.phoneNumber);
//       if (editForm.logoFile) {
//         formData.append("logo", editForm.logoFile);
//       } else {
//         formData.append("logo", editForm.logo);
//       }

//       await api.put(`/companies/${editCompany._id}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       closeEditDialog();
//       await fetchCompaniesAndUsers();
//     } catch (err: any) {
//       setEditError(err.response?.data?.error || err.message);
//     } finally {
//       setEditLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!deleteId) return;
//     try {
//       setLoading(true);
//       await api.delete(`/companies/${deleteId}`);
//       setDeleteId(null);
//       await fetchCompaniesAndUsers();
//     } catch (err: any) {
//       setError(err.response?.data?.error || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add Company handlers
//   const openAddDialog = () => {
//     setAddDialogOpen(true);
//     setAddForm({
//       name: "",
//       address: "",
//       tin: "",
//       taxIdentificationKey: "",
//       commercialRegistryNumber: "",
//       ein: "",
//       taxpayerCategory: "",
//       establishmentNumber: "",
//       phoneNumber: "",
//       emailAddress: "",
//       faxNumber: "",
//       city: "",
//       street: "",
//       streetNumber: "",
//       postalCode: "",
//       iban: "",
//       businessActivity: "",
//       accountant: user?.role === "accountant" ? user._id : "",
//       owner: user?.role === "admin" ? user._id : "",
//       logo: "",
//       logoFile: null,
//     });
//     setAddPreview(null);
//     setAddError(null);
//   };
//   const closeAddDialog = () => {
//     setAddDialogOpen(false);
//     setAddForm({
//       name: "",
//       address: "",
//       tin: "",
//       taxIdentificationKey: "",
//       commercialRegistryNumber: "",
//       ein: "",
//       taxpayerCategory: "",
//       establishmentNumber: "",
//       phoneNumber: "",
//       emailAddress: "",
//       faxNumber: "",
//       city: "",
//       street: "",
//       streetNumber: "",
//       postalCode: "",
//       iban: "",
//       businessActivity: "",
//       accountant: user?.role === "accountant" ? user._id : "",
//       owner: "",
//       logo: "",
//       logoFile: null,
//     });
//     setAddPreview(null);
//     setAddError(null);
//     setAddLoading(false);
//   };
//   const handleAddChange = (field: keyof typeof addForm, value: any) => {
//     setAddForm((prev) => ({ ...prev, [field]: value }));
//     if (field === "logoFile" && value instanceof File) {
//       const url = URL.createObjectURL(value);
//       setAddPreview(url);
//     }
//     if (field === "logo" && value && !addForm.logoFile) {
//       setAddPreview(value);
//     }
//   };
//   const handleAddSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       setAddLoading(true);
//       setAddError(null);

//       const formData = new FormData();
//       formData.append("name", addForm.name);
//       formData.append("address", addForm.address);
//       formData.append("tin", addForm.tin);
//       formData.append("taxIdentificationKey", addForm.taxIdentificationKey);
//       formData.append("commercialRegistryNumber", addForm.commercialRegistryNumber);
//       formData.append("ein", addForm.ein);
//       formData.append("taxpayerCategory", addForm.taxpayerCategory);
//       formData.append("establishmentNumber", addForm.establishmentNumber);
//       formData.append("iban", addForm.iban);
//       formData.append("businessActivity", addForm.businessActivity);
//       formData.append("accountant", addForm.accountant);
//       formData.append("owner", addForm.owner);
//       formData.append("phoneNumber", addForm.phoneNumber);
//       if (addForm.logoFile) {
//         formData.append("logo", addForm.logoFile);
//       } else {
//         formData.append("logo", addForm.logo);
//       }
//       await api.post(`/companies`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       closeAddDialog();
//       await fetchCompaniesAndUsers();
//     } catch (err: any) {
//       setAddError(err.response?.data?.error || err.message);
//     } finally {
//       setAddLoading(false);
//     }
//   };