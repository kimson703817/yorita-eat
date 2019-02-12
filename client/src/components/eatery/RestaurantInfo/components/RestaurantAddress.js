import React, { Component } from 'react';

import { Form } from 'semantic-ui-react';

import { stateOptions } from '../../../form_builders/utils/stateOptions';

import './css/restaurantAddress.css';

class RestaurantAddress extends Component {
  renderAddress = () => {
    const { streetAddr } = this.props.address;

    if (this.props.editMode) {
      return (
        <Form.Input required defaultValue={streetAddr} name="streetAddr" />
      );
    }
    return <div className="restaurant contact">{streetAddr}</div>;
  };

  handleStateSelect = (event, { value }) => {
    this.props.onSelect(value);
  };

  renderCityStateZip = () => {
    const { city, state, zipcode } = this.props.address;

    if (this.props.editMode) {
      return (
        <div>
          <Form.Input required defaultValue={city} name="city" />
          <Form.Group className="edit state-zip">
            <Form.Dropdown
              fluid
              className="restaurant edit state"
              required
              defaultValue={state}
              name="state"
              selection
              options={stateOptions}
              onChange={this.handleStateSelect}
            />
            <Form.Input
              className="restaurant edit zip"
              required
              defaultValue={zipcode}
              name="zipcode"
            />
          </Form.Group>
        </div>
      );
    }
    return (
      <div className="restaurant contact">{`${city}, ${state} ${zipcode}`}</div>
    );
  };

  render() {
    return (
      <div>
        {this.renderAddress()}
        {this.renderCityStateZip()}
      </div>
    );
  }
}

export default RestaurantAddress;
