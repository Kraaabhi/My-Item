const express =require("express")
const app= express();
const cors = require("cors");
const errorMiddleware=require("./middleware/error")
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const port = process.env.PORT || 4000;

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API for my Item',
      contact: {
        name: 'abhishek Kumar',
        email: 'kraabhi2001@gmail.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./routes/itemRoutes.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Middleware
app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(express.json());
// //route imports
const item=require("./routes/itemRoute.js");
app.use("/api/v1",item);
app.use(errorMiddleware)

module.exports =app;
