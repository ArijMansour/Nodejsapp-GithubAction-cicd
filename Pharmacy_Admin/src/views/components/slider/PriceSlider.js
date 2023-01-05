import React, { Component } from "react";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

export default class PriceSlider extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      value: 10,
    };
  }

  handleChangeStart = () => {
    console.log("Change event started");
  };

  handleChange = (value) => {
    this.setState({
      value: value,
    });
    localStorage.setItem("price", value);
  };

  handleChangeComplete = () => {
    console.log("Change event completed");
  };

  render() {
    const { value } = this.state;
    return (
      <div className="x">
        <Slider
          min={5}
          max={50000}
          value={value}
          onChangeStart={this.handleChangeStart}
          onChange={this.handleChange}
          onChangeComplete={this.handleChangeComplete}
        />
        <h2 className="text-center text-2xl text-gray-400">
          <span className="text-black">Price: </span>
          {value}
        </h2>
      </div>
    );
  }
}
