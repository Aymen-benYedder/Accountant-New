const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema(
  {
    //  Company Identification
    name: { type: String, required: true },
    tin: { type: String, required: true }, // Tax Identification Number
    taxIdentificationKey: { type: String, default: "" }, // Check Digit / Key
    commercialRegistryNumber: { type: String, default: "" }, // Trade Register Number
    ein: { type: String, default: "" }, // Employer Identification Number
    taxpayerCategory: { type: String, default: "" }, // Taxpayer Category / Tax Classification
    establishmentNumber: { type: String, default: "" }, // Establishment Number / Business Location

    //  Contact Information
    phoneNumber: { type: String, default: "" },
    faxNumber: { type: String, default: "" },
    emailAddress: { type: String, default: "" },

    //  Address Information
    address: { type: String }, // Full legacy address
    city: { type: String, default: "" },
    street: { type: String, default: "" },
    streetNumber: { type: String, default: "" },
    postalCode: { type: String, default: "" },

    //  Banking Information
    iban: { type: String, default: "" }, // Bank Account / IBAN

    // 🧾 Business Details
    businessActivity: { type: String, default: "" }, // Business Sector / Activity
    accountant: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    logo: { type: String, default: "" }, // Store image URL or path

    //  Relationships
    // Track who created this company (for 'accountant' or owner-based filtering)
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Company', companySchema);
