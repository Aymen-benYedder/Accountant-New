const mongoose = require("mongoose");
const { Schema } = mongoose;

const DocumentSchema = new Schema(
  {
    filename: { type: String, required: true },
    originalname: { type: String, required: true },
    mimetype: { type: String, required: true },
    size: { type: Number },
    path: { type: String, required: true }, // relative storage path
    company: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true }, // who uploaded
    category: { type: String, required: true }, // e.g., "legal", "invoice", "contract", etc.
    description: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Document", DocumentSchema);