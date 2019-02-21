import React, { Component } from 'react';
import shortid from 'shortid';

import { Button, Card, Container, Form, Grid } from 'semantic-ui-react';

class RestaurantMenu extends Component {
  state = {
    addMode: false,
    data: [
      {
        name: 'Needle Light',
        price: 10.99
      },
      {
        name: 'Sunshine See May',
        price: 15.25
      },
      {
        name: 'Paradise',
        price: 20.0
      },
      {
        name: 'Girls in the Frontier',
        price: 50.0
      }
    ]
  };

  onAddIconClick = () => this.setState({ addMode: true });

  onMenuItemSubmit = event => {
    console.log(event.target.name.value);
    console.log(event.target.price.value);
    this.setState({ addMode: false });
  };

  renderMenuItem = item => (
    <Card key={shortid.generate()} style={{ background: 'yellow' }}>
      <Card.Content>
        <Card.Header>
          {item.name} - {item.price}
        </Card.Header>
      </Card.Content>
    </Card>
  );

  renderMenu = () => {
    const { data } = this.state;
    return (
      <Card.Group itemsPerRow={3}>
        {data.map(this.renderMenuItem)}
        {this.state.addMode && (
          <Card style={{ background: 'red' }}>
            <Card.Content>
              <Form onSubmit={this.onMenuItemSubmit}>
                <Form.Input label="name" name="name" />
                <Form.Input label="price" name="price" />
                <Form.Button content="submit" />
              </Form>
            </Card.Content>
          </Card>
        )}
      </Card.Group>
    );
  };

  render() {
    if (this.props.editMode) {
      return (
        <div style={{ width: '65rem' }}>
          {this.renderMenu()}
          <Button icon="add" onClick={this.onAddIconClick} />
        </div>
      );
    }

    return (
      <Container style={{ background: 'blue' }}>{this.renderMenu()}</Container>
    );
  }
}

export default RestaurantMenu;
