const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const linkRoutes = require("./routes/linkRoutes");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 3000;
require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

app.get("/", (req, res) => {
  res.json({ message: "API is working" });
});

app.use("/api", linkRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
