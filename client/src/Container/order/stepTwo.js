import React, { Component } from "react";
import { connect } from "react-redux";
import "./locations.css";
import * as actionType from "../../Store/Action/actions";
class locations extends Component {
  state = {
    fullName: "",
    city: "",
    address: "",
    aptNum: "Apartment Number",
    tel:"mobile number"
  }
  componentDidMount = () => {
    window.scrollTo(0, 0);
    var location = this.props.order.saveLocation;
    if (location !== null) {
      this.setState({
        fullName: location.fullName,
        city: location.city,
        address: location.address,
        aptNum: location.aptNum,
        tel:location.tel
      });
    }
  };
  onChangeHandler = e => {
    if (e.target.id === "fullName") {
      document.getElementById("fullNameError").innerHTML = "";
    } else if (e.target.id === "city") {
      document.getElementById("cityError").innerHTML = "";
    } else if (e.target.id === "address") {
      document.getElementById("addressError").innerHTML = "";
    }
    else if(e.target.id==="tel"){
      document.getElementById("telError").innerHTML = "";
    } else {
      document.getElementById("AptNoError").innerHTML = "";
    }
    this.setState({ [e.target.id]: e.target.value }, () => {});
  };
  stepBackHandler = () => {
    this.props.flag(1);
    this.props.step1();

  };
  stepForwardHandler = () => {
    if (this.validation()) {
      var location = this.state;
      this.props.saveLocation(location);
      this.props.step3();
    }
  };
  validation = () => {
    var fullName = this.state.fullName;
    var city = this.state.city;
    var address = this.state.address;
    var tel=this.state.tel
    var aptNum = this.state.aptNum;
    var pattern=/^[a-zA-Z\s\u0590-\u05fe]+$/i
    if (fullName === "" || !fullName.match(pattern)) {
      document.getElementById("fullNameError").style.color = "red";
      document.getElementById("fullNameError").innerHTML =
        "invalid full name , must contain just letters!";
      return false;
    }
    if (city === "" || !city.match(pattern)) {
      document.getElementById("cityError").style.color = "red";
      document.getElementById("cityError").innerHTML =
        "invalid full city , must contain just letters!";
      return false;
    }
    if (address === "") {
      document.getElementById("addressError").style.color = "red";
      document.getElementById("addressError").innerHTML = "invalid address";
      return false;
    }
    if (tel==="mobile number"||tel.length<10) {
      document.getElementById("telError").style.color = "red";
      document.getElementById("telError").innerHTML = "invalid phone number, must be atleast 10 digits";
      return false;
    }
    if (aptNum==="Apartment Number"||aptNum <= 0) {
      document.getElementById("AptNoError").style.color = "red";
      document.getElementById("AptNoError").innerHTML =
        "invalid appartment ,apartment number must be higher then 0!";
      return false;
    }
    return true;
  };
  render() {
    return (
      <div className="locationForm centered">
        <img
          src="https://previews.123rf.com/images/vectorv/vectorv1905/vectorv190504004/123441295-blue-map-pointer-with-fast-food-slice-pizza-icon-isolated-on-white-background-pizzeria-location-icon.jpg"
          className="lImg"
          alt=""
        />
        <div className="centered">
          <input
            className="bgInp"
            type="text"
            placeholder="Full Name"
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
            type="text"
            className="bgInp"
            id="city"
            placeholder="City"
            value={this.state.city}
            onChange={event => {
              this.onChangeHandler(event);
            }}
            required
          ></input>
          <span id="cityError"></span>
          <br></br>
          <input
            type="text"
            className="bgInp"
            id="address"
            placeholder="Adress"
            value={this.state.address}
            onChange={event => {
              this.onChangeHandler(event);
            }}
            required
          ></input>
          <span id="addressError"></span>
          <br></br>
          <input
            type="number"
            className="bgInp"
            id="aptNum"
            placeholder="Apartment Number"
            value={this.state.aptNum}
            onChange={event => {
              this.onChangeHandler(event);
            }}
            required
          ></input>
          <span id="AptNoError"></span>
          <br></br>
          <input
            type="number"
            className="bgInp"
            id="tel"
            placeholder="mobile number"
            value={this.state.tel}
            onChange={event => {
              this.onChangeHandler(event);
            }}
            required
          ></input>
          <span id="telError"></span>
          <br></br>
          <div className="centered buttonMrg">
            <span>
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
            </span>
          </div>
        </div>
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
    step1: () => dispatch(actionType.step1()),
    step3: () => dispatch(actionType.step3()),
    flag: n => dispatch(actionType.flag(n)),
    saveLocation: location => dispatch(actionType.saveLocation(location))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(locations);
