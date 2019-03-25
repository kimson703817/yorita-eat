import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  removeFromOrder,
  modifyOrderQuantity
} from '../../../../actions/index';

class OrderItem extends Component {
  onQuantityChange = event => {
    event.preventDefault();
    const qty = event.target.value;
    const { id } = this.props.item;
    this.props.modifyOrderQuantity(id, qty);
  };
  onItemRemove = e => {
    e.preventDefault();
    const { item } = this.props;
    this.props.removeFromOrder(item.id);
  };

  render() {
    const { item } = this.props;
    const { name, price, key_img, cloudUrl, qty } = item;

    return (
      <div
        style={{ borderLeft: '0', borderRight: '0', borderTop: '0' }}
        className="card"
      >
        <div className="card-body row align-items-center">
          <img
            style={{ objectFit: 'contain' }}
            className="card-img-top col-sm-1"
            src={`${cloudUrl}/${key_img}`}
            alt="dish"
          />
          <h6 className="card-title col-sm-7">{name}</h6>
          <h5 className="col-sm-2">${price}</h5>
          <div className="col-sm-1">
            <input
              type="number"
              name="quantity"
              min="1"
              defaultValue={qty}
              style={{ textAlign: 'center', width: '2.5rem', height: '2rem' }}
              onChange={this.onQuantityChange}
            />
          </div>
          <div className="col-sm-1">
            <button
              className="btn btn-sm btn-danger"
              onClick={this.onItemRemove}
            >
              remove
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, itemsOrdered }) => {
  return { auth, itemsOrdered };
};

export default connect(
  mapStateToProps,
  { removeFromOrder, modifyOrderQuantity }
)(OrderItem);
