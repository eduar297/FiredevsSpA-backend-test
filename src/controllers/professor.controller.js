const ctr = {},
  Account = require("../models/professor.model"),
  { createAccountToken } = require("../services/jwt");

ctr.register = async (req, res) => {
  const {
    specialty,
    name,
    lastName,
    address,
    bornCity,
    phone,
    sex,
    email,
    bornDate,
    password,
  } = req.body;

  //validar data.... to do

  const existingAccount = await Account.findOne({ email: email });

  if (existingAccount)
    return res.status(200).send({
      error: "Ya Existe un Usuario con ese email",
      account: existingAccount,
    });

  const newAccount = new Account({
    specialty,
    name,
    lastName,
    address,
    address,
    bornCity,
    phone,
    sex,
    email,
    bornDate: new Date(bornDate),
  });

  newAccount.password = newAccount.encryptPassword(password);
  const account = await newAccount.save();

  return res.status(200).send({
    token: createAccountToken(account._id, "professor"),
    account: account,
  });
};

ctr.login = async (req, res) => {
  const { email, password } = req.body;

  //validar data.... to do

  const account = await Account.findOne({ email: email });

  if (!account) return res.status(200).send({ error: "No estás registrado" });

  if (!account.comparePassword(password))
    return res.status(200).send({ error: "Contraseña incorrecta" });

  return res.status(200).send({
    token: createAccountToken(account._id, "professor"),
    account: account,
  });
};

ctr.me = async (req, res) => {
  //asumo que siempre va a existir tal id dado que lo tomo directamente del token
  const { id } = req.user,
    account = await Account.findById(id);

  res.status(200).send({
    account: account,
  });
};

ctr.edit = async (req, res) => {
  //asumo que siempre va a existir tal id dado que lo tomo directamente del token
  var account = await Account.findById(req.user.id);

  const {
    specialty,
    name,
    lastName,
    address,
    bornCity,
    phone,
    sex,
    // email,
    bornDate,
    password,
  } = req.body;

  //validar data.... to do

  account["specialty"] = specialty;
  account["name"] = name;
  account["lastName"] = lastName;
  account["address"] = address;
  account["bornCity"] = bornCity;
  account["phone"] = phone;
  account["sex"] = sex;
  // account["email"] = email; //el email no se debe poder editar
  account["bornDate"] = bornDate;
  account["password"] = account.encryptPassword(password);

  account = await account.save();

  res.status(200).json({ updatedAccount: account });
};

ctr.all = async (req, res) => {
  const accounts = (await Account.find()).map((item) => {
    return {
      _id: item._id,
      name: item.name,
      lastName: item.lastName,
      specialty: item.specialty,
    };
  });

  return res.status(200).json({ accounts });
};

ctr.deleteAccount = async (req, res) => {
  //asumo que siempre va a existir tal id dado que lo tomo directamente del token
  const { id } = req.user,
    account = await Account.findOneAndDelete({ _id: id });

  res.status(200).json({ deleted: account });
};

module.exports = ctr;
