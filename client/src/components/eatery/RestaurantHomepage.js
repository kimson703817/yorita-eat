import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import RestaurantInfo from './RestaurantInfo/RestaurantInfo';
import RestaurantMenu from './RestaurantMenu/RestaurantMenu';

class RestaurantHomepage extends Component {
  state = {
    data: null,
    editMode: false
  };

  async componentDidMount() {
    const { params } = this.props.match;

    const req = {
      method: 'get',
      url: `/api/eatery/${params.id}`
    };

    try {
      const res = await axios(req);
      const { data } = res;
      const user_id = this.getUserId();

      this.setState({ data: { ...data, user_id: user_id } });
    } catch (error) {
      this.setState({ data: false });
    }
  }

  // Data retrieval methods

  getUserId = () => {
    const { auth } = this.props;
    if (!auth) return null;
    return auth._id;
  };

  handleEditMode = () => {
    this.setState({ editMode: !this.state.editMode });
  };

  onDataEdit = data => {
    this.setState({ data, editMode: false });
  };

  render() {
    const { data, editMode } = this.state;
    switch (data) {
      case null:
        return null;
      case false:
        return <div>Not Found</div>;
      default:
        break;
    }

    return (
      <div className="container">
        <div className="row">
          <div style={{ marginRight: '2rem' }} className="col-md-2">
            <RestaurantInfo
              data={data}
              editMode={editMode}
              onEditClick={this.handleEditMode}
              onDataEdit={this.onDataEdit}
            />
          </div>
          <div className="col-md-8">
            <RestaurantMenu restaurantId={data.id} editMode={editMode} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(
  mapStateToProps,
  null
)(RestaurantHomepage);
