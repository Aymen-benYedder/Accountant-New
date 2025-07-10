/* INDUSTRIAL-GRADE BACKEND IMPLEMENTATION GUIDE */

// ======================
// 1. ENHANCED MODELS
// ======================

/* models/Task.js */
const TaskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 120 
  },
  assignedTo: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',
    index: true 
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending',
    index: true
  },
  deadline: {
    type: Date,
    validate: {
      validator: v => v > Date.now(),
      message: 'Deadline must be in future'
    }
  },
  isDeleted: { type: Boolean, default: false },
  version: { type: Number, default: 1 },
  history: [{
    _id: false,
    timestamp: Date,
    changes: Schema.Types.Mixed,
    modifiedBy: Schema.Types.ObjectId
  }]
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// ======================
// 2. INDUSTRIAL CONTROLLERS
// ======================

/* controllers/tasks.controller.js */
const AppError = require('../utils/appError');
const TaskService = require('../services/task.service');
const AuditService = require('../services/audit.service');

class TaskController {
  constructor(io) {
    this.io = io;
    this.createTask = this.createTask.bind(this);
  }

  async createTask(req, res, next) {
    try {
      const task = await TaskService.createTask({
        ...req.validatedData,
        createdBy: req.user.id
      });
      
      // Real-time update
      this.io.to(task.clientId).emit('task:created', task);
      
      // Audit logging
      await AuditService.log({
        action: 'TASK_CREATE',
        entityId: task._id,
        userId: req.user.id,
        metadata: {
          ip: req.ip,
          userAgent: req.headers['user-agent']
        }
      });

      res.status(201).json({
        status: 'success',
        data: task
      });
    } catch (err) {
      next(new AppError('TASK_CREATION_FAILED', 400, err));
    }
  }
}

// ======================
// 3. SECURITY MIDDLEWARE
// ======================

/* middleware/security.js */
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

// Security headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// XSS protection
app.use(xss());

// ======================
// 4. ERROR HANDLING SYSTEM
// ======================

/* utils/AppError.js */
class AppError extends Error {
  constructor(code, statusCode, originalError) {
    super(code);
    this.statusCode = statusCode || 500;
    this.originalError = originalError;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

/* utils/errorHandler.js */
const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode).json({
    error: {
      code: err.code,
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && {
        stack: err.stack,
        details: err.originalError
      })
    }
  });
};

// ======================
// 5. VALIDATION SYSTEM
// ======================

/* validators/task.validator.js */
const Joi = require('joi');

module.exports = {
  createTask: Joi.object({
    title: Joi.string().required().max(120),
    description: Joi.string().max(500),
    deadline: Joi.date().iso().greater('now'),
    clientId: Joi.string().hex().length(24)
  })
};

// ======================
// 6. DEPLOYMENT READINESS
// ======================

/* config/docker-compose.yml */
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - redis
      - mongo

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"

  mongo:
    image: mongo:5.0
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:

// ======================
// 7. OBSERVABILITY
// ======================

/* config/logger.js */
const pino = require('pino');

module.exports = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label })
  },
  timestamp: () => `,"time":"${new Date().toISOString()}"`
});

/* END OF INDUSTRIAL IMPLEMENTATION GUIDE */