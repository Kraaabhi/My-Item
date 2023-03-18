const express =require("express")
const app= express();

app.use(express.json());

// //route imports
const item=require("./routes/itemRoute.js");
app.use("/api/v1",item);

module.exports =app;
