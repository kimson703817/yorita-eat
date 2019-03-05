import { Container, Row, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';
// import './navbar.css';

class MainNav extends Component {
  render() {
    return (
      <div>
        <div style={{ background: 'blue' }} className="container">
          <div className="navbar-brand">Yorita Eat</div>
        </div>
        <div className="container">
          <div className="navbar navbar-expand-md navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  exact
                  to="/"
                  name="Home"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to="/discover/joy"
                  name="discover"
                >
                  Discover
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  activeClassName="active"
                  to="/trending/taste-it-while-its-hot"
                  name="trending"
                >
                  Trending
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default MainNav;
