// import { showAlert } from './alert';
// import axios from 'axios';
import { showAlert } from './alert.js';

export const addMovie = async (data, dateArray) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/movies/',
      data,
      dateArray,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Movie Added!');
      console.log('success', 'Sign up successfully');
      window.setTimeout(() => {
        location.assign('/');
      });
    }
  } catch (err) {
    showAlert('error', err.response.data.message);

    console.log('error', err.response.data.message);
  }
};
