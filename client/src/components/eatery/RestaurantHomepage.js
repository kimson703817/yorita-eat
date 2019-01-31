import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Image, Header } from 'semantic-ui-react';

import { sendRequest } from '../../actions';

class RestaurantHomepage extends Component {
  componentDidMount() {
    if (this.props._id) console.log(this.props._id);
    console.log(this.props);
  }

  render() {
    const { data } = this.props.location.state;
    const {
      _id,
      name,
      streetAddr,
      city,
      state,
      zipcode,
      areaCode,
      phone
    } = data;
    return (
      <Container>
        <Grid>
          <Grid.Column width={3}>
            <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
            <Header as="h2">{name} is the very best of all</Header>
            <div>{streetAddr}</div>
            <div>{`${city}, ${state} ${zipcode}`}</div>
            <div>
              {`${areaCode}`} - {`${phone.slice(0, 3)}-${phone.slice(3)}`}
            </div>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

// const mapStateToProps = ({ responseObject }) => {
//   return { responseObject };
// };

export default connect(
  null,
  { sendRequest }
)(RestaurantHomepage);
