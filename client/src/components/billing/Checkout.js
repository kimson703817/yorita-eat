import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import OrderItem from '../user/order/components/OrderItem';

class Checkout extends Component {
  renderOrderItem = id => {
    if (id === 'subtotal') return;
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
        {itemsOrdered && (
          <div className="d-flex flex-row justify-content-center">
            <button className="btn btn-md main-app-color mt-4 ">
              Pay ${itemsOrdered.subtotal}
            </button>
          </div>
        )}
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
)(Checkout);
