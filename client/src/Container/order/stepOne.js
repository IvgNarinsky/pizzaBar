import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import * as actionType from "../../Store/Action/actions";

export class stepOne extends Component {
  state = {
    selectedOption: "select pizza",
    price:0,
    finalPrice:0,
    size: "select size",
    selectTopping: "select toppings",
    selectedPizzaImg: "",
    topping: [],
    completedOrders: [],
  };
  componentDidMount = () => {
    if (this.props.order.saveOrder.length > 0) {
      var ordered = this.props.order.saveOrder;
      var size = ordered[ordered.length - 1].size;
      var selectedOption = ordered[ordered.length - 1].pizza;
      var topping = ordered[ordered.length - 1].toppings;
      var image = ordered[ordered.length - 1].image;
      ordered.pop();
      this.props.flag(0);
      this.setState(
        {
          size: size,
          selectedOption: selectedOption,
          topping: topping,
          completedOrders: ordered,
          selectedPizzaImg: image
        },
        () => { }
      );
    }
  };
  selectPizzaHandler = option => {
    var s = document.getElementById("selectP");
    s.innerHTML = "";
    var tempSelecter = [];
    var price
    this.setState({ selectedOption: option.value }, () => {
      this.props.order.options.forEach(op => {
        if (op.value === option.value) {
          price=op.price

          tempSelecter.push({
            image: op.image,
          });
        }
      });
      this.setState({ selectedPizzaImg: tempSelecter[0].image,price:price,finalPrice:price,selectTopping: "select toppings",    size: "select size",topping:[]   },()=>{});
    });
  };
  onSizeSelectedHandler = size => {
    var price=this.state.price
    if (this.state.selectedOption === "select pizza") {
      var s = document.getElementById("selectP");
      s.innerHTML = "Must select a pizza first!";
      s.style.color = "red";
      s.style.fontSize = "20px";
    } else {
      if(size.value==="Small")
      {
        price+=0
      }
      else if(size.value==="Meduim"){
        price+=2
      }
      else if(size.value==="Large"){
        price+=3
      }
      else{
        price+=4
      }
      this.setState({ size: size.value ,finalPrice:price}, () => {});
    }
  };
  cancleToppingHandler(t) {
    document.getElementById(t).style.display = "none";
    var totalPrice=this.state.finalPrice
    if(t!=="None")
    {
      totalPrice=totalPrice-2

    }
    var allToppings = this.state.topping.filter(m => {
      return m !== t;
    });
    this.setState({ topping: allToppings,finalPrice:totalPrice });
  }
  onToppingSelectedHandler = topping => {
    var totalPrice=this.state.finalPrice
    if (this.state.selectedOption === "select pizza") {
      var s = document.getElementById("selectP");
      s.innerHTML = "Must select a pizza first!";
      s.style.color = "red";
      s.style.fontSize = "20px";
    } else {
      this.setState({ selectTopping: topping.value }, () => {
        if (!this.state.topping.includes(topping.value)) {
          var allToppings = this.state.topping;
          allToppings.push(topping.value);
          if(topping.value!=="None")
          {
          totalPrice=totalPrice+2
          }
          this.setState({ topping: allToppings,finalPrice:totalPrice}, () => {});
        }
      });
    }
  };

