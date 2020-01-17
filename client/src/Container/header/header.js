import React, { Component } from "react";
import { Menu, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./header.css";
import { connect } from "react-redux";
import * as actionType from "../../Store/Action/actions";
import { requestData } from "../../Manger/manger";
import { LOGIN_WITH_TOKEN, LOGOUT } from "../../Url/url";
class header extends Component {
  
  state = { activeItem: "home", isLoaded: true };
  componentDidMount = () => {
    var user = JSON.parse(window.localStorage.getItem("pizzaBar"));
    if (user) {
      let newData = {
        email: user.email
      }

      let data = {
        url: LOGIN_WITH_TOKEN,
        method: "post",
        data: newData,
        header: { token: user.tk }
      };

      requestData(data)
        .then(res => {
          if ("JsonWebTokenError" !== res.data.name) {
            this.props.login(res.data.email).then(()=>{
              this.setState({ isLoaded: true });
            })

          }

        })
        .catch(err => {
          this.setState({ isLoaded: true });
        });
    }
    else{
      this.setState({ isLoaded: true });

    }
  };
  handleItemClick = id => {
    if (id === "home") {
      document
        .getElementById("home")
        .setAttribute("style", "border-bottom:2px solid yellow");
        if(document.getElementById("login")!==null)
        {
      document.getElementById("login").setAttribute("style", "border-bottom:none");
        }
      document
        .getElementById("order")
        .setAttribute("style", "border-bottom:none");
      document
        .getElementById("menu")
        .setAttribute("style", "border-bottom:none");
      document
        .getElementById("about")
        .setAttribute("style", "border-bottom:none");
    } else if (id === "login") {
      if(document.getElementById("login")!==null)
      {
    document.getElementById("login").setAttribute("style", "border-bottom:none");
      }
      document
        .getElementById("home")
        .setAttribute("style", "border-bottom:none");
      document
        .getElementById("order")
        .setAttribute("style", "border-bottom:none");
      document
        .getElementById("menu")
        .setAttribute("style", "border-bottom:none");
      document
        .getElementById("about")
        .setAttribute("style", "border-bottom:none");
    } else if (id === "order") {
      this.props.step1();
      this.props.resetOrder();
      document
        .getElementById("order")
        .setAttribute("style", "border-bottom:2px solid yellow");
        if(document.getElementById("login")!==null)
        {
      document.getElementById("login").setAttribute("style", "border-bottom:none");
        }
      document
        .getElementById("home")
        .setAttribute("style", "border-bottom:none");
      document
        .getElementById("menu")
        .setAttribute("style", "border-bottom:none");
      document
        .getElementById("about")
        .setAttribute("style", "border-bottom:none");
    } else if (id === "menu") {
      document
        .getElementById("menu")
        .setAttribute("style", "border-bottom:2px solid yellow");
        if(document.getElementById("login")!==null)
        {
      document.getElementById("login").setAttribute("style", "border-bottom:none");
        }
      document
        .getElementById("home")
        .setAttribute("style", "border-bottom:none");
      document
        .getElementById("about")
        .setAttribute("style", "border-bottom:none");
      document
        .getElementById("order")
        .setAttribute("style", "border-bottom:none");
    } else if (id === "about") {
      document
        .getElementById("about")
        .setAttribute("style", "border-bottom:2px solid yellow");
        if(document.getElementById("login")!==null)
        {
      document.getElementById("login").setAttribute("style", "border-bottom:none");
        }
      document
        .getElementById("home")
        .setAttribute("style", "border-bottom:none");
      document
        .getElementById("menu")
        .setAttribute("style", "border-bottom:none");
      document
        .getElementById("order")
        .setAttribute("style", "border-bottom:none");
    }
  };
  handleLogout = () => {
    var user = JSON.parse(window.localStorage.getItem("pizzaBar"));
    if (user) {
      let newData = {
        email: user.email
      };
      let data = {
        url: LOGOUT,
        method: "post",
        data: newData,
        header: { token: user.tk }
      };
      requestData(data).then(res => {
        if (res.status === 200 && res.data === "logout") {
          window.localStorage.removeItem("pizzaBar");
          this.props.logout();
        }
      });
    }
  };
  render() {
    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          <img
            src="https://image.flaticon.com/icons/svg/673/673887.svg"
            className="logo"
            alt="logo"
          />

          <Link
            to="/"
            className="route"
            id="home"
            onClick={() => {
              this.handleItemClick("home");
            }}
          >
            home
          </Link>
          <Link
            to="/menu"
            className="route"
            id="menu"
            onClick={() => {
              this.handleItemClick("menu");
            }}
          >
            menu
          </Link>

          <Link
            to="/order"
            id="order"
            className="route"
            onClick={() => {
              this.handleItemClick("order");
            }}
          >
            order
          </Link>
          <Link
            to="/about"
            className="route"
            id="about"
            onClick={() => {
              this.handleItemClick("about");
            }}
          >
            about
          </Link>
          {this.state.isLoaded ? (
            <Menu.Menu position="right">
              {!this.props.auth.login ? 
                <Link
                  to="/login"
                  id="login"
                  onClick={() => {
                    this.handleItemClick("login");
                  }}
                >
                  login
                </Link>
               : 
                <Link
                  to="/"
                  id="logout"
                  onClick={() => {
                    this.handleLogout();
                  }}
                >
                  logout
                </Link>
              }
            </Menu.Menu>
          ) : null}
        </Menu>
      </Segment>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
const mapDispatchToProps = dispatch => {
  return {
    step1: () => dispatch(actionType.step1()),
    resetOrder: () => dispatch(actionType.resetOrder()),
    logout: () => dispatch(actionType.logout()),
    login: email => dispatch(actionType.login(email))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(header);
