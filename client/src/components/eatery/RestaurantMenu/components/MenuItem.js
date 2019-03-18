// import axios from 'axios';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { modifyOrder } from '../../../../actions';

class MenuItems extends Component {
  state = {
    orderOpen: false,
    orderQuantity: 0
  };
  orderObject = null;

  componentDidMount() {
    const { itemsOrdered } = this.props;
    const { id } = this.props.item;

    if (itemsOrdered) {
      this.orderObject = itemsOrdered.find(item => item.id === id);
      console.log(this.orderObject);
    }
  }

  onQuantitySubmit = event => {
    event.preventDefault();
    const { orderQuantity } = this.state;
    const { id, name, price } = this.props.item;
    const { itemsOrdered } = this.props;

    const insert = {
      id,
      name,
      price,
      quantity: orderQuantity
    };
    if (this.props.itemsOrdered === null) {
      this.props.modifyOrder([insert]);
    } else {
      this.props.modifyOrder([...itemsOrdered, insert]);
    }
  };

  // toggleOrderOpen = () => {
  //   this.setState({ orderOpen: !this.state.orderOpen });
  // };

  renderModal = () => {
    const { id, name, price, key_img, cloudUrl } = this.props.item;
    const { itemsOrdered } = this.props;
    const { orderQuantity } = this.state;

    // console.log(this.state.orderOpen);
    // if (!this.state.orderOpen) return;
    // let orderRecord;
    // if (itemsOrdered) {
    //   const item = itemsOrdered.filter(item => {
    //     return item.id === id;
    //   });
    //   if (item.length) {
    //     orderRecord = item[0];
    //     console.log(itemsOrdered.indexOf(orderRecord));
    //     console.log('wassup');
    //   }
    // }
    return (
      <div
        className="modal fade"
        id="orderItemModal"
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
                      defaultValue={orderQuantity}
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
                onClick={this.toggleOrderOpen}
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
    this.setState({ orderQuantity: event.target.value });
  };

  render() {
    const { name, price, key_img, cloudUrl } = this.props.item;
    // console.log(this.orderObject);
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
            data-target="#orderItemModal"
            style={{ border: '0' }}
          >
            <span>Add to Order</span>
          </button>
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
  { modifyOrder }
)(MenuItems);
