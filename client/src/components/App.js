import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Navbar from './nav/Navbar';
// import OwnerWelcome from './user/owner/OwnerWelcome';
import AddRestaurantForm from './user/owner/AddRestaurantForm';
import RestaurantInfoForm from './user/owner/RestaurantInfoForm';
import RestaurantHomepage from './eatery/RestaurantHomepage';
import Order from './user/order/Order';
import Checkout from './billing/Checkout';
import Discover from './eatery/Discover';

import Home from './home/Home';

const Trending = () => <div className="container">Under Construction</div>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchOrder();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route path="/eatery/discover" component={Discover} />
            <Route path="/eatery/trending" component={Trending} />
            {/*<Route path="/owner/heartfelt-welcome" component={OwnerWelcome} />*/}
            <Route
              exact
              path="/owner/new-restaurant"
              component={AddRestaurantForm}
            />
            <Route
              exact
              path="/owner/new-restaurant/provide-info"
              component={RestaurantInfoForm}
            />
            <Route
              path="/eatery/happy-place/:id"
              component={RestaurantHomepage}
            />
            <Route exact path="/order" component={Order} />
            <Route exact path="/order/checkout" component={Checkout} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
