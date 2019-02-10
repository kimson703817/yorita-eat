import React, { Component } from 'react';
import { Icon, Image } from 'semantic-ui-react';

import './css/restaurantIcon.css';

class RestaurantIcon extends Component {
  onFileSelect = event => {
    this.props.onFileSelect(event.target.files[0]);
  };

  render() {
    if (this.props.editMode) {
      return (
        <div className="restaurant home icon">
          <Image circular src={this.props.src} />
          <div className="overlay">
            <label htmlFor="upload" className="icon-wrapper">
              <Icon name="image" className="edit-icon" size="huge" />
              <div className="input-file-wrapper">
                <input
                  onChange={this.onFileSelect}
                  type="file"
                  className="input-file"
                  name="iconImageFile"
                  accept="image/jpeg"
                />
              </div>
            </label>
          </div>
        </div>
      );
    }
    return (
      <Image className="restaurant home icon" circular src={this.props.src} />
    );
  }
}

export default RestaurantIcon;
