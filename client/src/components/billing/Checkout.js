import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import OrderItem from '../user/order/components/OrderItem';
import StripeCheckout from 'react-stripe-checkout';

import { onCheckout } from '../../actions';

class Checkout extends Component {
  state = {
    apiRes: null
  };
  renderOrderItem = id => {
    const { items } = this.props.itemsOrdered;
    const item = items[id];

    return <OrderItem key={item.name} item={{ id, ...item }} />;
  };

  componentWillUnmount() {
    const { apiRes } = this.state;
    if (apiRes) {
      this.props.onCheckout(apiRes);
    }
  }

  onPayment = async res => {
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
    try {
      const apiRes = await axios.post('/api/order/food/', {
        items,
        metadata,
        payment_id: res.id
      });
      this.setState({ apiRes: apiRes });
    } catch (err) {
      console.log(err);
    }
  };

  onToken = async token => {
    const amount = this.props.itemsOrdered.subtotal * 100;
    const description = 'Customer payment to restaurant.';
    try {
      const res = await axios.post('/api/payment/stripe', {
        amount,
        currency: 'usd',
        description,
        source: token.id
      });
      this.onPayment(res);
    } catch (err) {
      console.log(err);
    }
  };

  displayMoney = n => {
    const value = n / 100;
    return value.toFixed(2);
  };

  render() {
    const { itemsOrdered } = this.props;
    if (this.state.apiRes) {
      return (
        <Redirect to={`/eatery/happy-place/${itemsOrdered.eateries_id}`} />
      );
    }

    const items = itemsOrdered ? itemsOrdered.items : null;
    let keys = null;
    if (items) keys = Object.keys(items);

    return (
      <div className="container">
        {keys ? keys.map(this.renderOrderItem) : <div>Order is Empty</div>}
        {itemsOrdered && (
          <div className="d-flex flex-row justify-content-center">
            <StripeCheckout
              name="yorita-eatery-pay"
              description="Customer payment to restaurant"
              amount={itemsOrdered.subtotal}
              token={this.onToken}
              stripeKey={process.env.REACT_APP_STRIPE_PK}
            >
              <button className="btn btn-md main-app-color mt-4">
                Pay ${this.displayMoney(itemsOrdered.subtotal)}
              </button>
            </StripeCheckout>
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
  { onCheckout }
)(Checkout);
