import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';

class Header extends Component {
  LoginButton = (
    <Menu.Item position="right" as="a" href="/auth/twitter" name="login" />
  );
  LogoutButton = (
    <Menu.Item position="right" as="a" href="/auth/logout" name="logout" />
  );

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return this.LoginButton;
      default:
        return this.LogoutButton;
    }
  }

  render() {
    return (
      <Container>
        <Menu>
          <Menu.Item as={Link} to="/" name="Home" />
          <Menu.Item as={Link} to="/discover/joy" name="Discover" />
          <Menu.Item
            as={Link}
            to="/trending/taste-it-while-its-hot"
            name="Trending"
          />

          {this.renderContent()}
        </Menu>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Header);
