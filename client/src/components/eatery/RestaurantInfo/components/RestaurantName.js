import React, { Component } from 'react';

import './css/restaurantName.css';

class RestaurantIcon extends Component {
  render() {
    const { name } = this.props;

    if (this.props.editMode) {
      return (
        <div className="form-group">
          <input
            className="form-control form-control-sm restaurant name edit"
            required
            defaultValue={name}
            name="name"
          />
        </div>
      );
    }
    return <h2 className="restaurant home name">{name}</h2>;
  }
}

export default RestaurantIcon;
