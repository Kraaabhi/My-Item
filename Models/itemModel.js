const mongoose=require("mongoose")
const itemSchema= new mongoose.Schema({
    name:{
        type: String,
        required:[true,"please enter Product Name"],
        trim:true
    },
    description:{
        type: String,
        required:[true,"please enter Product Description"]
    },
    price:{
        type:Number,
        required:[true,"please enter Product Price"],
        maxLength:[8,"price length can not exceed 8 character"]
   },
})

module.exports=mongoose.model("Product",itemSchema);