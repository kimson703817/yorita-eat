import React, { Component } from 'react';

import { Button } from 'semantic-ui-react';

class RestaurantMenu extends Component {
  render() {
    if (this.props.editMode) {
      return (
        <div style={{ width: '65rem' }}>
          <Button icon="add" />
        </div>
      );
    }

    return (
      <div style={{ background: 'blue', width: '65rem' }}>
        hello world my name is jotaro kujo yorita
      </div>
    );
  }
}

export default RestaurantMenu;
