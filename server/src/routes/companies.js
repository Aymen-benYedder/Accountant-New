// companies.js — Express Router for Company entity

// companies.js — Express Router for Company entity

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const CompanyController = require("../controllers/CompanyController");
const jwtAuth = require("../auth/jwtAuth");

// Multer storage: store uploads in public/uploads/company-logos/ with original filename (add timestamp to avoid conflicts)
const uploadDir = path.join(__dirname, "../../public/uploads/company-logos");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Use unique filename: timestamp-originalname
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});
const upload = multer({ storage });
// GET /companies — Get all companies
const { cacheResult } = require("../utils/cache");

// Require authentication for all subsequent endpoints
router.use(jwtAuth);

// Apply caching to GET /companies for hot reads
router.get("/", cacheResult("companies", 30), CompanyController.getAllCompanies);


// GET /companies/:id — Get one company by id
router.get("/:id", CompanyController.getCompanyById);

// POST /companies — Create company (with logo upload)
router.post("/", upload.single('logo'), CompanyController.createCompany);

// PUT /companies/:id — Update company (with logo upload)
router.put("/:id", upload.single('logo'), CompanyController.updateCompany);

// DELETE /companies/:id — Delete company
router.delete("/:id", CompanyController.deleteCompany);

module.exports = router;