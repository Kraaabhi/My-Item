const dotenv=require("dotenv");
const app =require("./app");
const connectDatabase= require("./config/database")

//config
dotenv.config({path:"config/config.env"})
const PORT= process.env.PORT

connectDatabase();

const server=app.listen(PORT,()=>{
   console.log(`server is running on: http://localhost:${PORT}`); 
})