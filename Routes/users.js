const mongoose = require("mongoose");
const USER = mongoose.model("USER");
const auth = require("../MiddleWare/auth");
module.exports = app => {
  //add user
  app.post("/api/users/add-user", (req, res) => {
    var d = new Date();

    var newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      time: d.getHours() + ":" + d.getMinutes(),
      date: d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear()
    };
    let user = new USER(newUser);

    USER.findOne({ email: req.body.email }).then(result => {
      if (result === null) {
        user
          .save()
          .then(user => {
            return user.generateToken();
          }).then(token=>{
            res.status(200).send({user,token:token});
          })
          .catch(err => {
            res.status(400).send(err);
          });
      } else {

        res.status(200).send("user already exist");
      }
    });
  });

  app.post("/api/users/logout",(req,res)=>{
      let headerToken=req.header("token")
      USER.findOne({email:req.body.email}).then(user=>{
          let arrayToken=user.tokens.filter(token=>{
              return token.token!==headerToken
          })
          user.tokens=arrayToken

          user.save().then(user=>{
              res.status(200).send("logout")
          })
      }).catch(err=>{
          res.status(400).send("failed to logout")
      })
  })

  app.post("/api/users/login-with-cred",async(req,res)=>{
      try{
          let user=await USER.userWithCord(req.body.email,req.body.password)
          const token=await user.generateToken()
          res.status(200).send({email:user.email,token})
      }catch(e){
          res.status(400).send(e)
      }
  })


  app.post("/api/users/LoginWithToken", auth,(req, res) => {
   USER.findOne({email:req.body.email}).then(user=>{
       res.status(200).send({email:user.email})
   }).catch(err=>{
       res.status(400).send(err)
   })
  });
};
