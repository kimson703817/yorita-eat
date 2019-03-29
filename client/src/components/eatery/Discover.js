import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';

import { NavLink } from 'react-router-dom';

import './css/discover.css';

class Discover extends Component {
  state = {
    data: null
  };

  async componentDidMount() {
    const res = await axios.get('/api/eatery');
    this.setState({ data: res.data });
  }

  renderRestaurants = item => {
    const { id, key_icon, name, address, city, state, zipcode } = item;
    return (
      <NavLink
        className="custom-card"
        to={`/eatery/happy-place/${id}`}
        key={shortid.generate()}
      >
        <div className="card">
          <div className="d-flex flex-row">
            <img
              className="card-img-top"
              style={{
                height: '7.5rem',
                width: '10rem',
                objectFit: 'scale-down'
              }}
              src={
                key_icon
                  ? `${process.env.REACT_APP_S3_URL}/${key_icon}`
                  : process.env.REACT_APP_EATERY_ICON_DEFAULT
              }
              alt="dish"
            />
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <h6 className="card-text">
                {address}, {city}, {state}, {zipcode}
              </h6>
            </div>
          </div>
        </div>
      </NavLink>
    );
  };

  render() {
    if (!this.state.data) return <div />;
    return (
      <div className="container">
        {this.state.data.map(this.renderRestaurants)}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, itemsOrdered }) => {
  return { auth, itemsOrdered };
};

export default connect(
  mapStateToProps,
  null
)(Discover);
