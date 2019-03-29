import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { onRequestSent } from '../../../actions';
import { stateOptions } from '../../form_builders/utils/stateOptions';

import './css/restaurantInfoForm.css';

class RestaurantInfoForm extends Component {
  state = { stateField: null, responseObject: null };

  componentWillUnmount() {
    this.props.onRequestSent();
  }

  onSubmit = async event => {
    event.preventDefault();
    const { address, city, zipcode, phone } = event.target;
    const { name } = this.props.requestData;

    const updatedRequestData = {
      name,
      address: address.value,
      city: city.value,
      state: this.state.stateField,
      zipcode: zipcode.value,
      area_code: phone.value.slice(0, 3),
      phone: phone.value.slice(3, 10)
    };

    const req = {
      method: 'put',
      url: '/api/eatery/add',
      data: updatedRequestData
    };

    const res = await axios(req);

    this.setState({ responseObject: res });
  };

  onSelectChange = ({ target }) => {
    this.setState({ stateField: target.value });
  };

  render() {
    if (this.state.responseObject) {
      const { data } = this.state.responseObject;
      const { id } = data;
      const pathname = `/eatery/happy-place/${id}`;
      return (
        <Redirect
          to={{
            pathname,
            state: { data }
          }}
        />
      );
    }
    if (!this.props.requestData) return <Redirect to="/owner/new-restaurant" />;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="col-3 mx-auto">
            <div className="col">
              <h1 style={{ textAlign: 'center' }}>
                {this.props.requestData.name}
              </h1>
            </div>

            <div className="form-group form-row">
              <div className="col">
                <label htmlFor="input-restaurantAddress">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="input-restaurantAddress"
                  name="address"
                />
              </div>
            </div>
            <div className="form-group form-row">
              <div className="col-md-5">
                <label htmlFor="input-restaurantCity">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="input-restaurantCity"
                  name="city"
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="input-restaurantState">State</label>
                <select
                  id="input-restaurantState"
                  className="form-control"
                  name="state"
                  onChange={this.onSelectChange}
                >
                  {stateOptions.map(option => (
                    <option value={option.value}>{option.text}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <label htmlFor="input-restaurantZip">Zip</label>
                <input
                  type="text"
                  className="form-control"
                  id="input-restaurantZip"
                  name="zipcode"
                />
              </div>
            </div>
            <label>Phone</label>
            <div className="form-group form-row">
              <div className="col-md-4">
                <input type="tel" className="form-control" name="phone" />
              </div>
            </div>
            <div className="row">
              <button
                type="submit"
                className="mx-auto btn-lg main-app-color"
                style={{ width: '9rem', border: '0', marginTop: '3.5rem' }}
              >
                <span>Submit</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ requestData }) => {
  return { requestData };
};

export default connect(
  mapStateToProps,
  { onRequestSent }
)(RestaurantInfoForm);
