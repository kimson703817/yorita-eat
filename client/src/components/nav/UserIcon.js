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
  <Dropdown
    className="nav-dropdown"
    button
    trigger={trigger}
    options={userOptions}
  />
);

export default UserIcon;
