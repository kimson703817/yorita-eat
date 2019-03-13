import React, { Component } from 'react';

import './css/restaurantPhone.css';

class RestaurantIcon extends Component {
  render() {
    const { area_code, phone } = this.props.phoneNumber;

    if (this.props.editMode) {
      return (
        <div className="form-group">
          <div className="form-row">
            <input
              style={{ marginLeft: '0.4rem' }}
              className="col-md-3 form-control form-control-sm"
              type="tel"
              defaultValue={area_code}
              maxLength="3"
              name="area_code"
            />
            <input
              style={{ marginLeft: '0.4rem' }}
              className="col-md-6 form-control form-control-sm"
              type="tel"
              defaultValue={phone}
              maxLength="7"
              name="phone"
            />
          </div>
        </div>
      );
    }

    return (
      <div className="restaurant contact">
        {`${area_code}`}-{`${phone.slice(0, 3)}-${phone.slice(3)}`}
      </div>
    );
  }
}

export default RestaurantIcon;
