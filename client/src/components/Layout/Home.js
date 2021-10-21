import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsers } from '../../actions/user';

const Home = ({auth}) => {
  return (
    <div>
      {auth.user && (
        auth.user.role === 'user' ? (
        <h2>role is: {auth.user.role}</h2>
        ) : (
          <div>
            {getUsers()}
          <h2>role is: {auth.user.role}</h2>
          <Link to='../register'>Add User</Link>
          </div>
        )
      )}
    </div>
  );
};

Home.protoType = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Home);
