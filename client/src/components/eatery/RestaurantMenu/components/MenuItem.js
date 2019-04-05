// import axios from 'axios';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { addToOrder, modifyOrderQuantity } from '../../../../actions';
import Octicon, { Check } from '@githubprimer/octicons-react';

class MenuItems extends Component {
  state = {
    orderQty: null
  };
  orderObject = null;

  onQuantitySubmit = event => {
    event.preventDefault();
    const { id } = this.props.item;

    const { itemsOrdered } = this.props;
    const savedItem = itemsOrdered ? itemsOrdered.items[id] : null;

    const qty = this.state.orderQty
      ? this.state.orderQty
      : savedItem
      ? savedItem.qty
      : 1;

    if (savedItem) {
      this.props.modifyOrderQuantity(id, qty);
    } else {
      const { name, price, key_img } = this.props.item;
      const { eateries_id, cloudUrl } = this.props.metadata;
      const obj = { name, price, key_img, cloudUrl, qty };
      this.props.addToOrder(id, obj, eateries_id);
    }
  };

  renderModal = () => {
    const { id, name, price, key_img } = this.props.item;
    const items = this.props.itemsOrdered
      ? this.props.itemsOrdered.items
      : null;
    let quantity = null;
    if (items) {
      if (items[id]) {
        quantity = items[id].qty;
      }
    }
    if (!quantity) {
      quantity = this.state.orderQty;
    }

    return (
      <div
        className="modal fade"
        id={name}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="orderItemModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="orderItemName-modal">
                Add to Your Order
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <div className="row">
                <div className="col-md-5">
                  <label>Item</label>
                  <div>{name}</div>
                </div>
                <div className="col-md-2">
                  <label>Item</label>
                  <div>${price}</div>
                </div>
                <div className="col-md-4">
                  <label>Quantity</label>
                  <div>
                    <input
                      type="number"
                      name="quantity"
                      min="1"
                      defaultValue={quantity ? quantity : 1}
                      style={{ textAlign: 'center', width: '2.5rem' }}
                      onChange={this.onQuantityChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn main-app-color"
                data-dismiss="modal"
                onClick={this.onQuantitySubmit}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  onQuantityChange = event => {
    event.preventDefault();
    this.setState({ orderQty: event.target.value });
  };

  // clearCart = event => {
  //   event.preventDefault();
  //   localStorage.removeItem('foodOrder');
  // };

  render() {
    const { id, name, price, key_img } = this.props.item;
    const { cloudUrl } = this.props.metadata;
    const { itemsOrdered, active } = this.props;
    const item = itemsOrdered
      ? itemsOrdered.items[id]
        ? itemsOrdered.items[id]
        : null
      : null;

    return (
      <div className="card" style={{ textAlign: 'center' }}>
        <img
          className="card-img-top"
          style={{ height: '7.5rem', width: '10rem', objectFit: 'scale-down' }}
          src={`${cloudUrl}/${key_img}`}
          alt="dish"
        />
        <div className="card-body">
          <h5 className="card-title">{name} </h5>

          <h6 className="card-text">${price}</h6>
          {active ? (
            item ? (
              <button
                type="button"
                className="btn-lg btn-success"
                data-toggle="modal"
                data-target={`#${name}`}
                style={{ border: '0', background: '#906e13', color: '#fefcf5' }}
              >
                <span>Ordered: {item.qty}</span>
              </button>
            ) : (
              <button
                type="button"
                className="btn-lg main-app-color"
                data-toggle="modal"
                data-target={`#${name}`}
                style={{ border: '0', color: '#443409' }}
              >
                <span>Order</span>
              </button>
            )
          ) : (
            <div>
              <button type="button" className="btn-sm" style={{ border: '0' }}>
                <span>Edit</span>
              </button>
            </div>
          )}
          {this.renderModal()}
        </div>
      </div>
    );
  }

  // print = e => {
  //   e.preventDefault();
  //   let order = JSON.parse(localStorage.getItem('foodOrder'));
  //   console.log(order);
  // };
}

const mapStateToProps = ({ itemsOrdered }) => {
  return { itemsOrdered };
};

export default connect(
  mapStateToProps,
  { addToOrder, modifyOrderQuantity }
)(MenuItems);
