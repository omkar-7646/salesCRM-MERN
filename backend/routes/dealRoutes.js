const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

const {
  createDeal,
  getDeals,
  updateDeal,
  deleteDeal,
} = require("../controllers/dealController");

router.post("/", auth, createDeal);

router.get("/", auth, getDeals);

router.put("/:id", auth, updateDeal);

router.delete("/:id", auth, deleteDeal);

module.exports = router;
