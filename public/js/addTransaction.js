// import { showAlert } from './alert';
// import axios from 'axios';

import { showAlert } from './alert.js';

export const addTransaction = async (
  user,
  movie,
  date,
  quantity,
  total,
  price,
  index,
  currentDateSeats,
  pushDateSeats,
  movieID
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/transactions/',
      data: {
        user,
        movie,
        date,
        quantity,
        total,
        price,
      },
    });

    const data = res.data.data.data;
    const res1 = await axios({
      method: 'POST',
      url: '/api/email',
      data: {
        data,
      },
    });

    const res2 = await axios({
      method: 'PATCH',
      url: `/api/v1/movies/${movieID}`,
      data: {
        currentDateSeats,
        pushDateSeats,
        index,
      },
    });

    if (
      res.data.status === 'success' &&
      res2.data.status === 'success' &&
      res1.data.status === 'success'
    ) {
      showAlert('success', 'Please check your email.');
      console.log('success', 'Sign up successfully');
      window.setTimeout(() => {
        location.reload();
      });
    }
  } catch (err) {
    // showAlert('error', err.response.data.message);
    console.log(err);
    console.log('error', err.response.data.message);
  }
};
