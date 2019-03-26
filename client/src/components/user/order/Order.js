import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import OrderItem from './components/OrderItem';

class Order extends Component {
  renderOrderItem = id => {
    if (id === 'subtotal' || id === 'eateries_id') return;
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
              <NavLink exact to="/order/checkout" name="checkout">
                Proceed to Checkout ${itemsOrdered.subtotal.toFixed(2)}
              </NavLink>
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
)(Order);
