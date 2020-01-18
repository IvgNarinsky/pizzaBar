import React, { Component } from "react";
import { connect } from "react-redux";
import "./recipet.css";

export class stepFour extends Component {
  state = {
    tax: 0.05
  };
  componentDidMount = () => {
  };

  render() {
    var totalPrice=0
     var service=this.props.order.saveOrder.map((order,index)=>{
      totalPrice+=Number(order.total.toFixed(2))
      return (
        <tr className="service" key={index}>
          <td className="tableitem">
            <p className="itemtext">{order.pizza}</p>
          </td>
          <td className="tableitem">
            <p className="itemtext">{order.size}</p>
          </td>
          <td className="tableitem">
            <p className="itemtext">{order.toppings}</p>
          </td>
          <td className="tableitem">
            <p className="itemtext">${order.total}</p>
          </td>
        </tr>
      );
    });
    var tax = totalPrice* this.state.tax;
	
    return (
      <div className="row recipet">
        <div id="invoice-POS">
          <center id="top">
            <div className="logo"></div>
            <div className="info">
              <h2>PizzaBar Inc</h2>
            </div>
          </center>

          <div id="mid">
            <div className="info">
              <h2>Contact Info</h2>
              <p>
                Address : raziel david 11 b bat yam, israel<br></br>
                Email : PizzaBar@gmail.com<br></br>
                Phone : 555-555-5555<br></br>
              </p>
            </div>
          </div>
          <br></br>
          <div id="bot">
            <div id="table">
              <table>
                <tbody>
                  <tr className="tabletitle">
                    <td className="item">
                      <h2>Item</h2>
                    </td>
                    <td className="Hours">
                      <h2>Size</h2>
                    </td>
                    <td className="Hours">
                      <h2>Toppings</h2>
                    </td>
                    <td className="Rate">
                      <h2>Sub Total</h2>
                    </td>
                  </tr>
                  {service}
                   {this.props.auth.login?
                   <tr className="tabletitle">
                   <td></td>
                   <td className="Rate">
                     <h2>discount</h2>
                   </td>
                   <td className="payment">
                     <h2>%10</h2>
                   </td>
                 </tr>
                   :null}
                  <tr className="tabletitle">
                    <td></td>
                    <td className="Rate">
                      <h2>tax</h2>
                    </td>
                    <td className="payment">
                      <h2>${Number(tax.toFixed(2))}</h2>
                    </td>
                  </tr>

                  <tr className="tabletitle">
                    <td></td>
                    <td className="Rate">
                      <h2>Total</h2>
                    </td>
                    <td className="payment">
                      {this.props.auth.login?
                      <h2>${Number(( totalPrice-(totalPrice*0.10)+tax).toFixed(2))}</h2>
                      :
                      <h2>${Number(( totalPrice+tax).toFixed(2))}</h2>}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div id="legalcopy">
              <p className="legal">
                <strong>Thank you for your business!</strong>  Payment is
                expected within 14 days; please process this invoice within that
                time. There will be a 5% interest charge per month on late
                invoices.
              </p>
            </div>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(stepFour);
