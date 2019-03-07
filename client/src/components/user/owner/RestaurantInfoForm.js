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
    const { address, city, zipcode, areaCode, phone } = event.target;
    const { name } = this.props.requestData;
    const updatedRequestData = {
      name,
      streetAddr: address.value,
      city: city.value,
      state: this.state.stateField,
      zipcode: zipcode.value,
      areaCode: areaCode.value,
      phone: phone.value
    };

    const req = {
      method: 'put',
      url: '/api/eatery/add',
      data: updatedRequestData
    };

    const res = await axios(req);

    this.setState({ responseObject: res });
  };

  onSelectChange = (event, { value }) => {
    this.setState({ stateField: value });
  };

  renderTextInput = (name, className, placeholder) => (
    <input
      className={className}
      type="text"
      name={name}
      placeholder={placeholder}
      required
      autoComplete="off"
    />
  );

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
    // if (!this.props.requestData) return <Redirect to="/owner/new-restaurant" />;
    return (
      <div>
        {/*<h1>{this.props.requestData.name}</h1>*/}
        <form onSubmit={this.onSubmit}>
          <div className="form-row">
            <div className="align-self-center mx-auto col-3 center-inputText">
              <label className="col-form-label-lg label-top-lg">Address</label>
              {this.renderTextInput(
                'address',
                'form-control form-control-lg center-inputText mb-3',
                'Your Address'
              )}
              <label className="col-form-label-lg label-top-lg">City</label>
              {this.renderTextInput(
                'city',
                'form-control form-control-lg center-inputText mb-3',
                'City'
              )}
              <select class="custom-select">
                <option selected>state</option>
                <option value="AL">AL</option>
                <option value="CA">CA</option>
                <option value="MN">MN</option>
              </select>
              <button
                type="submit"
                className="btn-lg main-app-color"
                style={{ minWidth: '15%', border: '0' }}
              >
                <span style={{ marginRight: '0.25rem' }}>Go</span>
                <Octicon verticalAlign="middle" icon={ChevronRight} />
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ requestData }) => {
  console.log('I am sunny');
  console.log(requestData);
  return { requestData };
};

export default connect(
  mapStateToProps,
  { onRequestSent }
)(RestaurantInfoForm);
