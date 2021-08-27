const ctr = {},
  Account = require("../models/professor.model"),
  { createAccountToken } = require("../services/jwt"),
  validator = require("validator");

ctr.register = async (req, res) => {
  const {
    specialty,
    name,
    lastName,
    bornCity,
    sex,
    email,
    bornDate,
    password,
  } = req.body;

  if (name.length < 3)
    return res.status(400).send({
      msg: "El nombre debe tener al menos 3 caracteres",
      type: "name",
    });
  if (lastName.lenght > 3)
    return res.status(400).send({
      msg: "Los apellidos deben deben tener al menos 3 caracteres",
      type: "lastName",
    });
  if (bornCity.length < 3)
    return res
      .status(400)
      .send({ msg: "La ciudad no es válida", type: "bornCity" });
  if (sex.lenght > 3)
    return res.status(400).send({ msg: "El sexo no es válido", type: "sex" });
  if (!validator.isEmail(email))
    return res.status(400).send({ msg: "Email inválido", type: "email" });
  // if (!validator.isDate(new Date(bornCity)))
  //   return res.status(200).send({ error: "Fecha inválida" });
  // if (!validator.isStrongPassword(password))
  //   return res.status(200).send({ error: "Contraseña débil" });

  const existingAccount = await Account.findOne({ email: email });

  if (existingAccount)
    return res.status(400).send({
      msg: "Ya Existe un Usuario con ese email",
      type: "email",
    });

  const newAccount = new Account({
    specialty,
    name,
    lastName,
    bornCity,
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

  if (!validator.isEmail(email))
    return res.status(400).send({ msg: "Email inválido", type: "email" });

  const account = await Account.findOne({ email: email });

  if (!account)
    return res
      .status(400)
      .send({ msg: "No estás registrado", type: "unregistered" });

  if (!account.comparePassword(password))
    return res
      .status(400)
      .send({ msg: "Contraseña incorrecta", type: "password" });

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
    bornCity,
    sex,
    email,
    bornDate,
    password,
  } = req.body;

  if (name.length < 3)
    return res.status(400).send({
      msg: "El nombre debe tener al menos 3 caracteres",
      type: "name",
    });
  if (lastName.lenght > 3)
    return res.status(400).send({
      msg: "Los apellidos deben deben tener al menos 3 caracteres",
      type: "lastName",
    });
  if (bornCity.length < 3)
    return res
      .status(400)
      .send({ msg: "La ciudad no es válida", type: "bornCity" });
  if (sex.lenght > 3)
    return res.status(400).send({ msg: "El sexo no es válido", type: "sex" });
  if (!validator.isEmail(email))
    return res.status(400).send({ msg: "Email inválido", type: "email" });
  // if (!validator.isDate(new Date(bornCity)))
  //   return res.status(200).send({ error: "Fecha inválida" });
  // if (!validator.isStrongPassword(password))
  //   return res.status(200).send({ error: "Contraseña débil" });

  account["specialty"] = specialty;
  account["name"] = name;
  account["lastName"] = lastName;
  account["bornCity"] = bornCity;
  account["sex"] = sex;
  account["email"] = email;
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
