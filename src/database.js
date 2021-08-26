const mongoose = require("mongoose"),
  URI = process.env.MONGODB_URI || "mongodb://localhost/university_db";

async function connect() {
  await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`>> Successful db (${URI}) connection`);
}

module.exports = { connect };
