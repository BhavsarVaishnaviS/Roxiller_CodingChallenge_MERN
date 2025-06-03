const express = require("express");
const cors = require("cors");
const db = require("./config/db"); 
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const storeRoutes = require("./routes/storeRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", storeRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});
