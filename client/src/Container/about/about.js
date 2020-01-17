import React, { Component } from 'react'
import './about.css'
import L from "leaflet";

import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});
export default class about extends Component {
    state = {
        lat: 32.0149162,
        lng: 34.758221999999996,
        zoom: 12,
      };
    render() {
        const position = [this.state.lat, this.state.lng];

        return (
            <div className="about">
                <div className="container">
                    <div className="row">
                        <div className="col-12 about-box">
                <h1 className="about-title">About us</h1>
                </div>
                <div className="row">
                    <div className="col-xl-9  col-md-10 col-sm-12" >
                    <div className="card card-1">
                <p className="about-us-explaination"><strong style={{fontSize:"30px"}}>PizzaRex</strong> is a frozen deep-dish pizza comes from one of Israel’s greatest Italian neighborhoods.  This specialty pizza has been a Tel aviv's favorite for over 20 years. In fact, we ship our pizzas across the country to customers who have left the area, but still crave our pizza.  So began our “take and bake” frozen pizza recipe. 

Our bake-at-home pizzas are made with the same care and attention as the pizzas served at our restaurant on PizzaRex’s Tel aviv.  Each pie is handcrafted using the best ingredients: rolled, hand-tossed dough; generous handfuls of fresh mozzarella; and Sicilia’s fresh, specially made tomato sauce.

The result is a hearty, classic Italian meal that features a soft cheesy center, a tangy savory marinara sauce and a light, crunchy crust that alone or with toppings creates a flavorful and filling meal that will satisfy even the heartiest appetite. Enjoy!</p>
<p>Tel:+555 555 555</p>

<h3>You can Find Us here <span role="img" aria-label="">👇🍕🌐</span></h3>
<Map
            className="map "
            center={position}
            zoom={this.state.zoom}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>Bat yam raziel 11b</Popup>
            </Marker>
          </Map>
                </div>
                    </div>
           
                </div>

         
          </div>
          </div>

          </div>
        )
    }
}
