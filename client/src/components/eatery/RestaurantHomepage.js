import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Container,
  Form,
  Grid,
  Icon,
  Input,
  Image,
  Header
} from 'semantic-ui-react';

import { sendRequest } from '../../actions';

import { stateOptions } from '../form_builders/utils/stateOptions';
import './css/restaurantHomepage.css';

class RestaurantHomepage extends Component {
  state = {
    data: null,
    isHovered: false,
    editMode: true,
    editedState: null
  };

  async componentDidMount() {
    const { params } = this.props.match;
    const { state } = this.props.location;
    if (!state) {
      const req = {
        method: 'get',
        url: `/api/eatery/${params.id}`
      };
      const res = await axios(req);
      const { data } = res;
      this.setState({ data });
    }
  }

  render() {
    const userId = this.getUserId();
    const ownerId = this.getData('owner_id');
    if (!ownerId) return <div>Not Found</div>;

    return (
      <Container>
        <Grid>
          <Grid.Column width={3}>
            {this.renderRestaurantIcon()}
            <Form size="mini" onSubmit={this.handleEditSubmit}>
              {this.renderRestaurantName()}
              {this.renderRestaurantAddress()}
              {this.renderCityStateZip()}
              {this.renderPhone()}
              {this.state.editMode && (
                <div className="restaurant home button edit">
                  <Form.Button size="tiny" color="red" content="Save" />
                </div>
              )}
              {ownerId === userId && !this.state.editMode && (
                <div className="restaurant home button edit">
                  <Button
                    content="Edit"
                    color="red"
                    onClick={this.handleEditClick}
                    size="tiny"
                  />
                </div>
              )}
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }

  // Render elements methods
  renderRestaurantIcon = () => {
    if (this.state.editMode) {
      return (
        <div className="restaurant home icon">
          <Image
            circular
            src="https://pbs.twimg.com/profile_images/1090980773270679552/iIQYFsU1_400x400.jpg"
          />
          <div className="overlay">
            <label htmlFor="upload" className="icon-wrapper">
              <Icon name="image" className="edit-icon" size="huge" />
              <div className="input-file-wrapper">
                <input
                  type="file"
                  className="input-file"
                  name="icon"
                  accept="image/jpeg"
                />
              </div>
            </label>
          </div>
        </div>
      );
    }
    return (
      <Image
        circular
        src="https://pbs.twimg.com/profile_images/1090980773270679552/iIQYFsU1_400x400.jpg"
      />
    );
  };

  renderRestaurantName = () => {
    const name = this.getData('name');

    if (this.state.editMode) {
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
  };

  renderRestaurantAddress = () => {
    const streetAddr = this.getData('streetAddr');

    if (this.state.editMode) {
      return (
        <Form.Input required defaultValue={streetAddr} name="streetAddr" />
      );
    }
    return <div>{streetAddr}</div>;
  };

  renderCityStateZip = () => {
    const { city, state, zipcode } = this.getData();

    if (this.state.editMode) {
      return (
        <div>
          <Form.Input required defaultValue={city} name="city" />
          <Form.Group className="edit state-zip">
            <Form.Dropdown
              fluid
              className="restaurant edit state"
              required
              defaultValue={state}
              name="state"
              selection
              options={stateOptions}
              onChange={this.handleStateEdit}
            />
            <Form.Input
              className="restaurant edit zip"
              required
              defaultValue={zipcode}
              name="zipcode"
            />
          </Form.Group>
        </div>
      );
    }
    return <div>{`${city}, ${state} ${zipcode}`}</div>;
  };

  renderPhone = () => {
    const { areaCode, phone } = this.getData();

    if (this.state.editMode) {
      return (
        <Form.Group className="restaurant edit phone">
          <span>(</span>
          <Form.Input
            className="area-code"
            type="tel"
            defaultValue={areaCode}
            maxLength="3"
            name="areaCode"
          />
          <span>)</span>
          <Form.Input
            className="phone"
            type="tel"
            defaultValue={phone}
            maxLength="7"
            name="phone"
          />
        </Form.Group>
      );
    }

    return (
      <div>
        {`${areaCode}`}-{`${phone.slice(0, 3)}-${phone.slice(3)}`}
      </div>
    );
  };

  // Event callback methods
  toggleMouseHover = () => {
    this.setState({ isHovered: !this.state.isHovered });
  };

  handleEditClick = () => {
    this.setState({ editMode: !this.state.editMode });
  };

  handleStateEdit = (event, { value }) => {
    this.setState({ editedState: value });
  };

  handleEditSubmit = event => {
    const { name, streetAddr, city, zipcode, areaCode, phone } = event.target;
    let state = null;
    if (this.state.editedState) state = this.state.editedState;
    else state = this.getData('state');

    const requestData = {
      name: name.value,
      streetAddr: streetAddr.value,
      city: city.value,
      state,
      zipcode: zipcode.value,
      areaCode: areaCode.value,
      phone: phone.value
    };

    console.log(requestData);
    this.setState({ editMode: false });
  };

  // Data retrieval methods
  getData = field => {
    const { data } = this.state;
    const { state } = this.props.location;
    if (!data && state) {
      if (field) return state.data[field];
      return state.data;
    }
    if (field && data) return data[field];
    return data;
  };

  getUserId = () => {
    const { auth } = this.props;
    if (!auth) return null;
    return auth._id;
  };
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(
  mapStateToProps,
  { sendRequest }
)(RestaurantHomepage);
