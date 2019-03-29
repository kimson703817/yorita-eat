import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import OrderItem from './components/OrderItem';

class Order extends Component {
  renderOrderItem = id => {
    const { items } = this.props.itemsOrdered;
    const item = items[id];

    return <OrderItem key={item.name} item={{ id, ...item }} />;
  };

  render() {
    const { itemsOrdered } = this.props;
    const items = itemsOrdered ? itemsOrdered.items : null;
    let keys = null;
    if (items) keys = Object.keys(items);

    return (
      <div className="container">
        {keys ? keys.map(this.renderOrderItem) : <div>Order is Empty</div>}
        {itemsOrdered && (
          <div className="d-flex flex-row justify-content-center">
            <button className="btn btn-md main-app-color mt-4 ">
              <NavLink
                style={{ color: 'black' }}
                exact
                to="/order/checkout"
                name="checkout"
              >
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
