const ctr = {},
  Group = require("../models/group.model"),
  Professor = require("../models/professor.model");

ctr.create = async (req, res) => {
  const { name, professorId } = req.body,
    existingGroup = await Group.findOne({ name: name });

  if (!name) {
    return res.status(400).send({
      msg: "El grupo debe tener un nombre",
      type: "name",
    });
  }

  if (!professorId)
    return res.status(400).send({
      msg: "El grupo debe tener un profesor guía",
      type: "professor",
    });

  try {
    var professor = await Professor.findById(professorId);
    if (!professor)
      return res.status(400).send({
        msg: `El profesor con id ${professorId} no existe`,
        type: "professor",
      });
  } catch (ex) {
    return res.status(400).send({
      msg: `professorId invalido`,
      type: "professor",
    });
  }

  if (existingGroup)
    return res.status(400).send({
      msg: "Ya existe un grupo con ese nombre",
      type: "name",
    });

  const newGroup = new Group({
      name,
      professorId,
    }),
    group = await newGroup.save();

  return res.status(200).send({
    group,
  });
};

ctr.get = async (req, res) => {
  const id = req.params.id;

  try {
    var group = await Group.findById(id);
    if (!group)
      return res.status(400).send({
        msg: `El grupo con id ${id} no existe`,
        type: "group",
      });
  } catch (ex) {
    return res.status(400).send({
      msg: `id invalido`,
      type: "group",
    });
  }

  res.status(200).send({
    group,
  });
};

ctr.edit = async (req, res) => {
  const { name, professorId } = req.body,
    id = req.params.id;

  try {
    var group = await Group.findById(id);
    if (!group)
      return res.status(400).send({
        msg: `El grupo con id ${id} no existe`,
        type: "group",
      });
  } catch (ex) {
    return res.status(400).send({
      msg: "id invalido",
      type: "group",
    });
  }

  if (!name) {
    return res.status(400).send({
      msg: "El grupo debe tener un nombre",
      type: "name",
    });
  }

  if (!professorId)
    return res.status(400).send({
      msg: "El grupo debe tener un profesor guía",
      type: "professor",
    });

  try {
    var professor = await Professor.findById(professorId);
    if (!professor)
      return res.status(400).send({
        msg: `El profesor con id ${professorId} no existe`,
        type: "professor",
      });
  } catch (ex) {
    return res.status(400).send({
      msg: `professorId invalido`,
      type: "professor",
    });
  }

  group["name"] = name;
  group["professorId"] = professorId;

  group = await group.save();

  res.status(200).json({ updatedGroup: group });
};

ctr.all = async (req, res) => {
  const groups = (await Group.find()).map((item) => {
    return {
      _id: item._id,
      name: item.name,
      professorId: item.professorId,
    };
  });

  return res.status(200).json({ groups });
};

ctr.deleteGroup = async (req, res) => {
  const id = req.params.id;

  try {
    var group = await Group.findOneAndDelete({ _id: id });
    if (!group)
      return res.status(400).send({
        msg: `El grupo con id ${id} no existe`,
        type: "group",
      });
  } catch (ex) {
    return res.status(400).send({
      msg: "id invalido",
      type: "group",
    });
  }

  res.status(200).json({ deleted: group });
};

module.exports = ctr;
