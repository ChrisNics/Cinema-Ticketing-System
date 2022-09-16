import {
  btnShowAddMovie,
  modalSection,
  addMovieBox,
  inputPhotoAddMovie,
  photoAddMovie,
  showTakenSeats,
  seatsBox,
  selectedSeats,
  btnUpdateSeats,
} from './index.js';

export const addMovieEvent = () => {
  btnShowAddMovie.addEventListener('click', () => {
    modalSection.style.display = 'grid';
    addMovieBox.style.display = 'grid';

    // event for input (file) change the image immediately.
    inputPhotoAddMovie.addEventListener('change', () => {
      photoAddMovie.src = window.URL.createObjectURL(
        inputPhotoAddMovie.files[0]
      );
    });

    const modalDateContainer = document.querySelector(
      '.modals__date-container--add'
    );
    // creating add-icon markup
    const html = `<a href="#" id="btn-add-date"><img src="/img/add-icon.svg" alt=""/></a>`;
    modalDateContainer.insertAdjacentHTML('beforeend', html);
    //  create the event when click (creating input fields)
    const btnAddDate = document.getElementById('btn-add-date');
    let target; // Declaring target variable outside (to avoid repition of this variable since all codes after this is repetitive)
    btnAddDate.addEventListener('click', () => {
      const html = `<div class="modals__date-box">
      <input class="modals__input input-add-movie-date"  type="datetime-local" placeholder="time" required="required" />
      <a class="btn-show-seats-add" href="#"><img class="btn-show-seats-add-icon" src="/img/chair-icon.svg" alt=""/></a>
      <a href="#" class="btn-delete-seats-add">
      <img src="/img/delete-icon.svg" alt=""/></a>
      </div>`;
      btnAddDate.insertAdjacentHTML('afterend', html);

      // get all show-seats button(icon) for displaying the seat modals
      const btnShowSeatsAdd = document.querySelectorAll('.btn-show-seats-add');
      btnShowSeatsAdd.forEach((btn, i) => {
        if (i !== 0) return; // Making sure that foreach will run only once.
        btn.addEventListener('click', (e) => {
          target = e.target; // Putting e.target in target var (see the declaration in line 140)

          if (target.tagName === 'A') return; // Making sure that the user exactly clicking the button itself (img not the a tag)
          modalSection.style.display = 'grid';
          seatsBox.style.display = 'grid';
          console.log(target);
          showTakenSeats(target); // to display the taken seats in seats box

          // give the selectedseats value to target's dataset, and hide the modals
          btnUpdateSeats.addEventListener('click', (e) => {
            target.dataset.array = selectedSeats;
          });
        });
      });

      // getting all delete icon (button) to remove added fields
      const btnDeleteSeatsAdd = document.querySelectorAll(
        '.btn-delete-seats-add'
      );
      btnDeleteSeatsAdd.forEach((btn, i) => {
        if (i !== 0) return; // Making sure that foreach will run only once.
        btn.addEventListener('click', (e) => {
          target = e.target; // Putting e.target in target var (see the declaration in line 140)

          if (target.tagName === 'A') return; // Making sure that the user exactly clicking the button itself (img not the a tag)

          target.parentElement.parentElement.remove();
        });
      });
    });
  });
};
