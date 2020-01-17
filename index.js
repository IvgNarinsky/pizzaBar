const express=require("express")
const app=express()
const bodyParser=require("body-parser")
const mongoose=require('mongoose')
const keys=require("./config/keys")
const path=require("path")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
mongoose.Promise=global.Promise
mongoose.connect("mongodb+srv://ivgeni:burger1234@cluster0-djgnk.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true,useFindAndModify:false},(err,db)=>{
    if(err)
    {
        console.log("connection db failed",err)
    }
    else{
    console.log("connect to db")
    } 
})

const PORT=process.env.PORT||5000;


require('./Models/order')
require('./Models/user')
require('./Routes/orders')(app)
require('./Routes/users')(app)

if(process.env.NODE_ENV==='production')
{
    app.use(express.static('client/build'))
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"client","build","index.html"))
    })
}
app.listen(PORT,()=>{
    console.log("listening on 5000 port")
})