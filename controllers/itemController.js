// const Item = require("../models/ItemModel");
// const ErrorHandler = require("../utils/errorhandler");
// const mongoose = require("mongoose");
// const catchAsyncError = require("../middleware/catchAsyncError");

// //create Item  -- admin
// exports.createItem = catchAsyncError(async (req, res, next) => {
//   const item = await Item.create(req.body);
//   res.status(201).json({
//     success: true,
//     item: item,
//   });
// });

// //get all Item
// exports.getAllItem = catchAsyncError(async (req, res, next) => {
//   const itemCount = await Item.countDocuments();
//   const item= await Item.find();
//   res.status(200).json({
//     success: true,
//     itemCount,
//     item: item,
//   });
// });

// // update Item
// exports.updateItem = catchAsyncError(async (req, res, next) => {
//   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     return next(new ErrorHandler("Item not found", 404));
//   }
//   let item = await Item.findById(req.params.id);
//   if (!item) {
//     const err = new ErrorHandler("Item not found", 404);
//     return next(err);
//   }

//   item = await Item.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//     useFindAndModify: false,
//   });
//   res.status(201).json({
//     success: true,
//     item: item,
//   });
// });

// //  delete Item;

// exports.deleteItem = catchAsyncError(async (req, res, next) => {
//   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     return next(new ErrorHandler("Item not found", 404));
//   }
//   let item = await Item.findById(req.params.id);
//   if (!item) {
//     const err = new ErrorHandler("Item not found", 404);
//     return next(err);
//   }
//   await Item.deleteOne({ _id: req.params.id });
//   res.status(201).json({
//     success: true,
//     message: "Item deleted successfully",
//   });
// });



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