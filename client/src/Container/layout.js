import React, { Component } from "react";
import Header from "./header/header";
export default class layout extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <main>{this.props.children}</main>
      </div>
    );
  }
}
