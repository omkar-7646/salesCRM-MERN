const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

const {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
} = require("../controllers/leadController");

// CREATE

router.post("/", auth, createLead);

// GET ALL

router.get("/", auth, getLeads);

// VERY IMPORTANT

router.get("/:id", auth, getLeadById);

// UPDATE

router.put("/:id", auth, updateLead);

// DELETE

router.delete("/:id", auth, deleteLead);

module.exports = router;
