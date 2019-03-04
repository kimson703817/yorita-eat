import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';
import UserIcon from './UserIcon';

class Navbar extends Component {
  renderIcon() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        const loginButton = {
          key: 'home',
          position: 'right',
          as: 'a',
          href: '/auth/twitter',
          name: 'login'
        };
        return loginButton;
      default:
        const userIcon = {
          key: 'icon',
          position: 'right',
          as: 'span',
          content: <UserIcon />
        };
        return userIcon;
    }
  }

  render() {
    const userIcon = this.renderIcon();
    const items = [
      {
        key: 'homeRoute',
        as: Link,
        to: '/',
        name: 'home'
      },
      { key: 'discoverRoute', as: Link, to: '/discover/joy', name: 'discover' },
      {
        key: 'trendingRoute',
        as: Link,
        to: '/trending/taste-it-while-its-hot',
        name: 'trending'
      },
      userIcon
    ];

    return (
      <div>
        <Container textAlign="center">
          <h1>Yorita Eat</h1>
        </Container>

        <Menu className="main-nav" borderless size="large">
          <Container>
            <Menu.Item as={Link} to="/" name="home" />
            <Menu.Item as={Link} to="/discover/joy" name="discover" />
            <Menu.Item
              as={Link}
              to="/trending/taste-it-while-its-hot"
              name="trending"
            />
          </Container>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Navbar);
