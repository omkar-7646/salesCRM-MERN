require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/leads", require("./routes/leadRoutes"));
app.use("/api/deals", require("./routes/dealRoutes"));
app.use("/api/activities", require("./routes/activityRoutes"));

app.listen(process.env.PORT, () => {
  console.log("Server running");
});
