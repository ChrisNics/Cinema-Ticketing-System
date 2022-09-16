import { forgotPassword } from './forgotPassword.js';
import { signup } from './signup.js';
import { signin } from './signin.js';
import { addAdmin } from './addAdmin.js';
import { addMovie } from './addMovie.js';
import { addTransaction } from './addTransaction.js';
import { updateMovie } from './updateMovie.js';
import { updateAdmin } from './updateAdmin.js';
import { updatePassword } from './updatePassword.js';
import { addMovieEvent } from './addMovieEvent.js';
import { addAdminEvent } from './addAdminEvent.js';
import { updateMe } from './updateMe.js';
import { updateMovieEvent } from './updateMovieEvent.js';
import { updateAdminEvent } from './updateAdminEvent.js';
import { deleteEvent } from './deleteEvent.js';
// import { showAlert } from './alert.js';
export const modalSection = document.querySelector('.modals');

const modalDateContainerUpdate = document.querySelector(
  '.modals__date-container--update'
);
const modalDateContainerAdd = document.querySelector(
  '.modals__date-container--add'
);

const btnProceed = document.getElementById('proceed');
const btnCards = document.querySelectorAll('.cards__btn');
const priceEl = document.getElementById('price');

const btnLogout = document.getElementById('btn-log-out');
const forgotForm = document.getElementById('forgot-form');
const signUpForm = document.getElementById('sign-up-form');
const signInForm = document.getElementById('sign-in-form');
const addMovieForm = document.getElementById('add-movie-form');
const addAdminForm = document.getElementById('add-admin-form');
const updateUserForm = document.getElementById('update-user-form');
const updateUserPasswordForm = document.getElementById(
  'update-password-user-form'
);

const updateMovieForm = document.getElementById('update-movie-form');
const updateAdminForm = document.getElementById('update-admin-form');
export const btnUpdateSeats = document.getElementById('update-seats');

const btnAdminManage = document.getElementById('btn-admin-manage');
const btnMovieManage = document.getElementById('btn-movie-manage');
const btnAccountManage = document.getElementById('btn-account-manage');
const btnTransactionManage = document.getElementById('btn-transaction-manage');
const adminManage = document.getElementById('admin-manage');
const movieManage = document.getElementById('movie-manage');
const accountManage = document.getElementById('account-manage');
const transactionManage = document.getElementById('transaction-manage');

// const btnAddDate = document.getElementById('btn-add-date');

const btnShowForgot = document.getElementById('btn-forgot');
const btnSignIn = document.getElementById('btn-sign-in');
const btnSignUp = document.getElementById('btn-sign-up');
const btnShowSignIn = document.getElementById('btn-show-sign-in');
const btnShowSignUp = document.getElementById('btn-show-sign-up');
export const btnShowAddMovie = document.getElementById('btn-show-add-movie');
export const btnShowAddAdmin = document.getElementById('btn-show-add-admin');
export const btnShowUpdateAdmin = document.querySelectorAll(
  '#btn-show-update-admin'
);
export const btnShowUpdateMovie = document.querySelectorAll(
  '#btn-show-update-movie'
);
export const btnDeleteMovie = document.querySelectorAll('#btn-delete-movie');
export const btnDeleteAdmin = document.querySelectorAll('#btn-delete-admin');

const signInBox = document.getElementById('sign-in-box');
const signUpBox = document.getElementById('sign-up-box');
const forgotBox = document.getElementById('forgot-box');
export const addMovieBox = document.getElementById('add-movie-box');
export const updateMovieBox = document.getElementById('update-movie-box');
export const addAdminBox = document.getElementById('add-admin-box');
export const updateAdminBox = document.getElementById('update-admin-box');
export const seatsBox = document.getElementById('seats-box');

export const inputPhotoAddMovie = document.getElementById(
  'input-add-movies-photo'
);
export const photoAddMovie = document.getElementById('photo-add-movies');
export const inputPhotoUpdateMovie = document.getElementById(
  'input-update-movies-photo'
);
export const photoUpdateMovie = document.getElementById('photo-update-movies');
export const inputPhotoAddAdmin = document.getElementById(
  'input-add-admin-photo'
);
export const photoAddAdmin = document.getElementById('photo-add-admin');
export const inputPhotoUpdateAdmin = document.getElementById(
  'input-update-admin-photo'
);
export const photoUpdateAdmin = document.getElementById('photo-update-admin');
export const inputPhotoUpdateUser = document.getElementById(
  'input-update-user-photo'
);
export const photoUpdateUser = document.getElementById('photo-update-user');

