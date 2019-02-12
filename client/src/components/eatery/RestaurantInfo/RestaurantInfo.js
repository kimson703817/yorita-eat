import axios from 'axios';
import React, { Component } from 'react';

import { Button, Form } from 'semantic-ui-react';

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

  handleEditSubmit = async event => {
    const { name, streetAddr, city, zipcode, areaCode, phone } = event.target;
    const requestData = {
      _id: this.props.data._id,
      name: name.value,
      streetAddr: streetAddr.value,
      city: city.value,
      state: this.state.selectedState,
      zipcode: zipcode.value,
      areaCode: areaCode.value,
      phone: phone.value
    };
    const { icon_imageFile } = this.state;

    const uploadConfig = await axios.get('/api/resource/upload/image');
    const { url } = uploadConfig.data;
    const icon_imageKey = uploadConfig.data.key;
    const old_imageKey = this.props.data.icon_imageKey;

    await axios.put(url, icon_imageFile, {
      headers: {
        'Content-Type': icon_imageFile.type
      }
    });

    const apiRes = await axios.put('/api/eatery/update', {
      ...requestData,
      icon_imageKey,
      old_imageKey
    });

    this.props.onDataEdit(apiRes.data);
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
      streetAddr: data.streetAddr,
      city: data.city,
      state: data.state,
      zipcode: data.zipcode
    };
  };

  getFullPhoneNumber = () => {
    const { data } = this.props;
    return {
      areaCode: data.areaCode,
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
        <Form size="mini" onSubmit={this.handleEditSubmit}>
          <RestaurantIcon
            src={iconSrc}
            onFileSelect={this.onIconSelect}
            editMode={true}
          />
          <RestaurantName name={name} editMode={true} />
          <RestaurantAddress
            address={address}
            editMode={true}
            onSelect={this.onStateSelect}
          />
          <RestaurantPhone phoneNumber={phoneNumber} editMode={true} />
          <div className="restaurant home button edit">
            <Form.Button size="tiny" color="red" content="Save" />
          </div>
        </Form>
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
            <Button
              content="Edit"
              color="red"
              onClick={this.handleEditClick}
              size="tiny"
            />
          </div>
        )}
      </div>
    );
  }
}

export default RestaurantInfo;
