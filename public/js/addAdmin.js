// import { showAlert } from './alert';
// import axios from 'axios';
import { showAlert } from './alert.js';

export const addAdmin = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/',
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Admin Added!');
      console.log('success', 'Sign up successfully');
      window.setTimeout(() => {
        location.assign('/');
      });
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    console.log(err);
    console.log('error', err.response.data.message);
  }
};