const allModalsElements = [
  modalSection,
  signInBox,
  signUpBox,
  addMovieBox,
  updateMovieBox,
  forgotBox,
];

const seatsFirstColumn = document.querySelector('.movie__seats-first-column');
const seatsSecondColumn = document.querySelector('.movie__seats-second-column');
const seatsThirdColumn = document.querySelector('.movie__seats-third-column');
const seatsFirstColumnUser = document.querySelector(
  '.movie__seats-first-column-user'
);
const seatsSecondColumnUser = document.querySelector(
  '.movie__seats-second-column-user'
);
const seatsThirdColumnUser = document.querySelector(
  '.movie__seats-third-column-user'
);

if (document.getElementById('show-password')) {
  const checkbox = document.getElementById('show-password');
  const password = document.getElementById('input-sign-in-password');
  checkbox.addEventListener('change', function () {
    if (this.checked) {
      password.type = 'text';
    } else {
      password.type = 'password';
    }
  });
}

if (document.querySelector('.search-bar__input')) {
  const input = document.querySelector('.search-bar__input');

  input.addEventListener('keyup', function myFunction() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue, cards;
    cards = document.querySelectorAll('.cards__card');
    input = document.querySelector('.search-bar__input');
    filter = input.value.toUpperCase();
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < cards.length; i++) {
      a = cards[i].dataset.title;
      txtValue = a;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        cards[i].style.display = '';
      } else {
        cards[i].style.display = 'none';
      }
    }
  });
}

for (let i = 0; i < 15; i++) {
  const html = `<img src="/img/chair-icon.svg" alt="" class="seat" data-id=${i} />`;
  seatsFirstColumn.insertAdjacentHTML('afterbegin', html);
  if (seatsFirstColumnUser)
    seatsFirstColumnUser.insertAdjacentHTML('afterbegin', html);
}

for (let i = 15; i < 30; i++) {
  const html = `<img src="/img/chair-icon.svg" alt="" class="seat" data-id=${i} />`;
  seatsSecondColumn.insertAdjacentHTML('afterbegin', html);
  if (seatsSecondColumnUser)
    seatsSecondColumnUser.insertAdjacentHTML('afterbegin', html);
}

for (let i = 30; i < 45; i++) {
  const html = `<img src="/img/chair-icon.svg" alt="" class="seat" data-id=${i} />`;
  seatsThirdColumn.insertAdjacentHTML('afterbegin', html);
  if (seatsThirdColumnUser)
    seatsThirdColumnUser.insertAdjacentHTML('afterbegin', html);
}

const seats = document.querySelectorAll('.seat');
export let selectedSeats = [];
export let selectedSeatsUser = [];

// Click event for all seats both user and admin side
seats.forEach((seat, i) => {
  seat.addEventListener('click', (e) => {
    // check of horizaontal item does exist (user side)
    if (horizontalItem) {
      console.log('horizontal');
      if (seat.classList.contains('red')) return;
      seat.classList.toggle('blue');
      if (seat.classList.contains('blue')) {
        selectedSeatsUser.push(seat.dataset.id);
        total += price;
      } else {
        total -= price;
        let index = selectedSeatsUser.indexOf(seat.dataset.id);
        if (index !== -1) {
          selectedSeatsUser.splice(index, 1);
        }
      }

      if (target) target.dataset.current = selectedSeatsUser;
      totalEl.textContent = total;
      // if horizontal item does not exist (admin side)
    } else {
      seat.classList.toggle('red');

      if (seat.classList.contains('red')) {
        selectedSeats.push(seat.dataset.id);
      } else {
        let index = selectedSeats.indexOf(seat.dataset.id);
        if (index !== -1) {
          selectedSeats.splice(index, 1);
        }
      }
    }
  });
});

// showing the taken seats (both for user side and client side)
export const showTakenSeats = (target, user) => {
  seats.forEach((seat) => {
    if (user) {
      seat.classList.remove('blue');
    }
    seat.classList.remove('red');
    if (target.dataset.array) {
      const targetArray = target.dataset.array.split(',');
      if (targetArray.includes(seat.dataset.id)) {
        seat.classList.add('red');
        selectedSeats.push(seat.dataset.id);
      }
    }
  });
};

