const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const Item = require('../models/ItemModel');

// create mock data
const testItem = {
  name: 'Test Item',
  description: 'This is a test item',
  price: 9.99,
  quantity: 10,
};

// connect to test database before running tests
beforeAll(async () => {
  const uri = "mongodb+srv://abhishekkumar01official:5H6AeJyTcJXoRKl7@cluster0.vmvpdoh.mongodb.net/?retryWrites=true&w=majority";
  mongoose.set('strictQuery', false);
   await mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true}).then((data)=>{
        console.log(`mongodb connnected with server: ${data.connection.host}`)
    })
},20000);

// clear all test data after running tests
afterAll(async () => {
  await Item.deleteMany({});
  await mongoose.connection.close();
});

describe('Item Controller Tests', () => {
  // createItem function test
  describe('createItem function', () => {
    it('should create a new item', async () => {
      const res = await request(app)
        .post('/api/v1/item/new')
        .send(testItem)
        .expect(201);

      const createdItem = await Item.findById(res.body.item._id);
      expect(createdItem.name).toBe(testItem.name);
    });
  });

  // getAllItem function test
  describe('getAllItem function', () => {
    it('should return all items', async () => {
      await Item.create(testItem);

      const res = await request(app).get('/api/v1/items').expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.itemCount).toBe(2);
      expect(res.body.item[0].name).toBe(testItem.name);
    });
  });

  // updateItem function test
  describe('updateItem function', () => {
    it('should update an existing item', async () => {
      const createdItem = await Item.create(testItem);

      const updatedItem = {
        name: 'Updated Item',
        description: 'This is an updated item',
        price: 19.99,
        quantity: 5,
      };

      const res = await request(app)
        .put(`/api/v1/item/${createdItem._id}`)
        .send(updatedItem)
        .expect(201);

      expect(res.body.success).toBe(true);

      const item = await Item.findById(createdItem._id);
      expect(item.name).toBe(updatedItem.name);
      expect(item.price).toBe(updatedItem.price);
    });
  });

  // deleteItem function test
  describe('deleteItem function', () => {
    it('should delete an existing item', async () => {
      const createdItem = await Item.create(testItem);

      await request(app).delete(`/api/v1/item/${createdItem._id}`).expect(201);

      const item = await Item.findById(createdItem._id);
      expect(item).toBeNull();
    });
  });
});
