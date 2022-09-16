import { resetPassword } from './resetPassword.js';

const resetForm = document.getElementById('reset-form');
const resetBox = document.getElementById('reset-box');
const token = document.getElementById('token').dataset.token;
console.log(resetForm);

resetForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const password = document.getElementById('input-reset-password').value;
  const passwordConfirm = document.getElementById(
    'input-reset-password-confirm'
  ).value;
  resetPassword(token, password, passwordConfirm);
});
