import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import Octicon, { ChevronRight } from '@githubprimer/octicons-react';

import { onRequestSent } from '../../../actions';
import { stateOptions } from '../../form_builders/utils/stateOptions';

import './css/restaurantInfoForm.css';

const formInputs = [
  {
    className: 'form-control form-control-lg center-inputText mb-3',
    type: 'text',
    label: 'Name',
    name: 'name',
    placeholder: 'Your Address',
    required: true,
    autoComplete: 'off'
  },
  {
    className: 'form-control form-control-lg center-inputText mb-3',
    type: 'text',
    label: 'City',
    name: 'city',
    placeholder: 'City',
    required: true,
    autoComplete: 'off'
  }
];

// <input
//       className={className}
//       type="text"
//       name={name}
//       placeholder={placeholder}
//       required
//       autoComplete="off"

class RestaurantInfoForm extends Component {
  state = { stateField: null, responseObject: null };

  componentWillUnmount() {
    this.props.onRequestSent();
  }

  onSubmit = async event => {
    event.preventDefault();
    const { address, city, zipcode, areaCode, phone } = event.target;
    const { name } = this.props.requestData;

    const updatedRequestData = {
      name,
      streetAddr: address.value,
      city: city.value,
      state: this.state.stateField,
      zipcode: zipcode.value,
      areaCode: phone.value.slice(0, 3),
      phone: phone.value.slice(3, 10)
    };
    console.log(updatedRequestData);

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
      const { _id } = data;
      const pathname = `/eatery/happy-place/${_id}`;
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
          <div className="col-4 mx-auto">
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
              <div className="col-md-7">
                <label htmlFor="input-restaurantCity">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="input-restaurantCity"
                  name="city"
                />
              </div>
              <div className="col-md-2">
                <label htmlFor="input-restaurantState">State</label>
                <select
                  id="input-restaurantState"
                  className="form-control"
                  name="state"
                  onChange={this.onSelectChange}
                >
                  <option value="AL">AL</option>
                  <option value="CA">CA</option>
                  <option value="MN">MN</option>
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

// <label className="col-form-label-lg label-top-lg">Address</label>
// {this.renderTextInput(
//                 'address',
//                 'form-control form-control-lg center-inputText mb-3',
//                 'Your Address'
//               )}
//               <label className="col-form-label-lg label-top-lg">City</label>
//               {this.renderTextInput(
//                 'city',
//                 'form-control form-control-lg center-inputText mb-3',
//                 'City'
//               )}

// {/*<div className="align-self-center mx-auto col-3">*/}

//               <div className="form-group col-md-6">
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="input-restaurantState"
//                 />
//               </div>

// <button
//   type="submit"
//   className="btn-lg main-app-color"
//   style={{ minWidth: '15%', border: '0' }}
// >
//   <span style={{ marginRight: '0.25rem' }}>Go</span>
//   <Octicon verticalAlign="middle" icon={ChevronRight} />
// </button>
