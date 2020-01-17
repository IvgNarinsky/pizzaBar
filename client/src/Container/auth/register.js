import React, { Component } from "react";
import "./auth.css";
import { Link } from "react-router-dom";
import { requestData } from "../../Manger/manger";
import { ADD_USER } from "../../Url/url";
import { withRouter } from "react-router-dom";

class register extends Component {
  state = {
    user: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    },
    errors: {
      firstName: false,
      lastName: false,
      email: false,
      password: false
    }
  };
  handleChange = e => {
    var temp_user = { ...this.state.user };
    temp_user[e.target.id] = e.target.value;
    document.getElementById("userExist").innerHTML = "";
    this.setState(
      {
        user: temp_user
      },
      () => {}
    );
  };

  onSubmitHandler = event => {
    event.preventDefault();
    if (this.validation()) {
      let newData = {
        firstName: this.state.user.firstName,
        lastName: this.state.user.lastName,
        email: this.state.user.email,
        password: this.state.user.password
      };
      let data = {
        url: ADD_USER,
        method: "post",
        data: newData
      };

      requestData(data).then(res => {
        if (res.data !== "user already exist") {
          var user = {
            tk: res.data.token,
            email: res.data.user.email
          };
          window.localStorage.setItem("pizzaBar", JSON.stringify(user));
          this.props.history.push("/login");
        } else {
          document.getElementById("userExist").style.color = "red";
          document.getElementById("userExist").innerHTML = "user already exist";
        }
      });
    }
  };

  validation = () => {
    var validFistName = /^[a-z\u0590-\u05fe]+$/.test(this.state.user.firstName);
    var validLastName = /^[a-z\u0590-\u05fe]+$/.test(this.state.user.lastName);
    var erorUpdate = this.state.errors;

    if (!validFistName) {
      erorUpdate.firstName = true;
      this.setState({ errors: erorUpdate }, () => {});
      return false;
    }
    if (!validLastName) {
      erorUpdate.lastName = true;
      this.setState({ errors: erorUpdate }, () => {});
      return false;
    }
    if (this.state.user.password.length < 5) {
      erorUpdate.password = true;
      this.setState({ errors: erorUpdate }, () => {});
      return false;
    }
    if (
      !this.state.user.email.includes("@") ||
      !this.state.user.email.includes(".com")
    ) {
      erorUpdate.email = true;
      this.setState({ errors: erorUpdate }, () => {});
      return false;
    }

    return true;
  };
  clearErrorHandler = () => {
    var clearedErrors = {
      firstName: false,
      lastName: false,
      email: false,
      password: false
    };
    this.setState({ errors: clearedErrors });
  };
  render() {
    return (
      <div className="authWall">
        <div className="row">
          <div className="col-12 auth-box centered">
            <form className="centered">
              <h1 className="auth-title">Register</h1>
              <br></br>
              <div className="group">
                <input
                  type="text"
                  id="firstName"
                  onChange={e => {
                    this.handleChange(e);
                  }}
                  onKeyDown={this.clearErrorHandler}
                  required
                />
                {this.state.errors.firstName ? (
                  <span className="error-color">Invalid first name</span>
                ) : null}
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>First Name</label>
              </div>
              <div className="group">
                <input
                  type="text"
                  id="lastName"
                  onChange={e => {
                    this.handleChange(e);
                  }}
                  onKeyDown={this.clearErrorHandler}
                  required
                />
                {this.state.errors.lastName ? (
                  <span className="error-color">Invalid last name</span>
                ) : null}
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Last Name</label>
              </div>

              <div className="group">
                <input
                  type="text"
                  id="email"
                  onChange={e => {
                    this.handleChange(e);
                  }}
                  onKeyDown={this.clearErrorHandler}
                  required
                />
                {this.state.errors.email ? (
                  <span className="error-color">Invalid email</span>
                ) : null}
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Email</label>
              </div>
              <div className="group">
                <input
                  type="password"
                  autoComplete="123456"
                  id="password"
                  onChange={e => {
                    this.handleChange(e);
                  }}
                  onKeyDown={this.clearErrorHandler}
                  required
                />
                {this.state.errors.password ? (
                  <span className="error-color">
                    Invalid password,too short
                  </span>
                ) : null}
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Password</label>
              </div>
              <div>
                <span id="userExist"></span>
              </div>
              <Link to="/login">
                {" "}
                <button type="button" className="buttonEffect back-button">
                  back
                </button>
              </Link>
              <button
                type="submit"
                className="buttonEffect"
                onClick={e => {
                  this.onSubmitHandler(e);
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(register);