  savingOrder = () => {
    var oldOrder = {
      pizza: this.state.selectedOption,
      size: this.state.size,
      toppings: this.state.topping,
      image: this.state.selectedPizzaImg,
      price:this.state.price,
      total:this.state.finalPrice
    };
    var keep = [];
    var orders = this.state.completedOrders;
    if (this.props.steps.flag === 1) {
      orders.forEach((o, index) => {
        if (index !== orders.length) {
          keep.push(o);
        } else {
          keep.push(oldOrder);
        }
      });
      this.setState({ completedOrders: keep }, () => {
        this.props.flag(0);
        this.props.save(this.state.completedOrders);
        this.props.step2();
      });
    } else {
      orders.push(oldOrder);
      this.setState({ completedOrders: orders }, () => {
        this.props.flag(0);
        this.props.save(this.state.completedOrders);
        this.props.step2();
      });
    }
  };
  anotherOrderHandler = () => {
    var oldOrder = {
      pizza: this.state.selectedOption,
      size: this.state.size,
      toppings: this.state.topping,
      price:this.state.price,
      total:this.state.finalPrice
    };
    var orders = this.state.completedOrders;
    if (this.state.flag !== 1) {
      orders.push(oldOrder);
    }
    this.setState(
      {
        completedOrders: orders,
        selectedOption: "select pizza",
        size: "select size",
        selectTopping: "select toppings",
        topping: [],
        selectedPizzaImg: "",
        price:0,
        flag: 0,
        finalPrice:0
      },
      () => {
        window.scrollTo(0, 0);
      }
    );
  };
  cancleCompletedOrder = index => {
    var completedOrders = this.state.completedOrders;
    completedOrders.splice(index, 1);
    this.setState({ completedOrders: completedOrders}, () => {});
  };
  onCompleted = index => {
    var completed = this.state.completedOrders[index];
    var completedOrders =this.state.completedOrders;
    var pizza = this.props.order.options.filter(
      img => img.value === completed.pizza
    );
    completedOrders.splice(index, 1);
    this.setState(
      {
        selectedOption: completed.pizza,
        selectedPizzaImg: pizza[0].image,
        topping: completed.toppings,
        size: completed.size,
        completedOrders: completedOrders,
        price:completed.price,
        finalPrice:completed.total
      },
      () => {
      }
    );
  };
  render() {
    const { selectedOption, size, selectTopping } = this.state;
    var pt = this.state.topping.map(t => {
      return (
        <div id={t} key={t}>
          <p>
            {t}
            <span
              className="cancle"
              onClick={() => {
                this.cancleToppingHandler(t);
              }}
            >
              x
            </span>
          </p>
        </div>
      );
    });

    var desc =
      this.state.selectedPizzaImg !== "" ? (
        <div className="chosed" id={this.state.selectedOption}>
          <img
            className="pizzaChosed"
            src={this.state.selectedPizzaImg}
            alt={this.state.selectedOption}
          />
          <h3>{this.state.selectedOption}</h3>
          <h5>price:{this.state.finalPrice}$</h5>
        </div>
      ) : null;
    var sz = (
      <p>
        {this.state.size !== "select size"
          ? "size:    " + this.state.size
          : null}
      </p>
    );
    var completed = this.state.completedOrders.map((complete, index) => {
      return (
        <p
          key={index}
          onClick={() => {
            this.onCompleted(index);
          }}
        >
          {index + 1}. {complete.pizza}{" "}
          <span
            className="cancle"
            onClick={() => {
              this.cancleCompletedOrder(index);
            }}
          >
            x
          </span>
        </p>
      );
    });
    return (
      <div className="row justify-content-md-center stepOne">
        <div className="col-12">
          <p id="selectP" className="center"></p>
        </div>
        <div className="col-lg-2 col-md-3 col-sm-12  orderOptionLoaction">
          <Select
            menuIsOpen
            placeholder={this.state.selectedOption}
            className="selectPizza "
            value={selectedOption}
            onChange={this.selectPizzaHandler}
            options={this.props.order.options}
          />
        </div>

        <div className="col-lg-2 col-md-3 col-sm-12 sizeLocation orderOptionLoaction">
          <Select
            menuIsOpen
            placeholder={this.state.size}
            className="selectPizza "
            value={size}
            onChange={this.onSizeSelectedHandler}
            options={this.props.order.sizes}
          />
        </div>
        <div className="col-lg-2 col-md-3 col-sm-12 toppingLocation orderOptionLoaction">
          <Select
            menuIsOpen
            placeholder={this.state.selectTopping}
            className="selectPizza "
            value={selectTopping}
            onChange={this.onToppingSelectedHandler}
            options={this.props.order.toppings}
          />
        </div>

        <div
          className="col-lg-3 col-md-12 col-sm-12 center allOrderLocation"
          id="OPizza"
        >
          <div id="PizzaDescription">{desc}</div>
          <div id="PizzaSize">{sz}</div>
          <div id="pt">{pt}</div>

          {this.state.selectedOption !== "select pizza" &&
          this.state.size !== "select size" &&
          this.state.topping.length > 0 ? (
            <div className="">
              <button
                className="move buttonStep"
                type="button"
                onClick={() => {
                  this.anotherOrderHandler();
                }}
              >
                Another Order
              </button>
              <button
                className="move  buttonStep"
                type="button "
                onClick={() => {
                  this.savingOrder();
                }}
              >
                Next
              </button>
            </div>
          ) : null}
        </div>
       
    
        {this.state.completedOrders.length > 0 ? (
          <div className="col-lg-2 col-md-12 col-sm-12 d-none d-sm-block" id="completedOrders">
            <h2 className="">orders</h2>
            {completed}
          </div>
     
        ) : null}
                  <div className=" costTopping"> <p style={{color:"blue"}}>
                    *Website members enjoying 10% discount*
                    <br></br>
                    <span style={{color:"red"}}>*every topping cost 2$*</span></p></div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    order: state.order,
    steps: state.steps
  };
};

const mapDispatchToProps = dispatch => {
  return {
    save: order => dispatch(actionType.saveOrder(order)),
    step2: () => dispatch(actionType.step2()),
    flag: n => dispatch(actionType.flag(n))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(stepOne);
