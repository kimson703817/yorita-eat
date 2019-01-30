import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

import { sendRequest } from '../../../actions';
import { stateOptions } from '../../form_builders/utils/stateOptions';

import './css/restaurantInfoForm.css';

class RestaurantInfoForm extends Component {
  state = {};
  onSubmit = async event => {
    const { address, city, zipcode, areaCode, phone } = event.target;
    const { name } = this.props.requestObject;
    const updatedRequestObject = {
      name,
      streetAddr: address.value,
      city: city.value,
      state: this.state.state,
      zipcode: zipcode.value,
      areaCode: areaCode.value,
      phone: phone.value
    };

    console.log(updatedRequestObject);

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
    this.setState({ state: value });
  };

  render() {
    if (!this.props.requestObject)
      return <Redirect to="/owner/new-restaurant" />;
    return (
      <div className="form info center">
        <h1>{this.props.requestObject.name}</h1>
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
            {/*<div className="field address zip">
                          <label>Zipcode</label>
                          <div className="ui input">
                            <input />
                          </div>
                        </div>*/}
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

const mapStateToProps = ({ requestObject }) => {
  return { requestObject };
};

export default connect(
  mapStateToProps,
  { sendRequest }
)(RestaurantInfoForm);

// (
//   <div>
//     <div>{this.props.requestObject.name}</div>
//     {this.renderForm()}
//   </div>
// );
