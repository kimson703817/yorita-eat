import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import UserIcon from './UserIcon';
import './css/navbar.css';

class MainNav extends Component {
  matchWorkaround = pathname => (isMatch, location) => {
    if (isMatch) {
      console.log(isMatch);
      return true;
    }
    console.log(`path: ${pathname}`);
    console.log(location.pathname);
    return pathname === location.pathname;
  };

  renderIcon = () => {
    switch (this.props.auth) {
      case null:
        console.log('hello');
        return;
      case false:
        console.log('not signed in');
        const signInLink = (
          <ul className="nav">
            <li className="nav-item">
              <a className="btn btn-lg" href="/auth/twitter" name="signin">
                Sign In
              </a>
            </li>
            <li className="nav-item">
              <a
                className="btn btn-secondary btn-lg"
                href="/auth/twitter"
                name="signin"
              >
                Create An Account
              </a>
            </li>
          </ul>
        );
        return signInLink;
      default:
        console.log('signed in');
        return <UserIcon />;
    }
  };

  renderNavLinkItem = (to, elementName, itemName) => (
    <li className="nav-item">
      <NavLink
        className="nav-link"
        exact
        to={to}
        name={elementName}
        style={{ fontSize: '1.5rem' }}
      >
        {itemName}
      </NavLink>
    </li>
  );

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm" />
            <div style={{ textAlign: 'center' }} className="col-sm">
              <div style={{ fontSize: '3rem' }} className="navbar-brand">
                Yorita Eat
              </div>
            </div>
            <div style={{ textAlign: 'right' }} className="col-sm">
              {this.renderIcon()}
            </div>
          </div>
        </div>

        <div className="navbar navbar-expand-md navbar-light">
          <div className="container">
            <ul className="navbar-nav mx-auto">
              {this.renderNavLinkItem('/', 'home', 'Home')}
              {this.renderNavLinkItem('/trending', 'trending', 'Trending')}
              {this.renderNavLinkItem('/discover', 'discover', 'Discover')}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(MainNav);
