import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Image, Header } from 'semantic-ui-react';

import { sendRequest } from '../../actions';

class RestaurantHomepage extends Component {
  state = {
    data: null
  };
  async componentDidMount() {
    const { params } = this.props.match;
    const { state } = this.props.location;
    if (!state) {
      const req = {
        method: 'get',
        url: `/api/eatery/${params.id}`
      };
      const res = await axios(req);
      const { data } = res;
      this.setState({ data });
    }
  }

  getData = () => {
    const { data } = this.state;
    const { state } = this.props.location;
    if (!data && state) {
      return state.data;
    }
    // console.log('outside');
    return data;
  };
  render() {
    const data = this.getData();
    if (!data) return <div>Not Found</div>;
    const { name, streetAddr, city, state, zipcode, areaCode, phone } = data;
    return (
      <Container>
        <Grid>
          <Grid.Column width={3}>
            <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
            <Header as="h2">{name} is the very best of all</Header>
            <div>{streetAddr}</div>
            <div>{`${city}, ${state} ${zipcode}`}</div>
            <div>
              {`${areaCode}`}-{`${phone.slice(0, 3)}-${phone.slice(3)}`}
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
