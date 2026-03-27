const router = require("express").Router();
const auth = require("../middleware/auth");
const { analyze } = require("../controllers/analyzeController");

router.post("/", auth, analyze);

module.exports = router;
