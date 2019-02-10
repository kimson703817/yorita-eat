import axios from 'axios';
import React, { Component } from 'react';

import { Button, Form } from 'semantic-ui-react';

// import { sendRequest } from '../../actions';

// import { stateOptions } from '../form_builders/utils/stateOptions';
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
      iconImageFile: null
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
    const { iconImageFile } = this.state;

    // console.log(this.props.data);
    // console.log(requestData);
    // console.log(iconImageFile.type);
    const uploadConfig = await axios.get('/api/upload/image');
    const { url } = uploadConfig.data;
    const icon_image_url = uploadConfig.data.key;

    await axios.put(url, iconImageFile, {
      headers: {
        'Content-Type': iconImageFile.type
      }
    });

    const apiRes = await axios.put('/api/eatery/update', {
      ...requestData,
      icon_image_url
    });

    this.props.onDataEdit(apiRes.data);
  };

  onIconSelect = file => {
    this.setState({ iconImageFile: file });
  };

  onStateSelect = state => {
    this.setState({ selectedState: state });
  };

  getIconSrc = () => {
    const { iconImageFile } = this.state;
    const { icon_image_url } = this.props.data;

    if (iconImageFile) return URL.createObjectURL(iconImageFile);
    return icon_image_url;
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
