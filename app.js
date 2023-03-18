const express =require("express")
const app= express();

app.use(express.json());
const errorMiddleware=require("./middleware/error")
// //route imports
const item=require("./routes/itemRoute.js");
app.use("/api/v1",item);
app.use(errorMiddleware)

module.exports =app;
