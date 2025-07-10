// Documents routes, CommonJS, JavaScript-only

const express = require('express');
const jwtAuth = require('../auth/jwtAuth');
const {
  getAllDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
  downloadDocument,
} = require('../controllers/DocumentController');

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const companyDocsDir = path.join(__dirname, "../../public/uploads/company-documents");
if (!fs.existsSync(companyDocsDir)) {
  fs.mkdirSync(companyDocsDir, { recursive: true });
}
const allowedMimeTypes = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
  "text/csv",
];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, companyDocsDir);
  },
  filename: function (req, file, cb) {
    const base =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).replace(/[^.\w]/g, "");
    cb(null, base + ext);
  },
});

// Max 20 MB, filter types
const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(
        new multer.MulterError(
          "LIMIT_UNEXPECTED_FILE",
          "File type not allowed"
        ),
        false
      );
    }
    cb(null, true);
  },
});

const router = express.Router();

// All document routes protected
const { cacheResult } = require("../utils/cache");

router.get('/', jwtAuth, cacheResult("documents", 30), getAllDocuments);
router.get('/:id', jwtAuth, cacheResult("documents_id", 15), getDocumentById);
router.get('/:id/download', jwtAuth, downloadDocument);
router.post('/', jwtAuth, upload.single("file"), createDocument);
router.put('/:id', jwtAuth, upload.single("file"), updateDocument);
router.delete('/:id', jwtAuth, deleteDocument);

/**
 * Multer error handler for file uploads
 */
router.use(function (err, req, res, next) {
  if (err instanceof multer.MulterError) {
    let message =
      err.code === "LIMIT_FILE_SIZE"
        ? "File too large. Maximum 20MB allowed."
        : err.message === "File type not allowed"
        ? "File type not allowed."
        : "File upload error.";
    return res.status(400).json({ error: message });
  }
  next(err);
});

module.exports = router;