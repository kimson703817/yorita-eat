import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import OrderItem from './components/OrderItem';

class Order extends Component {
  onQuantityChange = () => {};

  renderOrderItem = id => {
    const { itemsOrdered } = this.props;
    const item = itemsOrdered[id];

    return <OrderItem key={item.name} item={{ id, ...item }} />;
  };

  render() {
    const { itemsOrdered } = this.props;
    let keys = null;
    if (itemsOrdered) keys = Object.keys(itemsOrdered);
    return (
      <div className="container">
        {keys ? keys.map(this.renderOrderItem) : <div />}
        <button className="btn btn-md main-app-color">
          Proceed to Checkout
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, itemsOrdered }) => {
  return { auth, itemsOrdered };
};

export default connect(
  mapStateToProps,
  null
)(Order);
