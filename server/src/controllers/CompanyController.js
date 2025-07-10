// CompanyController.js - Handles CRUD for Company and synchronizes User.companies field

const Company = require("../models/Company");
const User = require("../models/User");
const mongoose = require("mongoose");

// Get all companies, optionally populated
const getAllCompanies = async (req, res) => {
  try {
    let filter = {};
    if (req.user && req.user.role === 'accountant') {
      filter.accountant = req.user._id;
      console.log("[CompanyController:getAllCompanies] Accountant filter:", filter);
    }
    if (req.user && req.user.role === 'owner') {
      filter.owner = req.user._id;
      console.log("[CompanyController:getAllCompanies] Owner filter:", filter);
    }
    const companies = await Company.find(filter).populate("accountant owner", "name email");
    console.log("[CompanyController:getAllCompanies] Results found:", companies.length);
    
    if (companies.length === 0) {
      console.log("[CompanyController:getAllCompanies] No companies found with filter:", filter);
    }
    
    res.json(companies);
  } catch (err) {
    console.error("[CompanyController:getAllCompanies] Error:", err);
    res.status(500).json({ message: "Error fetching companies", error: err.message });
  }
};

// Get one company by ID
const getCompanyById = async (req, res) => {
  console.log("in getCompanyById, req.params.id : ", req.params.id);

  try {
    // Print the name of the connected DB
    console.log("Connected DB:", require("mongoose").connection.name);
    // Print number of company documents
    const count = await Company.countDocuments();
    console.log("Company document count:", count);

    // Print all company _ids and their types
    const allCompanies = await Company.find({}, { _id: 1 });
    console.log("All _ids in companies collection:");
    allCompanies.forEach((doc) => {
      console.log(
        doc._id,
        "type:",
        typeof doc._id,
        "is ObjectId:",
        doc._id && doc._id.constructor && doc._id.constructor.name
      );
    });

    // Print one company doc
    const anyCompany = await Company.findOne({});
    console.log("Sample company doc:", anyCompany);

    let findFilter = { _id: req.params.id };
    if (req.user && req.user.role === 'accountant') {
      findFilter.createdBy = req.user._id;
    }
    if (req.user && req.user.role === 'owner') {
      findFilter.owner = req.user._id;
    }
    const company = await Company.findOne(findFilter).populate("accountant owner", "name email");
    if (!company) {
      console.log("Company.findById returned null for id:", req.params.id);
      return res.status(404).json({ message: "Company not found or access denied" });
    }
    res.json(company);
  } catch (err) {
    console.error("Error in getCompanyById:", err);
    res.status(500).json({ message: "Error fetching company", error: err.message });
  }
};

// Create a new company and sync owner's companies list
const createCompany = async (req, res) => {
  try {
    console.log("--- Incoming createCompany ---");
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const {
      name, address, tin, phoneNumber = "",
      taxIdentificationKey = "", commercialRegistryNumber = "", ein = "",
      taxpayerCategory = "", establishmentNumber = "", emailAddress = "",
      faxNumber = "", city = "", street = "", streetNumber = "",
      postalCode = "", iban = "", businessActivity = "",
      accountant,
      owner
    } = req.body;

    let logo = req.body.logo || "";
    if (req.file) {
      // Store the logo as a served URL path
      logo = "/uploads/company-logos/" + req.file.filename;
    }
    if (!tin) {
      return res.status(400).json({ message: "TIN is required" });
    }
    // Set accountant and owner logic
    let accountantId, ownerId;
    if (req.user && req.user.role === 'admin') {
      accountantId = accountant;
      ownerId = owner;
    } else if (req.user && req.user.role === 'accountant') {
      accountantId = req.user._id;
      return res.status(403).json({ message: "Accountant can only create company for another user with role 'owner'" });
    } else if (req.user && req.user.role === 'owner') {
      return res.status(403).json({ message: "Owners cannot create companies" });
    }

    if (!accountantId) {
      return res.status(400).json({ message: "Accountant is required" });
    }
    if (!ownerId) {
      return res.status(400).json({ message: "Owner is required" });
    }

    const company = new Company({
      name,
      address,
      tin,
      accountant: accountantId,
      owner: ownerId,
      phoneNumber,
      taxIdentificationKey,
      commercialRegistryNumber,
      ein,
      taxpayerCategory,
      establishmentNumber,
      emailAddress,
      faxNumber,
      city,
      street,
      streetNumber,
      postalCode,
      iban,
      businessActivity,
      logo,
      createdBy: (req.user && req.user.role === 'accountant') ? req.user._id : undefined
    });

    await company.save();

    // Add this company to owner's .companies array
    await User.updateOne(
      { _id: ownerId },
      { $addToSet: { companies: company._id } }
    );

    // Invalidate cache for companies
    try {
      const { delCache } = require("../utils/cache");
      await delCache(/^companies/);
    } catch (err) {}
    res.status(201).json(company);
  } catch (err) {
    res.status(400).json({ message: "Error creating company", error: err.message });
  }
};

