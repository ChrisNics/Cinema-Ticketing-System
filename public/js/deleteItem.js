// import { showAlert } from './alert';
// import axios from 'axios';
import { showAlert } from './alert.js';

export const deleteItem = async (id, item) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/${item}/${id}`,
      data: {
        id,
      },
    });

    console.log(res);
    if (res.status === 204) {
      showAlert('success', 'Deleted Successfully!');
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
