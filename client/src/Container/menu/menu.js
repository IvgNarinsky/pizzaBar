import React, { Component } from "react";
import "./menu.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionType from "../../Store/Action/actions";

class Menu extends Component {
  handleItemClick=()=>{
    this.props.resetOrder()
    this.props.step1()

  }
  render() {
    var pizzasMenu=this.props.menu.map((pizza,index)=>{
      return (
        <div className="col-lg-5 col-md-10 col-sm-12" key={"pizza"+index}>
          <div className="ribbon-holder d-block d-sm-none d-none d-md-block d-lg-none">
  <div className="ribbon ribbon-holder d-block d-sm-none  d-none d-md-block d-lg-none">{pizza.price+" $"}</div>
            <img  src={pizza.image} className="pizza-menu-images d-block d-sm-none  d-none d-md-block d-lg-none" alt={pizza.title}/>
</div>
<img  src={pizza.image} className="pizza-menu-images d-none d-sm-block" alt={pizza.title}/>

                 <div className="pizza-description center">
                     <h2 className="piza-title">{pizza.title}</h2>
                     <p className="desc">{pizza.description}</p>
                    <p><span className="price  d-none d-lg-block d-xl-none d-none d-xl-block ">{pizza.price}$ </span> <Link to='/order' className="button2"              onClick={() => {
              this.handleItemClick()}}>

              Order
            </Link></p>
                     
          </div>
          </div>
      )
    })
    return (
      <div className="menu-all">
          <div className="menu-box ">
            <div className="container">
              <div className="row">
          <h1 className="menu-title">HOT PIZZA MEALS</h1>
          </div>

               <div className="row all-pizzas-menu-images pizza-info">
                {pizzasMenu}

            </div>
            </div>

          </div>

        </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    menu:state.menu.pizzas,
};
};

const mapDispatchToProps = dispatch => {
  return {
    step1: () => dispatch(actionType.step1()),
    resetOrder:()=>dispatch(actionType.resetOrder())
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);