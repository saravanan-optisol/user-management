import axios from "axios";
import { setAlert } from "./alert";
import { GET_ALL_USER, AUTH_ERROR } from "./types";

// get all user
export const getUsers = () => async (dispatch) => {
    console.log('getUsers')
  try {
    const res = await axios.get('/api/user/all');
    dispatch({
      type: GET_ALL_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};