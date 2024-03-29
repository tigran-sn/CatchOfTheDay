import React from "react";
import PropTypes from "prop-types";
import { getFunName } from "../helpers";

export default class StorePicker extends React.Component {
  myInput = React.createRef();
  goToStore = event => {
    event.preventDefault();
    // console.log(this.myInput.current.value);
    const storeName = this.myInput.current.value;
    this.props.history.push(`/store/${storeName}`);
  };
  static propTypes = {
    history: PropTypes.object
  };
  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter a Store</h2>
        <input
          type="text"
          ref={this.myInput}
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store -></button>
      </form>
    );
  }
}
