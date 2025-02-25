const mongoose = require("../db.js");

const menuItemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
menuItemsSchema.set("toJSON", {
  virtuals: true
});
// menu model
const MenuItems = mongoose.model("MenuItems", menuItemsSchema);

const getAll = async () => {
  try {
    const menuItems = await MenuItems.find();
    return menuItems;
  } catch (error) {
    return error;
  }
};

const getOne = async (id) => {
  try {
    const menuItem = await MenuItems.findById(id);
    return menuItem;
  } catch (error) {
    return error;
  }
};

const create = async (body) => {
  try {
    const menuItem = await MenuItems.create(body);
    return menuItem;
  } catch (error) {
    return error;
  }
};

const update = async (id, updatedFields) => {
  try {
    const updatedMenuItem = await MenuItems.findOneAndUpdate(
      { _id: id },
      { $set: updatedFields },
      { new: true }
    );

    return updatedMenuItem;
  } catch (error) {
    return undefined;
  }
};

const deleteOne = async (id) => {
  try {
    const deleteMenuItem = await MenuItems.findByIdAndDelete(id);

    return deleteMenuItem;
  } catch (error) {
    return undefined;
  }
};

const search = async (regex) => {
  try {
    const matchingMenuItems = await MenuItems.find({
      $or: [{ name: regex }, { description: regex }]
    });

    return matchingMenuItems;
  } catch (error) {
    return undefined;
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
  search,
  MenuItems
};
