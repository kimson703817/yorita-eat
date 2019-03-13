import axios from 'axios';
import React, { Component } from 'react';
import shortid from 'shortid';
import Octicon, { Plus } from '@githubprimer/octicons-react';

class RestaurantMenu extends Component {
  state = {
    addMode: false,
    data: [
      {
        name: 'Needle Light',
        price: 10.99
      },
      {
        name: 'Needle Light',
        price: 10.99
      },
      {
        name: 'Needle Light',
        price: 10.99
      },
      {
        name: 'Needle Light',
        price: 10.99
      },
      {
        name: 'Needle Light',
        price: 10.99
      },
      {
        name: 'Needle Light',
        price: 10.99
      },
      {
        name: 'Needle Light',
        price: 10.99
      },
      {
        name: 'Sunshine See May',
        price: 15.25
      },
      {
        name: 'Paradise',
        price: 20.0
      },
      {
        name: 'Girls in the Frontier',
        price: 50.0
      }
    ]
  };

  onAddIconClick = () => this.setState({ addMode: true });

  onMenuItemSubmit = async event => {
    event.preventDefault();
    const { name, price, imgFile } = event.target;

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
      console.log(key_img);

      await axios.put(url, imgFile.value, {
        headers: {
          'Content-Type': imgFile.accept
        }
      });

      apiRes = await axios.put('/api/eatery/menu', {
        ...requestData,
        key_img
      });
    } else {
      apiRes = await axios.put('/api/eatery/menu', requestData);
      this.props.onDataEdit(apiRes.data);
    }
    console.log(apiRes);
    this.setState({ addMode: false });
  };

  addItemForm = () => {
    return (
      <form className="card" onSubmit={this.onMenuItemSubmit}>
        <div className="card-body">
          <div className="form-group">
            <label>Item Name</label>
            <input className="form-control" name="name" />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input className="form-control" name="price" />
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
    return (
      <div key={shortid.generate()} className="card">
        <img
          className="card-img-top"
          src="http://www.wallpapermaiden.com/image/2018/11/27/yoshino-yorita-hajime-fujiwara-the-idolmaster-cinderella-girls-lying-down-27436.png"
          alt="Card image cap"
        />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <h6 className="card-text">{item.price}</h6>
        </div>
      </div>
    );
  };

  render() {
    if (this.props.editMode) {
      return (
        <div className="card-columns">
          {this.state.data.map(this.renderMenuItem)}
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

    return (
      <div className="card-columns">
        {this.state.data.map(this.renderMenuItem)}
      </div>
    );
  }
}

export default RestaurantMenu;
