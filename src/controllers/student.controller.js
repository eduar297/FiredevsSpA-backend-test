const ctr = {},
  Account = require("../models/student.model"),
  Group = require("../models/group.model"),
  { createAccountToken } = require("../services/jwt"),
  validator = require("validator");

ctr.register = async (req, res) => {
  const { name, lastName, bornCity, sex, email, bornDate, password, groupId } =
    req.body;

  if (!validator.isAlpha(name))
    return res
      .status(200)
      .send({ error: "El nombre debe contener solo letras" });
  if (!validator.isAlpha(lastName))
    return res
      .status(200)
      .send({ error: "Los apellidos deben contener solo letras" });
  if (!validator.isAlpha(bornCity))
    return res
      .status(200)
      .send({ error: "La ciudad debe contener solo letras" });
  if (!validator.isAlpha(sex))
    return res.status(200).send({ error: "El sexo debe contener solo letras" });
  if (!validator.isEmail(email))
    return res.status(200).send({ error: "Email inválido" });
  // if (!validator.isDate(new Date(bornCity)))
  //   return res.status(200).send({ error: "Fecha inválida" });
  // if (!validator.isStrongPassword(password))
  //   return res.status(200).send({ error: "Contraseña débil" });

  if (!groupId)
    return res.status(200).send({
      error: "El estudiante debe tener un grupo asociado",
    });

  try {
    var group = await Group.findById(groupId);
    if (!group)
      return res.status(200).send({
        error: `El grupo con id ${groupId} no existe`,
      });
  } catch (ex) {
    return res.status(200).send({
      error: `groupId invalido`,
    });
  }

  const existingAccount = await Account.findOne({ email: email });

  if (existingAccount)
    return res.status(200).send({
      error: "Ya Existe un Usuario con ese email",
      account: existingAccount,
    });

  const newAccount = new Account({
    name,
    lastName,
    bornCity,
    sex,
    email,
    bornDate: new Date(bornDate),
    groupId,
  });

  newAccount.password = newAccount.encryptPassword(password);
  const account = await newAccount.save();

  return res.status(200).send({
    token: createAccountToken(account._id, "student"),
    account: account,
  });
};

ctr.login = async (req, res) => {
  const { email, password } = req.body;

  if (!validator.isEmail(email))
    return res.status(200).send({ error: "Email inválido" });

  const account = await Account.findOne({ email: email });

  if (!account) return res.status(200).send({ error: "No estás registrado" });

  if (!account.comparePassword(password))
    return res.status(200).send({ error: "Contraseña incorrecta" });

  return res.status(200).send({
    token: createAccountToken(account._id, "student"),
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
    name,
    lastName,
    bornCity,
    sex,
    // email,
    bornDate,
    password,
    groupId,
  } = req.body;

  if (!validator.isAlpha(name))
    return res
      .status(200)
      .send({ error: "El nombre debe contener solo letras" });
  if (!validator.isAlpha(lastName))
    return res
      .status(200)
      .send({ error: "Los apellidos deben contener solo letras" });
  if (!validator.isAlpha(bornCity))
    return res
      .status(200)
      .send({ error: "La ciudad debe contener solo letras" });
  if (!validator.isAlpha(sex))
    return res.status(200).send({ error: "El sexo debe contener solo letras" });
  // if (!validator.isEmail(email))
  //   return res.status(200).send({ error: "Email inválido" });
  // if (!validator.isDate(new Date(bornCity)))
  //   return res.status(200).send({ error: "Fecha inválida" });
  // if (!validator.isStrongPassword(password))
  //   return res.status(200).send({ error: "Contraseña débil" });

  if (!groupId)
    return res.status(200).send({
      error: "El estudiante debe tener un grupo asociado",
    });

  try {
    var group = await Group.findById(groupId);
    if (!group)
      return res.status(200).send({
        error: `El grupo con id ${groupId} no existe`,
      });
  } catch (ex) {
    return res.status(200).send({
      error: `groupId invalido`,
    });
  }

  account["name"] = name;
  account["groupId"] = groupId;
  account["lastName"] = lastName;
  account["bornCity"] = bornCity;
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
