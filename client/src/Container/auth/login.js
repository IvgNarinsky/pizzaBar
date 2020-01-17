import React, { Component } from 'react'
import "./auth.css"
import { Link } from "react-router-dom";
import {requestData} from '../../Manger/manger'
import { LOGIN_WITH_CRED } from '../../Url/url';
import { connect } from "react-redux";
import * as actionType from "../../Store/Action/actions";
import { withRouter } from "react-router-dom";

 class Login extends Component {
    state = {
        user:{
            email:"",
            password:""
        },
        errors:{
            email:false,
            password:false
        }
    };

    componentDidMount=()=>{
    }
    handleChange = e => {
      var temp_user = { ...this.state.user };
      document.getElementById("failedLogin").innerHTML=""
      temp_user[e.target.id] = e.target.value;
      this.setState(
        {
          user: temp_user
        },
        () => {}
      );
    };
  
    onSubmitHandler=(event)=>{
      event.preventDefault();
      if(this.validation())
      {
        let newData={
         email:this.state.user.email,
         password:this.state.user.password
        }
        let data={
          url:LOGIN_WITH_CRED,
          method:'post',
          data:newData
          
        }
        requestData(data).then(res=>{
          if(res.status===200)
          {
            var user = {
              tk: res.data.token,
              email: res.data.email
            };
            window.localStorage.setItem("pizzaBar", JSON.stringify(user)); 
            this.props.login(res.data.email)
            this.props.history.push("/");

          }
           
        }).catch(err=>{
          document.getElementById("failedLogin").style.color="red"
          document.getElementById("failedLogin").innerHTML="email/passsword doesnt exist"


        })
      }
    }
  
    validation=()=>{
      //here i need to check if user exists in db
          var erorUpdate=this.state.errors
          if(this.state.user.password.length<5)
          {
              erorUpdate.password=true
              this.setState({errors:erorUpdate},()=>{})
              return false
          }
          if(!this.state.user.email.includes('@')||!this.state.user.email.includes('.com'))
          {
              erorUpdate.email=true
              this.setState({errors:erorUpdate},()=>{})
              return false
          }
  
          return true
       
  
    }
    clearErrorHandler=()=>{
        var clearedErrors={
          email:false,
          password:false
        }
        this.setState({errors:clearedErrors})
    }
    render() {

      return (
        <div className="authWall">
          <div className="row">
            <div className="col-12 auth-box centered">
              <form className="centered">
                  <h1 className="auth-title">Login</h1>
                  <br></br>
               
                <div className="group">
                  <input type="text" id="email"   onChange={e=>{this.handleChange(e)}} onKeyDown={this.clearErrorHandler} required />
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label>Email</label>
                </div>
                <div className="group">
                  <input type="password" id="password" autoComplete="123456"  onChange={e=>{this.handleChange(e)}} onKeyDown={this.clearErrorHandler} required />
                  <span className="highlight"></span>
                  <span className="bar"></span>
                  <label>Password</label>
                </div>
                <span>
                <button type="submit" className="buttonEffect" onClick={(e)=>{this.onSubmitHandler(e)}}>submit</button>
                <Link to="/register">  <button type="button" className="buttonEffect register-button" >register</button></Link>
                <br></br>
                {this.state.errors.password||this.state.errors.email?<span className="error-color">Invalid user</span>:null}
                <span id="failedLogin"></span>
                </span>

               
              </form>
            </div>
          </div>
        </div>
      );
 }


  
}

const mapDispatchToProps = dispatch => {
  return {
    login: (email) => dispatch(actionType.login(email)),
  };
};

export default withRouter(connect(null,mapDispatchToProps)(Login))
