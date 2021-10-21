import React, { useState } from 'react';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { Link, useHistory } from 'react-router-dom';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    repassword: '',
  });

  const { name, email, password, repassword } = state;

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== repassword) {
      console.log('if in register');
      setAlert('password sould besame', 'danger');
    } else {
      register(state);
    }
  };
  // const history = useHistory();
  // if (isAuthenticated) {
  //   history.goBack();
  // }
  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type='text'
          placeholder='name'
          value={name}
          name='name'
          onChange={(e) => onChange(e)}
        />
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
        <input
          type='password'
          placeholder='re-enter password'
          value={repassword}
          name='repassword'
          onChange={(e) => onChange(e)}
        />
        <button type='submit'>Register</button>
      </form>
    </div>
  );
};

Register.protoType = {
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
