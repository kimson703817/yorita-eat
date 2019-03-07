import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// import axios from 'axios';
import Octicon, { ChevronRight } from '@githubprimer/octicons-react';

import { composeReqObject } from '../../../actions';

import './css/addRestaurantForm.css';

class AddRestaurantForm extends Component {
  state = {};

  onChange = (event, { name, value }) =>
    this.setState({
      [name]: value
    });

  onSubmit = event => {
    event.preventDefault();
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
    return (
      <form onSubmit={this.onSubmit}>
        <div style={{ height: '60vh' }} className="form-row">
          <div className="align-self-center mx-auto col-3 center-inputText">
            <label className="col-form-label-lg label-top-lg">
              Enter the name of your happy place
            </label>
            <input
              className="form-control form-control-lg center-inputText mb-3"
              type="text"
              name="name"
              placeholder="Restaurant Name"
              required
              autoComplete="off"
            />
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
