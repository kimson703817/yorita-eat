import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Form } from 'semantic-ui-react';
// import axios from 'axios';

import { composeReqObject } from '../../../actions';
// import * as actions from '../../../actions';

import './css/AddRestaurantForm.css';

import YoritaUserForm from '../utils/YoritaUserForm';

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
    // await axios.put('/api/eatery/add', this.state);
    // <Redirect to="/owner/main" />;
  };

  redirectToNextStep = () => (
    <Redirect to="/owner/new-restaurant/provide-info" />
  );

  renderForm = () => {
    const submitButton = <Form.Button content="Go" />;
    const formOptions = {
      onSubmit: this.onSubmit,
      onChange: null,
      submitButton,
      fields: [
        {
          key: 'ENTER_RESTAURANT_NAME_FIELD',
          name: 'name',
          label: 'Name of your Happy Place',
          placeholder: 'Restaurant Name'
        }
      ]
    };
    return (
      <YoritaUserForm
        options={formOptions}
        formClass="ui massive form restaurant name"
        fieldClass="yorita input text centered"
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
