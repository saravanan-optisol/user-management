import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Header = ({ logout, auth: { isAuthenticated, loading, user } }) => {
  const authLinks = (
    <nav>
      <h3>Hello {user && user.username}</h3>
      <a onClick={logout} href='#!'>
        <span>logout</span>
      </a>
    </nav>
  );

  const guestLinks = (
    <nav>
      <Link to='/login'>SignIn</Link>
    </nav>
  );
  return (
    <header>
      {!loading && (
        <div className='header-nav'>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      )}
    </header>
  );
};

Header.protoType = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
