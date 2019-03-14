import React, { Component } from 'react';
import Octicon, { FileMedia } from '@githubprimer/octicons-react';

import './css/restaurantIcon.css';

class RestaurantIcon extends Component {
  onFileSelect = event => {
    event.preventDefault();
    this.props.onFileSelect(event.target.files[0]);
  };

  render() {
    if (this.props.editMode) {
      return (
        <div className="restaurant-home icon">
          <img src={this.props.src} />
          <div className="overlay">
            <label htmlFor="upload" className="icon-wrapper">
              <div className="icon-center">
                <Octicon className="edit-icon" icon={FileMedia} />
              </div>
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
      <div className="restaurant-home icon">
        <img src={this.props.src} />
      </div>
    );
  }
}

export default RestaurantIcon;
