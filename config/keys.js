if(process.env.NODE_ENV==="production")
{
    //production
    module.exports=require("./prod");
}
else{
    //developers
    module.exports=require("./dev");
 
}