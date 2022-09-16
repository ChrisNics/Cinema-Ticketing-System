// import { showAlert } from './alert';
// import axios from 'axios';
import { showAlert } from './alert.js';

export const signup = async (name, email, passwordConfirm, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        passwordConfirm,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Sign up successfully');
      console.log('success', 'Sign up successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    console.log('error', err.response.data.message);
  }
};
