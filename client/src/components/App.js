import axios from 'axios';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Navbar from './nav/Navbar';
import OwnerWelcome from './user/owner/OwnerWelcome';
import AddRestaurantForm from './user/owner/AddRestaurantForm';
import RestaurantInfoForm from './user/owner/RestaurantInfoForm';
import RestaurantHomepage from './eatery/RestaurantHomepage';
const Discover = () => <h2>Discover</h2>;
const Trending = () => <h2>Trending</h2>;
const Home = () => <h2>Homepage</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route path="/discover" component={Discover} />
            <Route path="/trending" component={Trending} />
            <Route path="/owner/heartfelt-welcome" component={OwnerWelcome} />
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
              render={props => {
                const { params } = props.match;
                const { state } = props.location;
                if (state) {
                  return <RestaurantHomepage {...props} />;
                }
                return <div>Not Found</div>;
                // const req = {
                //   method: 'get',
                //   url: `/api/eatery/${params.id}`
                // };
                // const res = await axios(req);
                // console.log(res);
                // if (res.status === 404) return <div>Not Found</div>;
                // const { data } = res;
                // return <RestaurantHomepage {...props} {...data} />;
              }}
            />
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
