import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input } from 'semantic-ui-react';
import YoritaUserForm from '../../form_builders/YoritaUserForm';

import { composeReqObject } from '../../../actions';

import './css/restaurantInfoForm.css';

class RestaurantInfoForm extends Component {
  renderForm = () => {
    const submitButton = <Form.Button content="Submit" />;
    const formOptions = {
      onSubmit: this.onSubmit,
      submitButton,
      fields: [
        {
          label: 'Address',
          key: 'EDIT_RESTAURANT_STREET_ADDRESS',
          inputProps: {
            autoComplete: 'off',
            className: 'yorita input text centered',
            name: 'streetAddr',
            placeholder: "Your Restaurant's Address"
          }
        },
        {
          label: 'City',
          key: 'EDIT_RESTAURANT_CITY',
          inputProps: {
            autoComplete: 'off',
            className: 'yorita input text centered',
            name: 'city',
            placeholder: 'Tummyville'
          }
        },
        {
          label: 'State',
          key: 'EDIT_RESTAURANT_STATE',
          inputProps: {
            autoComplete: 'off',
            className: 'yorita input text centered',
            name: 'state'
          }
        },
        {
          label: 'Zipcode',
          key: 'EDIT_RESTAURANT_ZIPCODE',
          inputProps: {
            autoComplete: 'off',
            className: 'yorita input text centered',
            name: 'zipcode'
          }
        },
        {
          label: 'Area Code',
          key: 'EDIT_RESTAURANT_AREA_CODE',
          inputProps: {
            autoComplete: 'off',
            className: 'yorita input text centered',
            name: 'areaCode'
          }
        },
        {
          label: 'Phone Number',
          key: 'EDIT_RESTAURANT_PHONE_NUMBER',
          inputProps: {
            autoComplete: 'off',
            className: 'yorita input text centered',
            name: 'phone'
          }
        }
      ]
    };
    return <YoritaUserForm options={formOptions} />;
  };

  render() {
    return (
      <Form className="restaurantInfo" autoComplete="off" size="small">
        <Form.Input
          className="input centered"
          label="Address"
          name="address"
          placeholder="Your restaurant's address"
        />
        <Form.Group inline>
          <Form.Input label="City" name="city" />
          <Form.Input label="State" name="state" />
          <Form.Input label="Zipcode" name="zipcode" />
        </Form.Group>
        <Form.Input label="Area Code" name="areaCode" />
        <Form.Input label="Phone" name="phone" />
      </Form>
    );
  }
}

const mapStateToProps = ({ requestObject }) => {
  return { requestObject };
};

export default connect(
  mapStateToProps,
  { composeReqObject }
)(RestaurantInfoForm);

// (
//   <div>
//     <div>{this.props.requestObject.name}</div>
//     {this.renderForm()}
//   </div>
// );
