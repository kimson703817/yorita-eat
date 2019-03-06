import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Form } from 'semantic-ui-react';
// import axios from 'axios';

import { composeReqObject } from '../../../actions';

import './css/addRestaurantForm.css';

import YoritaUserForm from '../../form_builders/YoritaUserForm';

class AddRestaurantForm extends Component {
  state = {};

  onChange = (event, { name, value }) =>
    this.setState({
      [name]: value
    });

  onSubmit = event => {
    const { value } = event.target.name;
    const requestObject = {
      name: value
    };

    this.props.composeReqObject(requestObject);
    this.setState({
      isSubmitted: true
    });
  };

  redirectToNextStep = () => (
    <Redirect to="/owner/new-restaurant/provide-info" />
  );

  renderForm = () => {
    const submitButton = <Form.Button content="Go" />;
    const formOptions = {
      onSubmit: this.onSubmit,
      submitButton: submitButton,
      fields: [
        {
          label: 'Name of your Happy Place',
          key: 'ENTER_RESTAURANT_NAME_FIELD',
          icon: 'arrow right',
          inputProps: {
            autoComplete: 'off',
            className: 'text centered',
            name: 'name',
            placeholder: 'Restaurant Name'
          }
        }
      ]
    };
    return (
      <input
        className="form-control form-control-lg"
        type="text"
        placeholder="Restaurant Name"
      />
    );
  };

  render() {
    return (
      <div>
        {!this.state.isSubmitted
          ? this.renderForm()
          : this.redirectToNextStep()}
      </div>
    );
  }
}

export default connect(
  null,
  { composeReqObject }
)(AddRestaurantForm);
