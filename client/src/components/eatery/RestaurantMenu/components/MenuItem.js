// import axios from 'axios';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { modifyOrder } from '../../../../actions';

class MenuItems extends Component {
  // componentDidMount() {
  //   const { itemsOrdered } = this.props;
  //   const { id } = this.props.item;

  // }
  onAddItem = event => {
    event.preventDefault();
    const quantity = event.target.quantity.value;
    const { id, name, price } = this.props.item;
    const { itemsOrdered } = this.props;

    const insert = {
      id,
      name,
      price,
      quantity
    };
    if (this.props.itemsOrdered === null) {
      this.props.modifyOrder([insert]);
    } else {
      this.props.modifyOrder([...itemsOrdered, insert]);
    }
  };

  renderModal = () => {
    const { id, name, price, key_img, cloudUrl } = this.props.item;
    const { itemsOrdered } = this.props;
    let orderRecord;
    if (itemsOrdered) {
      const item = itemsOrdered.filter(item => {
        return item.id === id;
      });
      if (item.length) orderRecord = item[0];
    }
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
            <form onSubmit={this.onAddItem}>
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
                  <div className="col-md-4" onSubmit={this.onAddItem}>
                    <label>Quantity</label>
                    <div>
                      <input
                        type="number"
                        name="quantity"
                        min="1"
                        defaultValue={orderRecord ? orderRecord.quantity : '1'}
                        style={{ textAlign: 'center', width: '2.5rem' }}
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
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { name, price, key_img, cloudUrl } = this.props.item;
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
