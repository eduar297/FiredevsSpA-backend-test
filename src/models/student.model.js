const mongoose = require("mongoose"),
  objectId = mongoose.Schema.ObjectId,
  bcrypt = require("bcrypt-nodejs"),
  studentSchema = new mongoose.Schema(
    {
      name: String,
      lastName: String,
      bornCity: String,
      sex: String,
      email: String,
      bornDate: Date,
      password: String,
      groupId: { type: objectId, ref: "Group" },
    },
    { timestamps: true }
  );

studentSchema.methods.encryptPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));
studentSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("Student", studentSchema);
