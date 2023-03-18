const mongoose = require("mongoose");
const Item = require("../models/ItemModel");
const itemService = require("../services/itemService");

// create mock data
const testItem = {
  name: "Test Item",
  description: "This is a test item",
  price: 9.99,
  quantity: 10,
};

// connect to test database before running tests
beforeAll(async () => {
  const uri =
    "mongodb+srv://abhishekkumar01official:5H6AeJyTcJXoRKl7@cluster0.vmvpdoh.mongodb.net/?retryWrites=true&w=majority";
  mongoose.set("strictQuery", false);
  await mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((data) => {
      console.log(`mongodb connnected with server: ${data.connection.host}`);
    });
}, 20000);

// clear all test data after running tests
afterAll(async () => {
  await Item.deleteMany({});
  await mongoose.connection.close();
});

describe("Item Controller Tests", () => {
  // createItem function test
  describe("createItem function", () => {
    it("should create a new item", async () => {
      const item = await itemService.createItem(testItem);

      const createdItem = await Item.findById(item._id);
      expect(createdItem.name).toBe(testItem.name);
    });
  });

  // getAllItem function test
  describe("getAllItem function", () => {
    it("should return all items", async () => {
      await Item.create(testItem);
      const { itemCount, items } = await itemService.getAllItems();
      expect(itemCount).toBe(2);
      expect(items[0].name).toBe(testItem.name);
    });
  });

  // updateItem function test
  describe("updateItem function", () => {
    it("should update an existing item", async () => {
      const createdItem = await Item.create(testItem);

      const updatedItem = {
        name: "Updated Item",
        description: "This is an updated item",
        price: 19.99,
        quantity: 5,
      };
      const res = await itemService.updateItem(createdItem._id, updatedItem);
      const item = await Item.findById(createdItem._id);
      expect(item.name).toBe(updatedItem.name);
      expect(item.price).toBe(updatedItem.price);
    });
  });

  // deleteItem function test
  describe("deleteItem function", () => {
    it("should delete an existing item", async () => {
      const createdItem = await Item.create(testItem);
      await itemService.deleteItem(createdItem._id);
      const item = await Item.findById(createdItem._id);
      expect(item).toBeNull();
    });
  });
});
