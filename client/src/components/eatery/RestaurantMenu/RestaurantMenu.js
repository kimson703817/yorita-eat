import React, { Component } from 'react';
import shortid from 'shortid';

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

  render() {
    if (this.props.editMode) {
      return <div>edit mode</div>;
    }

    return <div style={{ background: 'blue' }}>Menu</div>;
  }
}

export default RestaurantMenu;
