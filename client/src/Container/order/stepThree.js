import React, { Component } from "react";
import { connect } from "react-redux";
import "./payment.css";
import * as actionType from "../../Store/Action/actions";
import {requestData} from '../../Manger/manger'
import {ADD_ORDER} from '../../Url/url'

export class stepThree extends Component {
  state = {
    today: "0-0-0",
    fullName: "",
    creditCard: "",
    cvc: "",
    expired: ""
  };
  componentDidMount = () => {
    var d = new Date();
    d = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    var payment=this.props.order.savePayment
    if(payment!==null)
    {
    this.setState({ today: d ,fullName:payment.fullName,cvc:payment.cvc,expired:payment.expired,creditCard:payment.expired});
    }
    else{
      this.setState({ today: d});   
    }
  };
  onChangeHandler = e => {
    document.getElementById("errorOrder").innerHTML = "";
    if (e.target.id === "fullName") {
      document.getElementById("fullNameError").innerHTML = "";
    } else if (e.target.id === "creditCard") {
      document.getElementById("creditCardError").innerHTML = "";
    } else if (e.target.id === "expired") {
      document.getElementById("expiredError").innerHTML = "";
    } else if (e.target.id === "cvc") {
      document.getElementById("cvcCardError").innerHTML = "";
    }
  
    if (
      (e.target.id === "cvc" && e.target.value.length <= 4) ||
      (e.target.id === "creditCard" && e.target.value.length <= 19) ||
       e.target.id==="expired"||
      e.target.id === "fullName"
    ) {
      this.setState({ [e.target.id]: e.target.value }, () => {
    });
    }
  };
  stepBackHandler = () => {
    this.props.savePayment(this.state)
    this.props.step2();
  };

  stepForwardHandler=()=>{

  
    if(this.validation())
    {
    this.props.savePayment(this.state).then(()=>{
      let newData={
        order:   this.props.order.saveOrder,
        location:this.props.order.saveLocation,
        payment:this.props.order.savePayment,
        isUser:this.props.auth.login
      }
      let data={
        url:ADD_ORDER,
        method:'post',
        data:newData
        
      }
      requestData(data).then(res=>{
        if(res.data==="success")
        {
        this.props.step4()
        }
        else{
          document.getElementById("errorOrder").style.color = "red"
          document.getElementById("errorOrder").innerHTML = "failed proccess order";
        }
      })
    })
  }
  }
  validation(){
    var pattern=/^[a-zA-Z\s\u0590-\u05fe]+$/i
    var today=this.state.today.split('-')
    var expired=this.state.expired
    expired=expired.split('-')
    var invalidDate=document.getElementById("expiredError")
     if(this.state.fullName===""||!this.state.fullName.match(pattern))
     {
      document.getElementById("fullNameError").style.color = "red";
      document.getElementById("fullNameError").innerHTML =
        "invalid full name , must contain just letters!";
      return false;
     }
     if(this.state.creditCard===""||this.state.creditCard.length<14)
    {
      document.getElementById("creditCardError").style.color = "red";
      document.getElementById("creditCardError").innerHTML =
        "invalid credit card , must contain atleast 14 digits";
      return false;
    }
    if(expired!==""&&expired[0].length<5)
    {
      if(Number(today[0])>Number(expired[0])||(Number(today[0])<=Number(expired[0])&&Number(today[1])>Number(expired[1]))||
      (Number(today[0])===Number(expired[0])&&Number(today[1])===Number(expired[1])&&Number(today[2])>Number(expired[2])))
      {  
        invalidDate.style.color = "red"
        invalidDate.innerHTML =
        "invalid date";
        return false
      }
     

    }
    else{
      invalidDate.style.color = "red"
      invalidDate.innerHTML =
      "invalid date";
      return false
    }
    if(this.state.cvc.length<4)
    {
      document.getElementById('cvcCardError').style.color = "red"
      document.getElementById('cvcCardError').innerHTML =
      "invalid cvc";
      return false
    }
    return true
  }
  render() {
    return (
      <div className="row payment">
        <div className="locationForm centered">
          <img
            src="https://cdn.dribbble.com/users/2675044/screenshots/6857834/pizza.png"
            className="lImg"
            alt=""
          />
          <div className="centered">
            <input
              className="bgInpThree"
              type="text"
              placeholder="Card owner"
              id="fullName"
              value={this.state.fullName}
              onChange={event => {
                this.onChangeHandler(event);
              }}
              required
            ></input>
            <span id="fullNameError"></span>
            <br></br>
            <input
              type="number"
              className="bgInpThree"
              id="creditCard"
              placeholder="Credit card No."
              value={this.state.creditCard}
              title="credit card number"
              onChange={event => {
                this.onChangeHandler(event);
              }}
              required
            ></input>
            <span id="creditCardError"></span>
            <br></br>
            <input
              type="date"
              className="bgInpThree"
              id="expired"
              placeholder="expired"
              value={this.state.expired}
              title="experition date"
              onChange={event => {
                this.onChangeHandler(event);
              }}
              onKeyDown={event => {
                this.onChangeHandler(event);
              }}
              required
            ></input>
            <span id="expiredError"></span>
            <br></br>
            <input
              type="number"
              className="bgInpThree"
              id="cvc"
              placeholder="cvc"
              value={this.state.cvc}
              title="cvc"
              onChange={event => {
                this.onChangeHandler(event);
              }}
              required
            ></input>
            <span id="cvcCardError"></span>
            <br></br>
            <div className="centered buttonMrg">
              <button
                className="buttonStep"
                type="button"
                onClick={() => {
                  this.stepBackHandler();
                }}
              >
                Back
              </button>
              <button
                className="buttonStep"
                type="button"
                onClick={() => {
                  this.stepForwardHandler();
                }}
              >
                Next
              </button>
            </div>
            <p id="errorOrder"></p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  order: state.order,
  auth:state.auth
});

const mapDispatchToProps = dispatch => {
  return {
    step2: () => dispatch(actionType.step2()),
    step4:()=>dispatch(actionType.step4()),
    savePayment:(payment)=>dispatch(actionType.savePayment(payment))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(stepThree);
