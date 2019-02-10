import React, { Component } from 'react';

import { Form, Header } from 'semantic-ui-react';

import './css/restaurantName.css';

class RestaurantIcon extends Component {
  render() {
    const { name } = this.props;

    if (this.props.editMode) {
      return (
        <Form.Input
          className="restaurant name edit"
          required
          defaultValue={name}
          name="name"
        />
      );
    }
    return (
      <Header className="restaurant home name" as="h2">
        {name} is the very best of all
      </Header>
    );
  }
}

export default RestaurantIcon;
