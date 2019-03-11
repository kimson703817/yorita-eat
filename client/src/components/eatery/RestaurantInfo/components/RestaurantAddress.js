import React, { Component } from 'react';

import { stateOptions } from '../../../form_builders/utils/stateOptions';

import './css/restaurantAddress.css';

class RestaurantAddress extends Component {
  renderAddress = () => {
    const { streetAddr } = this.props.address;

    if (this.props.editMode) {
      return (
        <div className="form-group">
          <input
            className="form-control form-control-sm"
            required
            defaultValue={streetAddr}
            name="streetAddr"
          />
        </div>
      );
    }
    return <div className="restaurant contact">{streetAddr}</div>;
  };

  handleStateSelect = event => {
    this.props.onSelect(event.target.value);
  };

  renderCityStateZip = () => {
    const { city, state, zipcode } = this.props.address;

    if (this.props.editMode) {
      return (
        <div>
          <div className="form-group">
            <input
              className="form-control form-control-sm"
              required
              defaultValue={city}
              name="city"
            />
          </div>
          <div
            style={{ paddingLeft: '0.4rem' }}
            className="form-group form-row"
          >
            <select
              className="col-md-5 form-control form-control-sm"
              name="state"
              onChange={this.handleStateSelect}
            >
              <option value="AL">AL</option>
              <option value="CA">CA</option>
              <option value="MN">MN</option>
            </select>
            <div className="restaurant-edit-zip col-md-5">
              <input
                className="form-control form-control-sm"
                required
                defaultValue={zipcode}
                name="zipcode"
              />
            </div>
          </div>
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
