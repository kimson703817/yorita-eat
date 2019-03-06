import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Icon } from 'semantic-ui-react';
import './css/navbar.css';

const trigger = (
  <span>
    <Icon name="user" /> Hello, Yoshino
  </span>
);

const userOptions = [
  { key: 'profile', text: 'Your Profile' },
  { key: 'account', text: 'Your Account' },
  { key: 'settings', text: 'Settings' },
  {
    key: 'goToOwner',
    as: Link,
    to: '/owner/heartfelt-welcome',
    text: 'Become An Owner'
  },
  { key: 'logout', as: 'a', href: '/auth/logout', text: 'Logout' }
];

const UserIcon = () => (
  <div className="dropdown">
    <button
      className="btn dropdown-toggle"
      type="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      Hello, User
    </button>
    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <Link to="/owner/heartfelt-welcome" className="dropdown-item">
        Become an Owner
      </Link>
    </div>
  </div>
);

export default UserIcon;
