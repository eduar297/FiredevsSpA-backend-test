const ctr = {},
  Group = require("../models/group.model"),
  Professor = require("../models/professor.model");

ctr.create = async (req, res) => {
  const { name, professorId } = req.body,
    existingGroup = await Group.findOne({ name: name });

  if (!name) {
    return res.status(200).send({
      error: "El grupo debe tener un nombre",
    });
  }

  if (!professorId)
    return res.status(200).send({
      error: "El grupo debe tener un profesor guía",
    });

  try {
    await Professor.findById(professorId);
  } catch (ex) {
    return res.status(200).send({
      error: `El profesor con id ${professorId} no existe`,
    });
  }

  if (existingGroup)
    return res.status(200).send({
      error: "Ya existe un grupo con ese nombre",
      group: existingGroup,
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
  } catch (ex) {
    return res.status(200).send({
      error: `El grupo con id ${id} no existe`,
    });
  }

  res.status(200).send({
    group,
  });
};

module.exports = ctr;
