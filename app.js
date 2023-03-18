const express =require("express")
const app= express();
const cors = require("cors");
const errorMiddleware=require("./middleware/error")
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Library API",
			version: "1.0.0",
			description: "A simple Express Library API",
		},
		servers: [
			{
				url: "http://localhost:4000",
			},
		],
	},
	apis: ["./routes/*.js"],
};
const specs = swaggerJsDoc(options);
app.use(cors());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use(express.json());
// //route imports
const item=require("./routes/itemRoute.js");
app.use("/api/v1",item);
app.use(errorMiddleware)

module.exports =app;