// declaring all date element (client-side)
let horizontalItem;
let totalEl;
let price;
let total = 0;
let target;
if (
  document.getElementById('total') &&
  document.querySelectorAll('.movie__seats-horizontal-item')
) {
  horizontalItem = document.querySelectorAll('.movie__seats-horizontal-item');
  totalEl = document.getElementById('total');
  price = totalEl.dataset.price * 1;

  horizontalItem.forEach((item, i) => {
    // giving all necessary value to each item (all in dataset)
    item.dataset.index = i;
    item.addEventListener('click', (e) => {
      if (target) target.dataset.current = [];
      selectedSeatsUser = [];
      target = e.currentTarget;
      showTakenSeats(target, 'user');
      totalEl.textContent = 0;
      total = 0;
    });
  });
}

// Event when user does not pick seats or time
let warning = document.getElementById('warning-seat');
// Proceed
if (btnProceed)
  btnProceed.addEventListener('click', async () => {
    try {
      let currentItem;
      horizontalItem.forEach((item, i) => {
        if (!item.dataset.current) return;
        currentItem = item;
      });
      if (!currentItem) {
        warning.style.display = 'block';
        return;
      }
      // getting all data value from horizaontal item (current)
      const user = currentItem.dataset.userId;
      const movie = currentItem.dataset.movie;
      const date = currentItem.dataset.origDate;
      const price = priceEl.textContent * 1;
      const quantity = currentItem.dataset.current.split(',').length;
      const total = totalEl.textContent;
      const index = currentItem.dataset.index;
      const currentDateSeats = currentItem.dataset.date;
      const movieID = currentItem.dataset.movieId;
      let pushDateSeats = currentItem.dataset.current.split(',').join('-');
      pushDateSeats = currentDateSeats + '-' + pushDateSeats;

      addTransaction(
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
      );
    } catch (err) {
      console.log(err);
      console.log('error');
    }
  });

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

btnCards.forEach((btn) => {
  btn.addEventListener('click', () => {
    console.log(btn.href);
    if (btn.href === 'http://127.0.0.1:3000/#')
      modalSection.style.display = 'grid';
    signInBox.style.display = 'grid';
  });
});

// Remove modals when click
modalSection.addEventListener('click', (e) => {
  if (e.target.className === 'modals') {
    if (seatsBox.style.display === 'grid') {
      seatsBox.style.display = 'none';
    } else {
      allModalsElements.forEach((el) => {
        modalSection.style.display = 'none';
        el.style.display = 'none';
        removeAllChildNodes(modalDateContainerAdd);
        removeAllChildNodes(modalDateContainerUpdate);
      });
    }
    seats.forEach((seat) => {
      seat.classList.remove('red');
    });

    if (!photoAddMovie) photoAddMovie.src = '/img/movies/default.jpg';
    if (!inputPhotoAddMovie) inputPhotoAddMovie.value = null;
    if (!photoUpdateMovie) photoUpdateMovie.src = '/img/movies/default.jpg';
    if (!inputPhotoUpdateMovie) inputPhotoUpdateMovie.value = null;
    if (!photoAddAdmin) photoAddAdmin.src = '/img/users/default.jpg';
    if (!inputPhotoAddAdmin) inputPhotoAddAdmin.value = null;
    if (!photoUpdateAdmin) photoUpdateAdmin.src = '/img/users/default.jpg';
    if (!inputPhotoUpdateAdmin) inputPhotoUpdateAdmin.value = null;
    selectedSeats = [];
  }
});

// show sig-in modals
if (btnShowSignIn) {
  btnShowSignIn.addEventListener('click', () => {
    modalSection.style.display = 'grid';
    signInBox.style.display = 'grid';
  });

  btnSignIn.addEventListener('mouseover', () => {
    btnSignIn.style.cursor = 'pointer';
  });
  btnSignIn.addEventListener('click', () => {
    modalSection.style.display = 'grid';
    signInBox.style.display = 'grid';
    signUpBox.style.display = 'none';
  });
}
// show sign-up modals
if (btnShowSignUp) {
  btnShowSignUp.addEventListener('click', () => {
    modalSection.style.display = 'grid';
    signUpBox.style.display = 'grid';
  });

  btnSignUp.addEventListener('mouseover', () => {
    btnSignUp.style.cursor = 'pointer';
  });
  btnSignUp.addEventListener('click', () => {
    modalSection.style.display = 'grid';
    signUpBox.style.display = 'grid';
    signInBox.style.display = 'none';
  });
}

// options in sidebar (admin)
if (btnAdminManage && btnMovieManage) {
  btnAdminManage.addEventListener('click', () => {
    btnAdminManage.classList.add('gray');
    btnMovieManage.classList.remove('gray');
    adminManage.style.display = 'grid';
    movieManage.style.display = 'none';
  });
  btnMovieManage.addEventListener('click', () => {
    btnMovieManage.classList.add('gray');
    btnAdminManage.classList.remove('gray');
    movieManage.style.display = 'grid';
    adminManage.style.display = 'none';
  });
}

