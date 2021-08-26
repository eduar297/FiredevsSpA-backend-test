const mongoose = require("mongoose"),
  bcrypt = require("bcrypt-nodejs"),
  professorSchema = new mongoose.Schema(
    {
      specialty: String,
      name: String,
      lastName: String,
      address: String,
      bornCity: String,
      phone: String,
      sex: String,
      email: String,
      bornDate: Date,
      password: String,
    },
    { timestamps: true }
  );

professorSchema.methods.encryptPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));
professorSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("Professor", professorSchema);
