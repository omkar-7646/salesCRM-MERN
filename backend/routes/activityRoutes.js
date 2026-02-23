const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

const {
  createActivity,
  getActivities,
  deleteActivity,
} = require("../controllers/activityController");

router.post("/", auth, createActivity);

router.get("/", auth, getActivities);

router.delete("/:id", auth, deleteActivity);

module.exports = router;