// options in sidebar (user)
if (btnTransactionManage && btnAccountManage) {
  btnTransactionManage.addEventListener('click', () => {
    btnTransactionManage.classList.add('gray');
    btnAccountManage.classList.remove('gray');
    transactionManage.style.display = 'grid';
    accountManage.style.display = 'none';
  });
  btnAccountManage.addEventListener('click', () => {
    btnAccountManage.classList.add('gray');
    btnTransactionManage.classList.remove('gray');
    accountManage.style.display = 'grid';
    transactionManage.style.display = 'none';
  });
}

// show add-movie modals
if (btnShowAddMovie) addMovieEvent();
// show update-movie modals
if (btnShowUpdateMovie) updateMovieEvent();
// show add-admin modals
if (btnShowAddAdmin) addAdminEvent();
// show update-admin-modals
if (btnShowUpdateAdmin) updateAdminEvent();
if (btnDeleteMovie || btnDeleteAdmin) deleteEvent();
if (btnShowForgot) {
  btnShowForgot.addEventListener('click', () => {
    signInBox.style.display = 'none';
    modalSection.style.display = 'grid';
    forgotBox.style.display = 'grid';
  });

  forgotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const forgot = document.getElementById('input-forgot-email').value;
    forgotPassword(forgot);
  });
}

// Add Movie
addMovieForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Initializing all arrays
  let dateArray = [];
  const seatsInputArray = [];
  const seatsTakenArray = [];
  const seatsInput = document.querySelectorAll('.input-add-movie-date');
  const seatsTaken = document.querySelectorAll('.btn-show-seats-add-icon');

  // push all value from date input fields
  seatsInput.forEach((val) => {
    const date = new Date(val.value);
    const compDate = `${date.getDate()} ${date.toLocaleString('default', {
      month: 'long',
    })} ${date.toLocaleTimeString()}(${val.value})`;

    seatsInputArray.push(compDate);
  });

  // push all dataset from seats icon (from seats box)
  seatsTaken.forEach((seat) => {
    if (seat.dataset.array) seatsTakenArray.push(seat.dataset.array);
  });

  // push both all seats and dates
  seatsInputArray.forEach((input, i) => {
    let taken = seatsTakenArray[i];
    if (taken) taken = taken.replace(/,/g, '-');

    dateArray.push([`${input}_${taken ? taken : ''}`]);
  });
  const form = new FormData();
  if (dateArray) form.append('dateArray', JSON.stringify(dateArray));
  form.append('title', document.getElementById('input-add-movies-title').value);
  form.append(
    'category',
    document.getElementById('input-add-movies-category').value
  );
  form.append(
    'duration',
    document.getElementById('input-add-movies-duration').value
  );
  form.append('cast', document.getElementById('input-add-movies-cast').value);
  form.append(
    'synopsis',
    document.getElementById('input-add-movies-synopsis').value
  );
  form.append('price', document.getElementById('input-add-movies-price').value);
  form.append(
    'parental',
    document.getElementById('input-add-movies-parental').value
  );
  form.append(
    'photo',
    document.getElementById('input-add-movies-photo').files[0]
  );
  addMovie(form);
  modalSection.style.display = 'none';
});

// Update Movie
updateMovieForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Initializing all arrays
  const dateArray = [];
  const seatsInputArray = [];
  const seatsTakenArray = [];
  const seatsInput = document.querySelectorAll('.input-update-movie-date');
  const seatsTaken = document.querySelectorAll('.btn-show-seats-update-icon');

  // push all value from date input fields
  seatsInput.forEach((val) => {
    const date = new Date(val.value);
    const compDate = `${date.getDate()} ${date.toLocaleString('default', {
      month: 'long',
    })} ${date.toLocaleTimeString()}(${val.value})`;

    seatsInputArray.push(compDate);
  });
  // push all dataset from seats icon (from seats box)
  seatsTaken.forEach((seat) => {
    seatsTakenArray.push(seat.dataset.array);
  });
  // push both all seats and dates
  seatsInputArray.forEach((input, i) => {
    let taken = seatsTakenArray[i];
    taken = taken.replace(/,/g, '-');
    dateArray.push([`${input}_${taken}`]);
  });

  const form = new FormData();
  if (dateArray) form.append('dateArray', JSON.stringify(dateArray));
  form.append('id', document.getElementById('input-update-movies-id').value);
  form.append(
    'title',
    document.getElementById('input-update-movies-title').value
  );
  form.append(
    'category',
    document.getElementById('input-update-movies-category').value
  );
  form.append(
    'duration',
    document.getElementById('input-update-movies-duration').value
  );
  form.append(
    'cast',
    document.getElementById('input-update-movies-cast').value
  );
  form.append(
    'synopsis',
    document.getElementById('input-update-movies-synopsis').value
  );
  form.append(
    'price',
    document.getElementById('input-update-movies-price').value
  );
  form.append(
    'parental',
    document.getElementById('input-update-movies-parental').value
  );

  if (!document.getElementById('input-update-movies-photo').files[0]) {
    form.append(
      'photo',
      document.getElementById('photo-update-movies').dataset.src
    );
  } else {
    form.append(
      'photo',
      document.getElementById('input-update-movies-photo').files[0]
    );
  }
  updateMovie(form);
  modalSection.style.display = 'none';
});

