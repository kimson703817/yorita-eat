import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import OrderItem from '../user/order/components/OrderItem';

class Checkout extends Component {
  renderOrderItem = id => {
    const { items } = this.props.itemsOrdered;
    const item = items[id];

    return <OrderItem key={item.name} item={{ id, ...item }} />;
  };

  onPayment = async e => {
    e.preventDefault();
    const metadata = {
      eateries_id: this.props.itemsOrdered.eateries_id,
      note: null
    };
    const itemList = this.props.itemsOrdered.items;
    const keys = Object.keys(itemList);
    const items = keys.map(id => {
      return {
        id,
        quantity: itemList[id].qty
      };
    });
    // console.log(items);
    const apiRes = await axios.post('/api/order/food/', {
      items,
      metadata
    });
    console.log(apiRes.data);
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
            <button
              className="btn btn-md main-app-color mt-4"
              onClick={this.onPayment}
            >
              Pay ${itemsOrdered.subtotal.toFixed(2)}
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
