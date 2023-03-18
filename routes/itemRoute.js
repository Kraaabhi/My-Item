const express = require("express");
const { getAllItem, createItem, updateItem, deleteItem } = require("../controllers/itemController");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the Item
 *         name:
 *           type: string
 *           description: name of item
 *         price:
 *           type: string
 *           description: Item price
 *         description:
 *           type: string
 *           description: Item descriptions
 *       example:
 *         id: d5fE_asz
 *         name: Item1
 *         description: this is item1
 *
 */

 /**
  * @swagger
  * tags:
  *   name: Items
  *   description: The Item managing API
  */


 /**
 * @swagger
 * /api/v1/items:
 *   get:
 *     summary: Returns the list of all the itmes
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: The list of the Items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 */
router.route("/items").get(getAllItem);


/**
 * @swagger
 * /api/v1/item/new:
 *   post:
 *     summary: Create a new Item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: The Item was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       500:
 *         description: Some server error
 */
router
  .route("/item/new")
  .post( createItem);


  /**
 * @swagger
 * /api/v1/item/{id}:
 *  put:
 *    summary: Update the Item by the id
 *    tags: [Items]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The Item id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Item'
 *    responses:
 *      200:
 *        description: The Item was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Item'
 *      404:
 *        description: The Item was not found
 *      500:
 *        description: Some error happened
 */
router
  .route("/item/:id")
  .put( updateItem);


  /**
 * @swagger
 * /api/v1/item/{id}:
 *   delete:
 *     summary: Remove the Item by id
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The Item id
 * 
 *     responses:
 *       200:
 *         description: The Item was deleted
 *       404:
 *         description: The Item was not found
 */
router
  .route("/item/:id")
  .delete( deleteItem);

module.exports = router;
