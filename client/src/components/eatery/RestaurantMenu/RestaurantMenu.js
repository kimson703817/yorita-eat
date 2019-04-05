import axios from 'axios';
import React, { Component } from 'react';
import shortid from 'shortid';
import Octicon, { Plus } from '@githubprimer/octicons-react';

import MenuItem from './components/MenuItem';

class RestaurantMenu extends Component {
  state = {
    addMode: false,
    data: [],
    file: null
  };

  async componentDidMount() {
    const { restaurantId } = this.props;

    const req = {
      method: 'get',
      url: `/api/eatery/menu/${restaurantId}`
    };

    try {
      const res = await axios(req);
      const { data } = res;

      this.setState({ data });
    } catch (error) {
      this.setState({ data: false });
    }
  }

  onAddIconClick = () => this.setState({ addMode: true });

  onFileSelect = event => {
    event.preventDefault();
    this.setState({ file: event.target.files[0] });
  };

  onMenuItemSubmit = async event => {
    event.preventDefault();
    const { name, price } = event.target;
    const imgFile = this.state.file;
    const imgType = event.target.imgFile.accept;

    const requestData = {
      eateries_id: this.props.restaurantId,
      name: name.value,
      price: price.value
    };

    let apiRes;
    if (imgFile) {
      const uploadConfig = await axios.get('/api/resource/upload/image');
      const { url } = uploadConfig.data;
      const key_img = uploadConfig.data.key;

      await axios.put(url, imgFile, {
        headers: {
          'Content-Type': imgType
        }
      });

      apiRes = await axios.put('/api/eatery/menu', {
        ...requestData,
        key_img
      });
    } else {
      apiRes = await axios.put('/api/eatery/menu', requestData);
    }
    const oldMenu = this.state.data.items;
    const { cloudUrl } = this.state.data;

    let updatedMenu = [...oldMenu, apiRes.data];
    const updatedData = { items: updatedMenu, cloudUrl };

    this.setState({ data: updatedData, addMode: false, file: null });
  };

  addItemForm = () => {
    return (
      <form className="card" onSubmit={this.onMenuItemSubmit}>
        <div className="card-body">
          <div className="form-group">
            <label>Item Name</label>
            <input autoComplete="off" className="form-control" name="name" />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input autoComplete="off" className="form-control" name="price" />
          </div>
          <div className="form-group">
            <input
              onChange={this.onFileSelect}
              type="file"
              className="input-file"
              name="imgFile"
              accept="image/jpeg"
            />
          </div>
          <div className="row">
            <button
              type="submit"
              className="mx-auto btn-sm main-app-color"
              style={{ width: '4rem', border: '0' }}
            >
              <span>Submit</span>
            </button>
          </div>
        </div>
      </form>
    );
  };

  renderMenuItem = item => {
    const { cloudUrl } = this.state.data;
    const metadata = { cloudUrl, eateries_id: this.props.restaurantId };
    const active = this.props.editMode ? false : true;
    return (
      <MenuItem
        key={shortid.generate()}
        active={active}
        item={item}
        metadata={metadata}
      />
    );
  };

  render() {
    const { items } = this.state.data;

    if (!items) return <div />;

    if (this.props.editMode) {
      return (
        <div className="card-columns">
          {items.map(this.renderMenuItem)}
          {this.state.addMode ? (
            this.addItemForm()
          ) : (
            <button
              type="button"
              onClick={this.onAddIconClick}
              style={{ minWidth: '15%', border: '1' }}
            >
              <Octicon icon={Plus} />
            </button>
          )}
        </div>
      );
    }

    return <div className="card-columns">{items.map(this.renderMenuItem)}</div>;
  }
}

export default RestaurantMenu;
