import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Container,
  Grid,
  Icon,
  Image,
  Input,
  Header
} from 'semantic-ui-react';

import { sendRequest } from '../../actions';

import './css/restaurantHomepage.css';

class RestaurantHomepage extends Component {
  state = {
    data: null,
    isHovered: false,
    editMode: false
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

  getData = field => {
    const { data } = this.state;
    const { state } = this.props.location;
    if (!data && state) {
      if (field) return state.data[field];
      return state.data;
    }
    if (field) return data[field];
    return data;
  };

  getUserId = () => {
    const { auth } = this.props;
    if (!auth) return null;
    return auth._id;
  };

  toggleMouseHover = () => {
    this.setState({ isHovered: !this.state.isHovered });
  };

  handleEditClick = () => {
    this.setState({ editMode: !this.state.editMode });
  };

  renderRestaurantIcon = () => {
    if (this.state.editMode) {
      return (
        <div className="restaurant home icon">
          <Image
            circular
            src="https://pbs.twimg.com/profile_images/1090980773270679552/iIQYFsU1_400x400.jpg"
          />
          <div className="overlay">
            <div className="table-wrapper">
              <Icon name="camera" className="edit-icon" size="huge" />
            </div>
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
      return <Input defaultValue={name} />;
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
      return <Input defaultValue={streetAddr} />;
    }
    return <div>{streetAddr}</div>;
  };

  render() {
    const data = this.getData();
    const userId = this.getUserId();
    if (!data) return <div>Not Found</div>;

    const {
      owner_id,
      name,
      streetAddr,
      city,
      state,
      zipcode,
      areaCode,
      phone
    } = data;
    return (
      <Container>
        <Grid>
          <Grid.Column width={3}>
            {/*"https://react.semantic-ui.com/images/wireframe/image.png"*/}
            {this.renderRestaurantIcon()}
            {this.renderRestaurantName()}
            {this.renderRestaurantAddress()}
            <div>{`${city}, ${state} ${zipcode}`}</div>
            <div>
              {`${areaCode}`}-{`${phone.slice(0, 3)}-${phone.slice(3)}`}
            </div>
            {owner_id === userId && (
              <Button
                className="restaurant home button edit"
                content="Edit"
                color="red"
                onClick={this.handleEditClick}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(
  mapStateToProps,
  { sendRequest }
)(RestaurantHomepage);
