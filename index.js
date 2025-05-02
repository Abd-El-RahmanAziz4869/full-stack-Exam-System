const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const examRoutes = require('./routes/exams');

dotenv.config();
const app = express();

// Enable CORS for Angular frontend
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/exam-system",{
    serverSelectionTimeoutMS: 30000
  })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/exams', examRoutes);

// Not found middleware
app.use((req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: 'fail',
    message: err.message || 'Something went wrong!'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));