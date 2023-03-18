const itemService = require('../services/itemService');

//create Item  -- admin
exports.createItem = async (req, res, next) => {
  try {
    const item = await itemService.createItem(req.body);
    res.status(201).json({
      success: true,
      item: item,
    });
  } catch (error) {
    next(error);
  }
};

//get all Item
exports.getAllItem = async (req, res, next) => {
  try {
    const { itemCount, items } = await itemService.getAllItems();
    res.status(200).json({
      success: true,
      itemCount,
      items,
    });
  } catch (error) {
    next(error);
  }
};

// update Item
exports.updateItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedItem = await itemService.updateItem(id, req.body);
    res.status(201).json({
      success: true,
      item: updatedItem,
    });
  } catch (error) {
    next(error);
  }
};

//  delete Item;

exports.deleteItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    await itemService.deleteItem(id);
    res.status(201).json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};