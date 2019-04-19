import axios from 'axios';
import React, { Component } from 'react';
import shortid from 'shortid';
import Octicon, { Plus } from '@githubprimer/octicons-react';

import MenuItem from './components/MenuItem';

class RestaurantMenu extends Component {
  /*
    addMode: when the owner clicks on the "Add" button, display a form to add a new menu item
    data: this restaurant's menu and app metadata.
    file: image for menu item, used during ADD MENU ITEM operation.
  */
  state = {
    addMode: false,
    data: [],
    file: null
  };

  // fetch the full menu and metadata from the database
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

  // display the form to add new menu item
  onAddIconClick = () => this.setState({ addMode: true });

  // set the currently selected image file
  onFileSelect = event => {
    event.preventDefault();
    this.setState({ file: event.target.files[0] });
  };

  // Submitting a new menu item, calling the backend API
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

    // Making asynchronous request to the app API
    try {
      let apiRes;

      // image upload operation
      if (imgFile) {
        // Retrieve UPLOAD KEYS and CONFIG from the CLOUD PROVIDER
        const uploadConfig = await axios.get('/api/resource/upload/image');
        const { url } = uploadConfig.data;
        const key_img = uploadConfig.data.key;

        // UPLOAD the image to the CLOUD PROVIDER
        await axios.put(url, imgFile, {
          headers: {
            'Content-Type': imgType
          }
        });

        // UPDATE the DATABASE with the NEW MENU ITEM and its metadata
        // API RESPONSE contains the NEW MENU ITEM
        apiRes = await axios.put('/api/eatery/menu', {
          ...requestData,
          key_img
        });
      } else {
        // if no image file specified, UPDATE DATABASE without the IMAGE KEY
        apiRes = await axios.put('/api/eatery/menu', requestData);
      }

      // Copy the old menu to create a NEW MENU ARRAY
      const oldMenu = this.state.data.items;
      const { cloudUrl } = this.state.data;
      let updatedMenu = [...oldMenu, apiRes.data];

      // new DATA object for the component's STATE
      const updatedData = { items: updatedMenu, cloudUrl };

      // update the component's STATE
      this.setState({ data: updatedData, addMode: false, file: null });
    } catch (err) {
      console.log(err);
    }
  };

  // JSX for the NEW ITEM FORM
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

  // render a single menu item in the array
  renderMenuItem = item => {
    const { cloudUrl } = this.state.data;
    // metadata for use in the shopping cart and database query
    const metadata = { cloudUrl, eateries_id: this.props.restaurantId };

    // if owner is editting, the "Order" button will not be active only for the OWNER
    // <MenuItem /> will instead display an edit button when it is not active
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

    // If the owner is editing, display a plus icon to ADD ITEM
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

    // During normal operation, render all menu items in the array
    return <div className="card-columns">{items.map(this.renderMenuItem)}</div>;
  }
}

export default RestaurantMenu;