// Update company and synchronize owner association
const updateCompany = async (req, res) => {
  try {
    const {
      name, address, tin, phoneNumber, logo,
      taxIdentificationKey,
      commercialRegistryNumber,
      ein,
      taxpayerCategory,
      establishmentNumber,
      emailAddress,
      faxNumber,
      city,
      street,
      streetNumber,
      postalCode,
      iban,
      businessActivity
    } = req.body;
    let findFilter = { _id: req.params.id };
    if (req.user && req.user.role === 'accountant') {
      findFilter.accountant = req.user._id;  // Only allow updating if user is this company's accountant
    }
    if (req.user && req.user.role === 'owner') {
      findFilter.owner = req.user._id;
    }
    const company = await Company.findOne(findFilter);
    if (!company) return res.status(404).json({ message: "Company not found or access denied" });

    // Only admin can change accountant/owner
    if (req.user && req.user.role === "admin") {
      if (req.body.accountant !== undefined) company.accountant = req.body.accountant;
      if (req.body.owner !== undefined) {
        // If owner changed, update company link on both old and new owner
        if (company.owner && company.owner.toString() !== req.body.owner) {
          await User.updateOne(
            { _id: company.owner },
            { $pull: { companies: company._id } }
          );
          await User.updateOne(
            { _id: req.body.owner },
            { $addToSet: { companies: company._id } }
          );
        }
        company.owner = req.body.owner;
      }
    }

    // Apply updates
    if (name !== undefined) company.name = name;
    if (address !== undefined) company.address = address;
    if (tin !== undefined) company.tin = tin;
    if (phoneNumber !== undefined) company.phoneNumber = phoneNumber;
    if (taxIdentificationKey !== undefined) company.taxIdentificationKey = taxIdentificationKey;
    if (commercialRegistryNumber !== undefined) company.commercialRegistryNumber = commercialRegistryNumber;
    if (ein !== undefined) company.ein = ein;
    if (taxpayerCategory !== undefined) company.taxpayerCategory = taxpayerCategory;
    if (establishmentNumber !== undefined) company.establishmentNumber = establishmentNumber;
    if (emailAddress !== undefined) company.emailAddress = emailAddress;
    if (faxNumber !== undefined) company.faxNumber = faxNumber;
    if (city !== undefined) company.city = city;
    if (street !== undefined) company.street = street;
    if (streetNumber !== undefined) company.streetNumber = streetNumber;
    if (postalCode !== undefined) company.postalCode = postalCode;
    if (iban !== undefined) company.iban = iban;
    if (businessActivity !== undefined) company.businessActivity = businessActivity;
    if (req.file) {
      // New file uploaded: save as logo URL path
      company.logo = "/uploads/company-logos/" + req.file.filename;
    } else if (logo !== undefined) {
      // Only update if defined (allow clearing or manual change)
      company.logo = logo;
    }

    await company.save();

    // Invalidate cache for companies
    try {
      const { delCache } = require("../utils/cache");
      await delCache(/^companies/);
      await delCache(`companies_id:${company._id}`);
    } catch (err) {}
    res.json(company);
  } catch (err) {
    res.status(400).json({ message: "Error updating company", error: err.message });
  }
};

// Delete a company and remove from all users' companies list
const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" });

    // Remove company from owner's .companies array
    await User.updateOne(
      { _id: company.owner },
      { $pull: { companies: company._id } }
    );

    await company.deleteOne();

    // Invalidate cache for companies
    try {
      const { delCache } = require("../utils/cache");
      await delCache(/^companies/);
      await delCache(`companies_id:${company._id}`);
    } catch (err) {}
    res.json({ message: "Company deleted" });
  } catch (err) {
    res.status(400).json({ message: "Error deleting company", error: err.message });
  }
};

module.exports = {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
};