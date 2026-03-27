const express = require('express');
const router = express.Router();
const analyzeController = require('../controllers/analyzeController'); // Sharing controller for simplicity
const auth = require('../middleware/auth');

router.post('/', auth, analyzeController.updateFilters);

module.exports = router;
