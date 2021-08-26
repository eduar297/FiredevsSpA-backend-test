require("dotenv").config();

const express = require("express"),
  cors = require("cors"),
  app = express();

//middlewares
app.use(cors());
app.use(express.json());

app.use("/api/professor", require("./routes/professor.route"));
app.use("/api/group", require("./routes/group.route"));

module.exports = { server: app };
