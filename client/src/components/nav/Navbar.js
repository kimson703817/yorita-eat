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
      { key: 'home', as: Link, to: '/', name: 'home' },
      { key: 'discover', as: Link, to: '/discover/joy', name: 'discover' },
      {
        key: 'trending',
        as: Link,
        to: '/trending/taste-it-while-its-hot',
        name: 'trending'
      },
      userIcon
    ];

    return (
      <Container>
        <Menu items={items} size="large" />
      </Container>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Navbar);
