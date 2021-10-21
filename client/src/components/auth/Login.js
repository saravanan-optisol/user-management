import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

const Login = ({ login, isAuthenticated }) => {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const { email, password } = state;

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    login({ email, password });
  };

  const history = useHistory();
  if (isAuthenticated) {
    history.push('/home');
  }

  return (
    <div className='login-form'>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type='email'
          placeholder='email'
          value={email}
          name='email'
          onChange={(e) => onChange(e)}
        />
        <input
          type='password'
          placeholder='password'
          value={password}
          name='password'
          onChange={(e) => onChange(e)}
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

Login.protoType = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);