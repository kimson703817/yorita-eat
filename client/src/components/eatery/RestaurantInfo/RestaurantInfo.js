import axios from 'axios';
import React, { Component } from 'react';

import './restaurantInfo.css';

import RestaurantIcon from './components/RestaurantIcon';
import RestaurantName from './components/RestaurantName';
import RestaurantAddress from './components/RestaurantAddress';
import RestaurantPhone from './components/RestaurantPhone';

class RestaurantInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedState: props.data.state,
      icon_imageFile: null
    };
  }

  handleEditClick = () => {
    this.props.onEditClick();
  };

  handleEditCancel = () => {
    this.setState({ icon_imageFile: null });
    this.props.onEditClick();
  };

  handleEditSubmit = async event => {
    event.preventDefault();
    const { name, address, city, zipcode, area_code, phone } = event.target;
    const requestData = {
      id: this.props.data.id,
      name: name.value,
      address: address.value,
      city: city.value,
      state: this.state.selectedState,
      zipcode: zipcode.value,
      area_code: area_code.value,
      phone: phone.value
    };
    const { icon_imageFile } = this.state;

    if (icon_imageFile) {
      const uploadConfig = await axios.get('/api/resource/upload/image');
      const { url } = uploadConfig.data;
      const key_icon = uploadConfig.data.key;
      const key_OLD = this.props.data.key_icon;

      await axios.put(url, icon_imageFile, {
        headers: {
          'Content-Type': icon_imageFile.type
        }
      });

      const apiRes = await axios.put('/api/eatery/update', {
        ...requestData,
        key_icon,
        key_OLD
      });
      this.props.onDataEdit(apiRes.data);
    } else {
      const apiRes = await axios.put('/api/eatery/update', requestData);
      this.props.onDataEdit(apiRes.data);
    }
  };

  onIconSelect = file => {
    this.setState({ icon_imageFile: file });
  };

  onStateSelect = state => {
    this.setState({ selectedState: state });
  };

  getIconSrc = () => {
    const { icon_imageFile } = this.state;
    const { icon_imageUrl } = this.props.data;

    if (icon_imageFile) return URL.createObjectURL(icon_imageFile);
    return icon_imageUrl;
  };

  getFullAddress = () => {
    const { data } = this.props;
    return {
      address: data.address,
      city: data.city,
      state: data.state,
      zipcode: data.zipcode
    };
  };

  getFullPhoneNumber = () => {
    const { data } = this.props;
    return {
      area_code: data.area_code,
      phone: data.phone
    };
  };

  render() {
    const { name, owner_id, user_id } = this.props.data;
    const iconSrc = this.getIconSrc();
    const address = this.getFullAddress();
    const phoneNumber = this.getFullPhoneNumber();

    if (this.props.editMode) {
      return (
        <form onSubmit={this.handleEditSubmit}>
          <RestaurantIcon
            src={iconSrc}
            onFileSelect={this.onIconSelect}
            editMode={true}
          />
          <div style={{ paddingTop: '1rem' }}>
            <RestaurantName name={name} editMode={true} />
            <RestaurantAddress
              address={address}
              editMode={true}
              onSelect={this.onStateSelect}
            />
            <RestaurantPhone phoneNumber={phoneNumber} editMode={true} />
            <div className="row">
              <div className="restaurant home button edit mx-auto">
                <button
                  type="submit"
                  className="col-md-5 mx-auto btn-sm main-app-color"
                  style={{ border: '0' }}
                >
                  <span>Save</span>
                </button>
                <button
                  type="button"
                  className="col-md-7 mx-auto btn-sm "
                  style={{ border: '0' }}
                  onClick={this.handleEditCancel}
                >
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      );
    }
    return (
      <div>
        <RestaurantIcon src={iconSrc} onFileSelect={this.onIconSelect} />
        <RestaurantName name={name} />
        <RestaurantAddress address={address} />
        <RestaurantPhone phoneNumber={phoneNumber} />
        {owner_id === user_id && !this.state.editMode && (
          <div className="restaurant home button edit">
            <button
              type="button"
              className="mx-auto btn main-app-color"
              style={{ border: '0' }}
              onClick={this.handleEditClick}
            >
              <span>edit</span>
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default RestaurantInfo;
