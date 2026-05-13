const router = require("express").Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const { getUsers, deleteUser } = require("../controllers/userController");

router.get("/", auth, role("admin"), getUsers);
router.delete("/:id", auth, role("admin"), deleteUser);

module.exports = router;
