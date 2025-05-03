const Exam = require('../models/exams');
// List Exams (admin and student)
const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find().populate('createdBy', 'username');
    res.json({ status: 'success', data: exams });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
};
// Create Exam (admin only)
const createExam = async (req, res) => {
  const { title, duration } = req.body;
  try {
    const exam = new Exam({ title, duration, createdBy: req.user.id });
    await exam.save();
    res.status(201).json({ status: 'success', data: exam });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
};
// Update Exam (admin)
const updateExam = async (req, res) => {
  const { title, duration } = req.body;
  try {
    const exam = await Exam.findByIdAndUpdate(
      req.params.id,
      { title, duration },
      { new: true }
    );
    if (!exam) return res.status(404).json({ status: 'fail', message: 'Exam not found' });
    res.json({ status: 'success', data: exam });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
};
// Delete Exam (admin only)
const deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);
    if (!exam) return res.status(404).json({ status: 'fail', message: 'Exam not found' });
    res.json({ status: 'success', message: 'Exam deleted' });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
};

module.exports = { getAllExams, createExam, updateExam, deleteExam };