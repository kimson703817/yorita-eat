import React, { Component } from 'react';

import { Form } from 'semantic-ui-react';

import './css/restaurantPhone.css';

class RestaurantIcon extends Component {
  render() {
    const { areaCode, phone } = this.props.phoneNumber;

    if (this.props.editMode) {
      return (
        <Form.Group className="restaurant edit phone">
          <span>(</span>
          <Form.Input
            className="area-code"
            type="tel"
            defaultValue={areaCode}
            maxLength="3"
            name="areaCode"
          />
          <span>)</span>
          <Form.Input
            className="phone"
            type="tel"
            defaultValue={phone}
            maxLength="7"
            name="phone"
          />
        </Form.Group>
      );
    }

    return (
      <div className="restaurant contact">
        {`${areaCode}`}-{`${phone.slice(0, 3)}-${phone.slice(3)}`}
      </div>
    );
  }
}

export default RestaurantIcon;
