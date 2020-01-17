import React, { Component } from "react";
import { connect } from "react-redux";
import "./dashboard.css";
import { Link } from "react-router-dom";
import * as actionType from "../../Store/Action/actions";

class dashboard extends Component {
  componentDidMount=()=>{
   
  }
  handleItemClick=()=>{
    this.props.resetOrder()
    this.props.step1()

  }
  render() {
    return (
      <div className="dashboard">
        <div className="intro-wrapper">
          <div className="text">
            <h2 className="welcome">Welcome</h2>

            <h1 className="intro">
              We got some delishes <br /> pizzas for you
            </h1>
            <h3  className="subintro">
              PizzaRex a small pizza place that delivers
              <br></br> the tastiest pizzas in the area
            </h3>
            <Link to='/order' className="button1"  onClick={() => {
              this.handleItemClick();
            }}>
              Order
            </Link>
            <Link to='/menu' className="button1">
              Menu
            </Link>
          </div>
          <img
            className="introPizza"
            src="http://pngimg.com/uploads/pizza/pizza_PNG44090.png"
            alt=""
          />
          <img
            className="introPizza1"
            src="http://pngimg.com/uploads/pizza/pizza_PNG44029.png"
            alt=""
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth:state.auth
});

const mapDispatchToProps = dispatch => {
  return {
    step1: () => dispatch(actionType.step1()),
    resetOrder:()=>dispatch(actionType.resetOrder()),
    
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(dashboard);
