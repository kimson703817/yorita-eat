import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import shortid from 'shortid';

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

  renderOrders = entry => {
    const { order_date, name, total, items } = entry;
    const date = new Date(order_date);
    return (
      <div className="custom-card" key={shortid.generate()}>
        <div className="card">
          <div className="d-flex flex-row">
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <p className="card-text">{date.toLocaleDateString()}</p>

              <ul>
                <div className="row align-items-center">
                  <h6 className="card-title col-sm-7">Item</h6>
                  <h6 className="col-sm-1">Qty</h6>
                  <h6 className="col-sm-2">Price</h6>
                </div>
                {items.map(item => (
                  <li
                    className="row align-items-center"
                    key={shortid.generate()}
                  >
                    <span className="card-title col-sm-7">{item.name}</span>
                    <span className="col-sm-1">x {item.qty}</span>
                    <span className="col-sm-2">${item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    if (!this.state.data) return <div />;

    return (
      <div className="container">{this.state.data.map(this.renderOrders)}</div>
    );
  }
}

export default OrderHistory;
