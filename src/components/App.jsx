import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";
import sampleFishes from "../sample-fishes";
import PropTypes from "prop-types";

import base from "../base";

export default class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };
  componentDidMount() {
    const localStorageRef = localStorage.getItem(
      this.props.match.params.storeId
    );
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
    this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }
  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  addFish = fish => {
    // 1. Take a copy of th existing state
    const fishes = { ...this.state.fishes };
    // 2. Add our new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. Ste the new fishes object to state
    this.setState({
      fishes: fishes
    });
  };
  updateFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = updatedFish;
    this.setState({
      fishes: fishes
    });
  };
  deleteFish = key => {
    const fishes = { ...this.state.fishes };
    fishes[key] = null; // To delete from firebase
    this.setState({
      fishes: fishes
    });
  };
  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    });
  };
  addToOrder = key => {
    // 1. Take a copy of th existing state
    const order = { ...this.state.order };
    // 2. Either add to order, or update the number in our order
    order[key] = order[key] + 1 || 1;
    // 3. Call setState to update our state object
    this.setState({
      order: order
    });
  };
  removeFromOrder = key => {
    // 1. Take a copy of th existing state
    const order = { ...this.state.order };
    // 2. Either add to order, or update the number in our order
    delete order[key];
    // 3. Call setState to update our state object
    this.setState({
      order: order
    });
  };
  static propTypes = {
    match: PropTypes.object
  };
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}
