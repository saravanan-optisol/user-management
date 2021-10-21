import {
    GET_ALL_USER
  } from '../actions/types';
  
  const initialState = {
      users: []
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case GET_ALL_USER:
        return {
          ...state,
          users: payload,
        };
      default:
        return state;
    }
  }
  