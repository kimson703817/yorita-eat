import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

import { onRequestSent } from '../../../actions';
import { stateOptions } from '../../form_builders/utils/stateOptions';

import './css/restaurantInfoForm.css';

class RestaurantInfoForm extends Component {
  state = { stateField: null, responseObject: null };

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
    this.props.onRequestSent();

    // this.props.sendRequest(req);
    // const responseObject = await axios.put(
    //   '/api/eatery/add',
    //   updatedRequestObject
    // );

    // this.props.composeReqObject(updatedRequestObject);
    // this.setState({
    //   isSubmitted: true
    // });

    // <Redirect to="/owner/main" />;
  };

  onSelectChange = (event, { value }) => {
    this.setState({ stateField: value });
  };

  render() {
    if (this.state.responseObject) {
      const { data } = this.state.responseObject;
      const { _id, name } = data;
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
      <div className="form info center">
        <h1>{this.props.requestData.name}</h1>
        <Form
          className="restaurantInfo"
          autoComplete="off"
          size="mini"
          onSubmit={this.onSubmit}
        >
          <Form.Input required label="Address" name="address" />
          <Form.Group>
            <Form.Input
              className="address city"
              required
              label="City"
              name="city"
            />
            <Form.Dropdown
              className="address state"
              required
              label="State"
              name="state"
              search
              selection
              options={stateOptions}
              onChange={this.onSelectChange}
            />
            <Form.Input
              className="address zip"
              required
              type="text"
              pattern="[0-9]{5}"
              label="Zipcode"
              name="zipcode"
            />
          </Form.Group>
          <span className="field">
            <label>Phone</label>
          </span>
          <Form.Group className="phone">
            <span>(</span>
            <Form.Input
              type="tel"
              maxLength="3"
              className="phone area"
              name="areaCode"
            />
            <span>)</span>
            <Form.Input
              type="tel"
              maxLength="7"
              className="phone"
              name="phone"
            />
          </Form.Group>
          <Form.Input type="time" label="Business hours" name="hours" />
          <div style={{ textAlign: 'center' }}>
            <Form.Button color="red" content="Submit" />
          </div>
        </Form>
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
