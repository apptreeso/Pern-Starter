import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStore } from '../store';
import logo from '../logo.svg';
import API from '../api/api';

// Define the main app
class Header extends React.Component {
  componentDidMount() {
    const { store } = this.props;
    if (!store.get('user')) {
      API.get('auth/me').then(({ data }) => {
        store.set('user', data);
      });
    }

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    const { store } = this.props;
    store.set('user', null);
    localStorage.removeItem('token');
  }

  render() {
    const { store } = this.props;
    const user = store.get('user');
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Welcome to React. This demo was modified to include &lt;POSTS&gt; module
          </h1>
          {user && (
            <p>
              {'Hello, '}
              {user.firstName}
              {' '}
              {user.lastName}
            </p>
          )}
          <div className="d-flex justify-content-center">
            {!user && (
              <Link to="/sign_in" className="btn btn-success mr-2">
                Sign In
              </Link>
            )}
            {!user && (
              <Link to="/sign_up" className="btn btn-success mr-2">
                Sign Up
              </Link>
            )}
            {user && (
              <button type="button" onClick={this.handleLogout} className="btn btn-danger">
                Logout
              </button>
            )}
          </div>
        </header>
      </div>
    );
  }
}

Header.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  store: PropTypes.object.isRequired,
};
export default withStore(Header);
