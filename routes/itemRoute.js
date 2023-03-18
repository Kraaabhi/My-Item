const express = require("express");
const { getAllItem, createItem, updateItem, deleteItem } = require("../controllers/itemController");
const router = express.Router();

router.route("/items").get(getAllItem);
router
  .route("/item/new")
  .post( createItem);
router
  .route("/item/:id")
  .put( updateItem);
router
  .route("/item/:id")
  .delete( deleteItem);

module.exports = router;
