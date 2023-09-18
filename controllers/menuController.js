const MenuItems = require("../db/models/menuItems.js");

const getAll = async (req, res) => {
  try {
    const menu = await MenuItems.getAll();
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOne = async (req, res) => {
  try {
    const menu = await MenuItems.getOne(req.params.id);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    const menu = await MenuItems.create(req.body);
    res.send(menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const updatedFields = req.body;
    const fieldsToUpdate = {};

    fieldsToUpdate.updatedAt = new Date();

    if (updatedFields.name) {
      fieldsToUpdate.name = updatedFields.name;
    }

    const priceAsFloat = parseFloat(updatedFields.price);
    if (
      updatedFields.price &&
      !Number.isNaN(priceAsFloat) &&
      typeof priceAsFloat === "number"
    ) {
      fieldsToUpdate.price = priceAsFloat;
    }

    if (updatedFields.description) {
      fieldsToUpdate.description = updatedFields.description;
    }

    const updatedMenu = await MenuItems.update(req.params.id, fieldsToUpdate);

    if (!updatedMenu) {
      return res.status(500).send({});
    }

    return res.send(updatedMenu);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const deleteOne = async (req, res) => {
  try {
    const deletedItem = await MenuItems.deleteOne(req.params.id);

    if (!deletedItem) {
      return res.status(500).send({});
    }

    return res.send(req.params.id);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const search = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(500).send({});
    }

    const regex = new RegExp(query, "i");
    const matchingItems = await MenuItems.search(regex);

    return res.send(matchingItems);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = { getAll, getOne, create, update, deleteOne, search };
