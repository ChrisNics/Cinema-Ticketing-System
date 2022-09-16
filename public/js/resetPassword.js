export const resetPassword = async (token, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/resetPassword/${token}`,
      data: {
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === 'success') {
      // showAlert('success', 'Sign up successfully');
      console.log('success', 'Sign up successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    // showAlert('error', err.response.data.message);
    console.log(err);
    console.log('error', err.response.data.message);
  }
};
