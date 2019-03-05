import { Container, Row, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';
// import './navbar.css';

class MainNav extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm" />
            <div style={{ textAlign: 'center' }} className="col-sm">
              <div style={{ fontSize: '2.5rem' }} className="navbar-brand">
                Yorita Eat
              </div>
            </div>
            <div style={{ textAlign: 'right' }} className="col-sm">
              <div>Sign In</div>
              <div>Register</div>
            </div>
          </div>
        </div>

        <div className="navbar navbar-expand-md navbar-light">
          <div className="container">
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
