import React, { Component } from "react";
import { connect } from "react-redux";
import "./order.css";
import * as actionType from "../../Store/Action/actions"

import StepTwo from "./stepTwo"
import StepOne from './stepOne'
import StepThree from "./stepThree"
import StepFour from "./stepFour"
export class order extends Component {
componentDidMount=()=>{
  window.scrollTo(0, 0);

}

  render() {
    return (
      <div className="row orders">
        <div className="col-12 " id="steps">
          <div className="containerOrder">
            <ul className="progressbar">
              <li className={this.props.steps.step1 ? "active" : ""}>Order</li>
              <li className={this.props.steps.step2  ? "active" : ""}>Location</li>
              <li className={this.props.steps.step3  ? "active" : ""}>Payment</li>
              <li className={this.props.steps.step4  ? "active" : ""}>Completed</li>
            </ul>
          </div>
          <div className="col-12 ">
            {this.props.steps.step1 ? (
              <StepOne></StepOne>
            ) : null}
          </div>

          <div className="col-12">
            {this.props.steps.step2 ? (
              <div>
                <StepTwo>
                </StepTwo>
                </div>
              
            ) : null}
            {this.props.steps.step3 ? (
             <StepThree></StepThree>
            ) : null}
            {this.props.steps.step4 ? (
              <StepFour></StepFour>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    order:state.order,
    steps:state.steps
};
};

const mapDispatchToProps =dispatch=>{
  return {
  save:(order)=>dispatch(actionType.saveOrder(order)),
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(order);