// Sign Up
signUpForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('input-sign-up-name').value;
  const email = document.getElementById('input-sign-up-email').value;
  const password = document.getElementById('input-sign-up-password').value;
  const passwordConfirm = document.getElementById(
    'input-sign-up-password-confirm'
  ).value;
  signup(name, email, passwordConfirm, password);
  modalSection.style.display = 'none';
});

// Login
signInForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('input-sign-in-email').value;
  const password = document.getElementById('input-sign-in-password').value;
  signin(email, password);
  modalSection.style.display = 'none';
});

if (btnLogout)
  btnLogout.addEventListener('click', async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: '/api/v1/users/logout',
      });

      if (res.data.status === 'success') {
        // showAlert('success', 'Sign up successfully');
        console.log('success', 'Sign up successfully');
        window.setTimeout(() => {
          location.assign('/');
        });
      }
    } catch (err) {
      // showAlert('error', err.response.data.message);

      console.log('error', err.response.data.message);
    }
  });

// Add Movie
addAdminForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const form = new FormData();
  form.append('name', document.getElementById('input-add-admin-name').value);
  form.append('email', document.getElementById('input-add-admin-email').value);
  form.append(
    'password',
    document.getElementById('input-add-admin-password').value
  );
  form.append(
    'passwordConfirm',
    document.getElementById('input-add-admin-password').value
  );
  form.append(
    'photo',
    document.getElementById('input-add-admin-photo').files[0]
  );
  form.append('role', 'admin');
  addAdmin(form);
  modalSection.style.display = 'none';
});

// Update Movie
updateAdminForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const form = new FormData();

  form.append('id', document.getElementById('input-update-admin-id').value);
  form.append('name', document.getElementById('input-update-admin-name').value);
  form.append(
    'email',
    document.getElementById('input-update-admin-email').value
  );
  form.append(
    'password',
    document.getElementById('input-update-admin-password').value
  );
  form.append(
    'passwordConfirm',
    document.getElementById('input-update-admin-password').value
  );
  form.append('role', 'admin');
  if (!document.getElementById('input-update-admin-photo').files[0]) {
    form.append(
      'photo',
      document.getElementById('photo-update-admin').dataset.src
    );
  } else {
    form.append(
      'photo',
      document.getElementById('input-update-admin-photo').files[0]
    );
  }
  updateAdmin(form);
  modalSection.style.display = 'none';
});

if (inputPhotoUpdateUser)
  inputPhotoUpdateUser.addEventListener('change', () => {
    photoUpdateUser.src = window.URL.createObjectURL(
      inputPhotoUpdateUser.files[0]
    );
  });

// Update Me
if (updateUserForm)
  updateUserForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append(
      'name',
      document.getElementById('input-update-user-name').value
    );
    form.append(
      'email',
      document.getElementById('input-update-user-email').value
    );
    if (!document.getElementById('input-update-user-photo').files[0]) {
      form.append(
        'photo',
        document.getElementById('photo-update-user').dataset.src
      );
    } else {
      form.append(
        'photo',
        document.getElementById('input-update-user-photo').files[0]
      );
    }
    updateMe(form);
    modalSection.style.display = 'none';
  });

// Update Password
if (updateUserPasswordForm)
  updateUserPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = new FormData();
    const passwordCurrent = document.getElementById(
      'input-update-user-current-password'
    ).value;
    const password = document.getElementById(
      'input-update-user-new-password'
    ).value;
    const passwordConfirm = document.getElementById(
      'input-update-user-confirm-password'
    ).value;
    password;
    updatePassword(passwordCurrent, password, passwordConfirm);
    modalSection.style.display = 'none';
  });
