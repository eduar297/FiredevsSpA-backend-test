const mongoose = require("mongoose"),
  objectId = mongoose.Schema.ObjectId,
  groupSchema = new mongoose.Schema(
    {
      name: String,
      professorId: { type: objectId, ref: "Professor" },
    },
    { timestamps: true }
  );

module.exports = mongoose.model("Group", groupSchema);
