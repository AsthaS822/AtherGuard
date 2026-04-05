const router = require("express").Router();
const auth = require("../middleware/auth");
const { analyze, getLogs } = require("../controllers/analyzeController");

router.post("/", auth, analyze);
router.get("/logs", auth, getLogs);

module.exports = router;
