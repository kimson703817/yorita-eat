import axios from 'axios';
import React, { Component } from 'react';

class MenuItems extends Component {
  render() {
    const { name, price, key_img, cloudUrl } = this.props.item;
    return (
      <div className="card">
        <img
          className="card-img-top"
          src={`${cloudUrl}/${key_img}`}
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <h6 className="card-text">{price}</h6>
        </div>
      </div>
    );
  }
}

export default MenuItems;
