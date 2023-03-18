const Item = require("../models/ItemModel");
const ErrorHandler = require("../utils/errorhandler");
const mongoose = require("mongoose");

// Create Item
exports.createItem = async (itemData) => {
  try {
    const item = await Item.create(itemData);
    return item;
  } catch (error) {
    throw new ErrorHandler(error.message, 500);
  }
};

// Get all items
exports.getAllItems = async () => {
  try {
    const itemCount = await Item.countDocuments();
    const items = await Item.find();
    return { itemCount, items };
  } catch (error) {
    throw new ErrorHandler(error.message, 500);
  }
};

// Update Item
exports.updateItem = async (id, itemData) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ErrorHandler("Item not found", 404);
    }

    let item = await Item.findById(id);
    if (!item) {
      throw new ErrorHandler("Item not found", 404);
    }

    item = await Item.findByIdAndUpdate(id, itemData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    return item;
  } catch (error) {
    throw new ErrorHandler(error.message, 500);
  }
};

// Delete Item
exports.deleteItem = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ErrorHandler("Item not found", 404);
    }

    let item = await Item.findById(id);
    if (!item) {
      throw new ErrorHandler("Item not found", 404);
    }

    await Item.deleteOne({ _id: id });
  } catch (error) {
    throw new ErrorHandler(error.message, 500);
  }
};
