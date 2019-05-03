import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import UserIcon from './UserIcon';
import './css/navbar.css';

class MainNav extends Component {
  matchWorkaround = pathname => (isMatch, location) => {
    if (isMatch) {
      return true;
    }
    console.log(`path: ${pathname}`);
    console.log(location.pathname);
    return pathname === location.pathname;
  };

  // display methods
  renderIcon = () => {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        const signInLink = (
          <ul className="nav">
            <li className="nav-item">
              <button
                type="button"
                data-toggle="modal"
                data-target="#signinModal"
                className="btn btn-sm"
              >
                Sign In
              </button>
              {this.displaySignIn()}
            </li>
            <li onClick={this.displaySignUp} className="nav-item">
              <button className="btn main-app-color btn-sm">Register</button>
            </li>
          </ul>
        );
        return signInLink;
      default:
        return <UserIcon />;
    }
  };

  displaySignIn = () => {
    return (
      <div id="signinModal" className="modal fade" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Sign in</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <input
                  type="email"
                  className="col-md-8 form-control"
                  placeholder="Username"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="col-md-8 form-control"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn main-app-color"
                data-dismiss="modal"
                onClick={this.onUserSignIn}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  displaySignUp = () => {};

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

  displayMoney = n => {
    const value = n / 100;
    return value.toFixed(2);
  };

  // Event Listeners
  onUserSignIn = () => {};

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-2" />
            <div style={{ textAlign: 'center' }} className="col-sm">
              <div style={{ fontSize: '3rem' }} className="navbar-brand">
                Yorita Eat
              </div>
            </div>
            <div className="col-sm-3">{this.renderIcon()}</div>
          </div>
        </div>

        <div className="navbar navbar-expand-md navbar-light">
          <div className="container">
            <div className="col-sm-8">
              <ul className="navbar-nav mx-auto">
                {this.renderNavLinkItem('/', 'home', 'Home')}
                {this.renderNavLinkItem(
                  '/eatery/trending',
                  'trending',
                  'Trending'
                )}
                {this.renderNavLinkItem(
                  '/eatery/discover',
                  'discover',
                  'Discover'
                )}
              </ul>
            </div>
            <div className="col-sm-3 navbar-nav">
              {this.props.itemsOrdered && (
                <NavLink
                  className="nav-link"
                  exact
                  to="/order"
                  name="order"
                  style={{ fontSize: '1.2rem' }}
                >
                  <strong>
                    Your Subtotal
                    {this.props.itemsOrdered &&
                      `: $${this.displayMoney(
                        this.props.itemsOrdered.subtotal
                      )}`}
                  </strong>
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, itemsOrdered }) => {
  return { auth, itemsOrdered };
};

export default connect(mapStateToProps)(MainNav);
