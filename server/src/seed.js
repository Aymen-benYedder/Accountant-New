// Cleaned & deterministic full seed for RBAC: admin, accountant, owner
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcrypt');

const Category = require('./models/Category');
const User = require('./models/User');
const Company = require('./models/Company');
const Document = require('./models/Document');
const Task = require('./models/Task');
const AuditLog = require('./models/AuditLog');
const BroadcastMessage = require('./models/BroadcastMessage');

dotenv.config({ path: path.resolve(__dirname, '../.env') });
mongoose.set('strictQuery', true);

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function seed() {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGO_URI_DEV;
    if (!mongoUri) throw new Error('MongoDB URI not defined in environment variables');

    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');
    
    // Full DB cleanup!
    await mongoose.connection.db.dropDatabase();
    console.log("🗑️  Database dropped completely, starting from zero.");

    // 1. Seed base users with predefined roles and relations
    // Admins
    const baseUsers = [
      { name: 'Admin One', email: 'admin1@example.com', password: 'admin1pass', role: 'admin' }, // 0
      { name: 'Admin Two', email: 'admin2@example.com', password: 'admin2pass', role: 'admin' }, // 1
      // Accountants
      { name: 'Accountant Alice', email: 'alice.acct@example.com', password: 'aliceacct', role: 'accountant' }, // 2
      { name: 'Accountant Bob', email: 'bob.acct@example.com', password: 'bobacct', role: 'accountant' }, // 3
      { name: 'Accountant Cara', email: 'cara.acct@example.com', password: 'caraacct', role: 'accountant' }, // 4
    ];

    // Owners (each group of 3 created by one of the accountants)
    const owners = [
      // Created by Accountant Alice (idx:2)
      { name: 'Owner Alpha', email: 'alpha.owner@example.com', password: 'alphapass', role: 'owner', createdByIdx: 2 }, // 5
      { name: 'Owner Bravo', email: 'bravo.owner@example.com', password: 'bravopass', role: 'owner', createdByIdx: 2 }, // 6
      { name: 'Owner Charlie', email: 'charlie.owner@example.com', password: 'charliepass', role: 'owner', createdByIdx: 2 }, // 7
      // Created by Accountant Bob (idx:3)
      { name: 'Owner Delta', email: 'delta.owner@example.com', password: 'deltapass', role: 'owner', createdByIdx: 3 }, // 8
      { name: 'Owner Echo', email: 'echo.owner@example.com', password: 'echopass', role: 'owner', createdByIdx: 3 }, // 9
      { name: 'Owner Foxtrot', email: 'foxtrot.owner@example.com', password: 'foxtrotpass', role: 'owner', createdByIdx: 3 }, // 10
      // Created by Accountant Cara (idx:4)
      { name: 'Owner Golf', email: 'golf.owner@example.com', password: 'golfpass', role: 'owner', createdByIdx: 4 }, // 11
      { name: 'Owner Hotel', email: 'hotel.owner@example.com', password: 'hotelpass', role: 'owner', createdByIdx: 4 }, // 12
      { name: 'Owner India', email: 'india.owner@example.com', password: 'indiapass', role: 'owner', createdByIdx: 4 }, // 13
    ];

    // Hash and create all users in DB, tracking ObjectIds
    const userDocs = [];
    for (let i = 0; i < baseUsers.length; i++) {
      const data = baseUsers[i];
      const passwordHash = await hashPassword(data.password);
      const u = await User.create({ ...data, passwordHash });
      userDocs.push(u);
      console.log("Seeded admin/acct:", u.name);
    }
    for (let i = 0; i < owners.length; i++) {
      const data = owners[i];
      const passwordHash = await hashPassword(data.password);
      const u = await User.create({
        name: data.name,
        email: data.email,
        role: data.role,
        passwordHash,
        createdBy: userDocs[data.createdByIdx]._id
      });
      userDocs.push(u);
      console.log("Seeded owner:", u.name, "created by accountant index", data.createdByIdx);
    }

    // 2. Create basic categories
    const categories = await Category.insertMany([
      { name: "Invoice", description: "Invoice docs" }, // 0
      { name: "Contract", description: "Contract files" }, // 1
      { name: "Tax", description: "Tax documents" }, // 2
    ]);
    console.log("Categories seeded.");

    // 3. Companies (each linked to an owner and an accountant)
    // [companyIdx]: { name, accountantIdx, ownerIdx }
    // 9 companies, each owner has at least 1 company. Some owners have >1 for realism.
    // accountantIdx refers to accountants in userDocs (2=Alice, 3=Bob, 4=Cara)
    // ownerIdx refers to userDocs[5..13] after owners are seeded.
    const compDefs = [
      // Alice group (Alpha, Bravo, Charlie: 5,6,7)
      { name: "Acme Manufacturing", accountantIdx: 2, ownerIdx: 5, tin: "ACM-001", address: "100 Acme Ave", phoneNumber: "555-1001" },
      { name: "Bravo Enterprises", accountantIdx: 2, ownerIdx: 6, tin: "BRAVO-002", address: "200 Bravo Road", phoneNumber: "555-1002" },
      { name: "Bravos Second Co", accountantIdx: 2, ownerIdx: 6, tin: "BRAVO-003", address: "201 Bravo St", phoneNumber: "555-1003" }, // Bravo has 2 companies
      { name: "Charlie Services", accountantIdx: 2, ownerIdx: 7, tin: "CHAR-004", address: "300 Charlie Blvd", phoneNumber: "555-1004" },

      // Bob group (Delta, Echo, Foxtrot: 8,9,10)
      { name: "Delta Freight", accountantIdx: 3, ownerIdx: 8, tin: "DELTA-005", address: "400 Delta Dr", phoneNumber: "555-1005" },
      { name: "Echo Systems", accountantIdx: 3, ownerIdx: 9, tin: "ECHO-006", address: "500 Echo Pkwy", phoneNumber: "555-1006" },
      { name: "Foxtrot Logistics", accountantIdx: 3, ownerIdx: 10, tin: "FOX-007", address: "600 Fox Road", phoneNumber: "555-1007" },

      // Cara group (Golf, Hotel, India: 11,12,13)
      { name: "Golf Holdings", accountantIdx: 4, ownerIdx: 11, tin: "GOLF-008", address: "700 Golf Ave", phoneNumber: "555-1008" },
      { name: "Hotel Realty", accountantIdx: 4, ownerIdx: 12, tin: "HOTEL-009", address: "800 Hotel St", phoneNumber: "555-1009" },
      { name: "India Retail", accountantIdx: 4, ownerIdx: 13, tin: "IND-010", address: "900 India Plaza", phoneNumber: "555-1010" },
      { name: "Hotel Ventures", accountantIdx: 4, ownerIdx: 12, tin: "HOTEL-011", address: "801 Hotel St", phoneNumber: "555-1011" }, // Hotel has 2 companies
    ];
    const compDocs = [];
    for (const c of compDefs) {
      const company = new Company({
        name: c.name,
        accountant: userDocs[c.accountantIdx]._id,
        owner: userDocs[c.ownerIdx]._id,
        tin: c.tin,
        address: c.address,
        phoneNumber: c.phoneNumber,
        createdBy: userDocs[c.accountantIdx]._id
      });
      await company.save();
      compDocs.push(company);

      // assign company to owner's profile (.companies array)
      await User.updateOne(
        { _id: userDocs[c.ownerIdx]._id },
        { $addToSet: { companies: company._id } }
      );
    }
    console.log("Companies seeded.");
// 5. Messages between accountant & owner for each company
const Message = require('./models/Message');
const fakeConvoContents = [
  [
    "Hi, have you finished the monthly report?",
    "Yes, sent it last night.",
    "Great, I will check it now.",
    "Let me know if you need anything changed.",
    "All looks good. Please upload next quarter's invoices soon."
  ],
  [
    "Reminder: tax docs due next week.",
    "Thank you! Will start uploading today.",
    "Let me know if you run into any problems.",
    "Will do. By the way, did you see the new expense document?",
    "Yes, looks perfect."
  ]
];
let msgCount = 0;
for (const [i, company] of compDocs.entries()) {
  const accountant = company.accountant;
  const owner = company.owner;
  const thread = fakeConvoContents[i % fakeConvoContents.length];
  for (let j = 0; j < thread.length; j++) {
    const isAcctSender = j % 2 === 0;
    await Message.create({
      taskId: company._id, // use company as task context
      senderId: isAcctSender ? accountant : owner,
      recipientId: isAcctSender ? owner : accountant,
      content: thread[j],
      timestamp: new Date(Date.now() - ((thread.length-j)*3600*1000 + i*24*3600*1000)) // back-seed timestamps
    });
    msgCount++;
  }
}
console.log(`Seeded ${msgCount} messages for accountant-owner pairs.`);

    // 4. Documents (1 per company)
    const docs = [];
    for (let i = 0; i < compDocs.length; i++) {
      // 1 doc from owner
      const docOwner = await Document.create({
        owner: compDocs[i].owner,
        company: compDocs[i]._id,
        filename: `owner-doc${i+1}.pdf`,
        originalname: `OwnerDoc${i+1}_original.pdf`,
        mimetype: "application/pdf",
        size: 2048*(i+1),
        path: `uploads/company-documents/owner-doc${i+1}.pdf`,
        category: categories[i % categories.length].name,
        description: `Owner sample document for ${compDocs[i].name}`
      });
      // 1 doc from accountant
      const docAcct = await Document.create({
        owner: compDocs[i].accountant,
        company: compDocs[i]._id,
        filename: `acct-doc${i+1}.pdf`,
        originalname: `AcctDoc${i+1}_original.pdf`,
        mimetype: "application/pdf",
        size: 1024*(i+1),
        path: `uploads/company-documents/acct-doc${i+1}.pdf`,
        category: categories[(i + 1) % categories.length].name,
        description: `Accountant document for ${compDocs[i].name}`
      });

      // Sanity check: Ensure newly inserted documents point only to company owner or accountant
      if (
        !(
          (String(docOwner.owner) === String(compDocs[i].owner) || String(docOwner.owner) === String(compDocs[i].accountant)) &&
          (String(docAcct.owner) === String(compDocs[i].owner) || String(docAcct.owner) === String(compDocs[i].accountant))
        )
      ) {
        console.warn("❗ Unexpected document owner detected for company:", compDocs[i].name);
      }
      // (duplicate Document.create removed)
      // stray/duplicate Document.create and docs.push removed
    }
    console.log("Documents seeded.");

    // 5. Tasks (various owners/accountants assigned)
    const tasks = [];
    for (let i = 0; i < compDocs.length; i++) {
      const assignedTo = [compDocs[i].accountant, compDocs[i].owner][i % 2];
      const task = await Task.create({
        title: `Task for ${compDocs[i].name}`,
        assignedTo,
        status: ["pending", "in_progress", "completed"][i % 3],
        description: `Auto-gen task ${i+1}`,
        category: categories[(i + 1) % categories.length]._id
      });
      tasks.push(task);
    }
    console.log("Tasks seeded.");

    // 6. AuditLog: Show creation events
    await AuditLog.insertMany(docs.map((d) => ({
      entityType: "Document",
      entityId: d._id,
      action: "create",
      changes: { filename: d.filename },
      performedBy: d.owner
    })));
    console.log("Audit logs seeded.");

    // 7. BroadcastMessages: 1 from accountant, 1 from admin
    await BroadcastMessage.insertMany([
      {
        createdBy: userDocs[2]._id,
        content: "Quarterly review meeting next week.",
        recipientIds: [userDocs[5]._id, userDocs[6]._id, userDocs[7]._id]
      },
      {
        createdBy: userDocs[0]._id,
        content: "Platform update this weekend.",
        recipientIds: [userDocs[2]._id, userDocs[3]._id]
      }
    ]);
    console.log("Broadcasts seeded.");

    console.log('🎉 All data seeded successfully.');
    process.exit(0);
  } catch (e) {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  }
}

seed();
