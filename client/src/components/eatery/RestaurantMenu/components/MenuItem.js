// import axios from 'axios';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { addToOrder, modifyOrderQuantity } from '../../../../actions';
import Octicon, { Check } from '@githubprimer/octicons-react';

class MenuItems extends Component {
  // State to keep track of the quantity that is being ordered of this item.
  state = {
    orderQty: null
  };

  // When this item is ordered, update the local storage shopping cart
  onQuantitySubmit = event => {
    event.preventDefault();
    // Database ID for this specific item
    const { id } = this.props.item;

    // The shopping cart object mapped from the Redux store.
    const { itemsOrdered } = this.props;

    // Check to see if the item is already in the cart
    const savedItem = itemsOrdered ? itemsOrdered.items[id] : null;

    // If orderQty state has been changed, use as new qty, otherwise get qty from shopping cart, default to 1.
    const qty = this.state.orderQty
      ? this.state.orderQty
      : savedItem
      ? savedItem.qty
      : 1;

    // if item is already in cart, modify the quantity
    // else pass in the item object
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

    // display quantity
    let quantity = null;

    // if this item is already in shopping cart, get the quantity from the shopping cart
    if (items) {
      if (items[id]) {
        quantity = items[id].qty;
      }
    }

    // otherwise, get item quantity from state
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

  render() {
    const { id, name, price, key_img } = this.props.item;
    const { cloudUrl } = this.props.metadata;
    const { itemsOrdered, active } = this.props;
    const item = itemsOrdered
      ? itemsOrdered.items[id]
        ? itemsOrdered.items[id]
        : null
      : null;

    // render card for this menu item
    // the "Order" button is only active outside of Edit Mode, otherwise display the "Edit" button
    // button will display the order quantity if this item is in the user's shopping cart
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
}

const mapStateToProps = ({ itemsOrdered }) => {
  return { itemsOrdered };
};

export default connect(
  mapStateToProps,
  { addToOrder, modifyOrderQuantity }
)(MenuItems);
