const express = require('express');
const router = express.Router();
const examSchema = require('../validation/examValidation');
const { validation } = require('../middlewares/validation');
const { auth, adminOnly } = require('../middlewares/auth');
const { getAllExams, createExam, updateExam, deleteExam } = require('../controllers/exams');

router.get('/', auth, getAllExams);
router.post('/', auth, adminOnly, createExam);
router.put('/:id', auth, adminOnly, updateExam);
router.delete('/:id', auth, adminOnly, deleteExam);

module.exports = router;