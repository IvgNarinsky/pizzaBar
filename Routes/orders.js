const mongoose = require("mongoose");
const ORDER = mongoose.model("ORDER");
var moment = require('moment');

module.exports = app => {
  //add order
  app.post("/api/orders/add-order", (req, res) => {
    var d = new Date();
    var totalPrice=0
    req.body.order.forEach(order=>{
    
        totalPrice+=Number(order.total.toFixed(2))
    })
    if(req.body.isUser)
    {
      totalPrice=totalPrice-(totalPrice*0.10)

    }
    totalPrice=totalPrice+(totalPrice*0.05)
    var newOrder = {
      order: req.body.order,
      location: req.body.location,
      payment: req.body.payment,
      time: d.getHours() + ":" + d.getMinutes(),
      date: d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear(),
      totalPrice:Number(totalPrice.toFixed(2))
       
    };
    let order = new ORDER(newOrder);
    order
      .save()
      .then(order => {
        res.status(200).send("success");
      })
      .catch(err => {
        res.status(400).send("falied");
      });
  });

  //add orders
  app.post("/api/orders/add-orders", (req, res) => {
    var d = new Date();

    req.body.forEach(order => {
      var newOrder = {
        order: req.body.order,
        location: req.body.location,
        payment: req.body.payment,
        time: moment().format('LTS'),
        date: d.getDay() + "/" + d.getMonth() + "/" + d.getFullYear(),
        totalPrice:
          req.body.order[0].total
      };
      var newOrder = new ORDER(newOrder);
      newOrder
        .save()
        .then(() => {})
        .catch(err => {
          res.status(400).send(order);
        });
    });
    res.status(200).send("orders added!");
  });

  //get order
  app.get("/api/orders/get-order", (req, res) => {
    ORDER.findById(req.body.order_id)
      .then(order => {
        res.status(200).send(order);
      })
      .catch(err => {
        res.status(400).send("couldnt find the order");
      });
  });
  //get all orders
  app.get("/api/orders/get-orders", (req, res) => {
    ORDER.find()
      .then(order => {
        res.status(200).send(order);
      })
      .catch(err => {
        res.status(400).send("couldnt find the order");
      });
  });

  //get by city
  app.get("/api/orders/get-order-by-city", (req, res) => {
    ORDER.find({ "adress.city": req.body.city })
      .then(orders => {
        res.status(200).send(orders);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });

  //update order
  app.put("/api/orders/update-order", (req, res) => {
    ORDER.findByIdAndUpdate(req.headers.id, req.body)
      .then(res => {
        res.status(200).send(res);
      })
      .catch(err => {
        res.send(err);
      });
  });
  //cancel order
  app.delete("/api/orders/cancel-order", (req, res) => {
    ORDER.findByIdAndDelete(req.headers.id)
      .then(res => {
        res.status(200).send(res);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });
  

  
};
