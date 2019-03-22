// import axios from 'axios';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { addToOrder } from '../../../../actions';

class MenuItems extends Component {
  state = {
    orderOpen: false,
    orderQty: 0
  };
  orderObject = null;

  onQuantitySubmit = event => {
    event.preventDefault();

    const { orderQty } = this.state;
    const { id, name, price, key_img, cloudUrl } = this.props.item;
    const obj = { name, price, key_img, cloudUrl, qty: orderQty };
    this.props.addToOrder(id, obj);
  };

  renderModal = () => {
    const { id, name, price, key_img, cloudUrl } = this.props.item;
    const { itemsOrdered } = this.props;
    let quantity = null;
    if (itemsOrdered) {
      if (itemsOrdered[id]) {
        quantity = itemsOrdered[id].qty;
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
                  <div>{price}</div>
                </div>
                <div className="col-md-4">
                  <label>Quantity</label>
                  <div>
                    <input
                      type="number"
                      name="quantity"
                      min="1"
                      defaultValue={quantity}
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

  clearCart = event => {
    event.preventDefault();
    localStorage.removeItem('foodOrder');
  };

  render() {
    const { id, name, price, key_img, cloudUrl } = this.props.item;

    return (
      <div className="card" style={{ textAlign: 'center' }}>
        <img
          className="card-img-top"
          src={`${cloudUrl}/${key_img}`}
          alt="dish"
        />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <h6 className="card-text">{price}</h6>
          <button
            type="button"
            className="btn-sm main-app-color"
            data-toggle="modal"
            data-target={`#${name}`}
            style={{ border: '0' }}
          >
            <span>Add to Order</span>
          </button>
          {this.renderModal()}
          <button type="button" onClick={this.clearCart}>
            Clear Order
          </button>
          <button type="button" onClick={this.print}>
            Print Test
          </button>
        </div>
      </div>
    );
  }

  print = e => {
    e.preventDefault();
    let order = JSON.parse(localStorage.getItem('foodOrder'));
    console.log(order);
  };
}

const mapStateToProps = ({ itemsOrdered }) => {
  return { itemsOrdered };
};

export default connect(
  mapStateToProps,
  { addToOrder }
)(MenuItems);
