import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div
        id="homepageCarousel"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#homepageCarousel"
            data-slide-to="0"
            className="active"
          />
          <li
            data-target="#homepageCarousel"
            data-slide-to="1"
            className="active"
          />
          <li
            data-target="#homepageCarousel"
            data-slide-to="2"
            className="active"
          />
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              style={{ width: '100%', height: '34rem', objectFit: 'cover' }}
              src="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="Feature 1"
            />
          </div>
          <div className="carousel-item">
            <img
              style={{ width: '100%', height: '34rem', objectFit: 'cover' }}
              src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="Feature 2"
            />
          </div>
          <div className="carousel-item">
            <img
              style={{ width: '100%', height: '34rem', objectFit: 'cover' }}
              src="https://images.pexels.com/photos/5938/food-salad-healthy-lunch.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="Feature 3"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
