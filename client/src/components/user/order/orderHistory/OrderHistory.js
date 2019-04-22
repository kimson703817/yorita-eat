import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class OrderHistory extends Component {
  state = {
    data: []
  };

  async componentDidMount() {
    const req = {
      method: 'get',
      url: `/api/order/history/user`
    };

    try {
      const res = await axios(req);
      const { data } = res;

      this.setState({ data });
    } catch (error) {
      this.setState({ data: false });
    }
  }

  displayMoney = n => {
    const value = n / 100;
    return value.toFixed(2);
  };

  render() {
    return <div className="container">Your Order History</div>;
  }
}

export default OrderHistory;
