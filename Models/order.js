const mongoose = require("mongoose")
const {Schema} =mongoose

const order=new Schema({
    order:Array,
    location:{type:Object,required:true},
    payment:{type:Object,required:true},
    time:String,
    date:String,
    totalPrice:{type:Number,required:true}
})




mongoose.model('ORDER',order)