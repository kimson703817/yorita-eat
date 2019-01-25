import React, { Component } from 'react';
import axios from 'axios';

import YoritaUserForm from '../utils/YoritaUserForm';

class AddRestaurantForm extends Component {
  state = {};

  onChange = (event, { name, value }) =>
    this.setState({
      [name]: value
    });

  onSubmit = async form => {
    await axios.put('/api/eatery/add', this.state);
  };

  render() {
    const formOptions = {
      onSubmit: this.onSubmit,
      onChange: null,
      fields: [
        {
          key: 'ENTER_RESTAURANT_NAME_FIELD',
          name: 'name',
          label: 'Name of your Happy Place',
          placeholder: 'Restaurant Name',
          onChange: this.onChange
        },
        {
          key: 'ENTER_RESTAURANT_ADDRESS_FIELD',
          name: 'restaurantAddress',
          label: 'address',
          placeholder: "Restaurant's Location",
          onChange: this.onChange
        }
      ]
    };

    return <YoritaUserForm options={formOptions} />;
  }
}

export default AddRestaurantForm;
