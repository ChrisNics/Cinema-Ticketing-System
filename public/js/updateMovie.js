import { showAlert } from './alert.js';

export const updateMovie = async (data) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/movies/',
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Update Successfully');
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
