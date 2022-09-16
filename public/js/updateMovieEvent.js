import {
  btnShowUpdateMovie,
  modalSection,
  updateMovieBox,
  inputPhotoUpdateMovie,
  photoUpdateMovie,
  showTakenSeats,
  seatsBox,
  selectedSeats,
  btnUpdateSeats,
} from './index.js';

export const updateMovieEvent = () => {
  btnShowUpdateMovie.forEach((btn) => {
    btn.addEventListener('click', async () => {
      modalSection.style.display = 'grid';
      updateMovieBox.style.display = 'grid';

      inputPhotoUpdateMovie.addEventListener('change', () => {
        photoUpdateMovie.src = window.URL.createObjectURL(
          inputPhotoUpdateMovie.files[0]
        );
      });

      // queing/getting the current movie based on the show-update-movie dataset
      const movie = await axios({
        method: 'GET',
        url: `/api/v1/movies/${btn.dataset.id}`,
      });
      let target; // declaring the target variable here (outside) to access by all (inside of this event listener)
      movie.data.doc.dateArray.forEach((date) => {
        // getting the right format for input field
        const open = date.indexOf('(') + 1;
        const close = date.indexOf(')');
        const formattedDate = date.substring(open, close);
        const seats = date.substring(date.indexOf('_') + 1);

        // getting the modal-container from html
        const modalDateContainer = document.querySelector(
          '.modals__date-container--update'
        );
        // create markup to display input fields
        const html = `
      <div class="modals__date-box">
      <input class="modals__input input-update-movie-date" type="datetime-local" placeholder="time" required="required" value=${formattedDate} />
      <a href="#" class="btn-show-seats-update" data-id><img src="/img/chair-icon.svg" alt="" class="btn-show-seats-update-icon" data-array=${seats.replace(
        /-/g,
        ','
      )} /></a><a href="#" class="btn-delete-seats-update">
      <img src="/img/delete-icon.svg" alt=""/></a>
          </div>`;

        modalDateContainer.insertAdjacentHTML('afterbegin', html);

        // get all show-seats button(icon) for displaying the seat modals (Dynamically render)
        const btnShowSeatsUpdate = document.querySelectorAll(
          '.btn-show-seats-update'
        );

        btnShowSeatsUpdate.forEach((btn, i) => {
          if (i !== 0) return; // Making sure that foreach will run only once.
          btn.addEventListener('click', async (e) => {
            target = e.target; // here we use the target variable that we initialize from the start (line 177)
            console.log(target);
            if (target.tagName === 'A') return; // Making sure that the user exactly clicking the button itself (img not the a tag)

            modalSection.style.display = 'grid';
            seatsBox.style.display = 'grid';
            showTakenSeats(target); // to display the taken seats in seats box

            // give the selectedseats value to target's dataset, and hide the modals
            btnUpdateSeats.addEventListener('click', () => {
              target.dataset.array = selectedSeats;
            });
            // selectedSeats = [];
          });
        });

        // getting all delete icon (button) to remove added fields (dynamically render)
        const btnDeleteSeatsUpdate = document.querySelectorAll(
          '.btn-delete-seats-update'
        );
        btnDeleteSeatsUpdate.forEach((btn, i) => {
          if (i !== 0) return; // Making sure that foreach will run only once.
          btn.addEventListener('click', (e) => {
            target = e.target; // Putting e.target in target var (see the declaration in line 140)

            if (target.tagName === 'A') return; // Making sure that the user exactly clicking the button itself (img not the a tag)

            target.parentElement.parentElement.remove();
          });
        });
      });

      // create again the date-container to insert add-date-icon
      const modalDateContainer = document.querySelector(
        '.modals__date-container--update'
      );
      // creating the markup
      const html = `<a href="#" id="btn-add-date"><img src="/img/add-icon.svg" alt=""/></a>`;
      modalDateContainer.insertAdjacentHTML('afterbegin', html);

      //  create the event when click (creating input fields)
      const btnAddDate = document.getElementById('btn-add-date');
      btnAddDate.addEventListener('click', () => {
        const html = `<div class="modals__date-box">
      <input class="modals__input input-update-movie-date" type="datetime-local" placeholder="time" required="required"/>
      <a href="#" class="btn-show-seats-update" data-id><img src="/img/chair-icon.svg" class="btn-show-seats-update-icon" alt=""/></a><a href="#" class="btn-show-seats-update">
      <img src="/img/delete-icon.svg" alt=""/></a>
          </div>`;
        btnAddDate.insertAdjacentHTML('afterend', html);

        // get all show-seats button(icon) for displaying the seat modals (Statically render)
        const btnShowSeatsUpdate = document.querySelectorAll(
          '.btn-show-seats-update'
        );

        btnShowSeatsUpdate.forEach((btn, i) => {
          if (i !== 0) return; // Making sure that foreach will run only once.
          btn.addEventListener('click', (e) => {
            target = e.target; // here we use the target variable

            if (target.tagName === 'A') return; // Making sure that the user exactly clicking the button itself (img not the a tag)
            modalSection.style.display = 'grid';
            seatsBox.style.display = 'grid';
            console.log(target);
            showTakenSeats(target); // to display the taken seats in seats box

            // give the selectedseats value to target's dataset, and hide the modals
            btnUpdateSeats.addEventListener('click', () => {
              target.dataset.array = selectedSeats;
            });

            // selectedSeats = [];
          });
        });

        // getting all delete icon (button) to remove added fields (statically render)
        const btnDeleteSeatsUpdate = document.querySelectorAll(
          '.btn-delete-seats-update'
        );
        btnDeleteSeatsUpdate.forEach((btn, i) => {
          if (i !== 0) return; // Making sure that foreach will run only once.
          btn.addEventListener('click', (e) => {
            target = e.target; // Putting e.target in target var (see the declaration in line 140)

            if (target.tagName === 'A') return; // Making sure that the user exactly clicking the button itself (img not the a tag)

            target.parentElement.parentElement.remove();
          });
        });
      });

      // Replacing all the input placeholder with the real value
      const id = (document.getElementById('input-update-movies-id').value =
        movie.data.doc._id);
      const title = (document.getElementById(
        'input-update-movies-title'
      ).value = movie.data.doc.title);
      const category = (document.getElementById(
        'input-update-movies-category'
      ).value = movie.data.doc.category);
      const duration = (document.getElementById(
        'input-update-movies-duration'
      ).value = movie.data.doc.duration);
      const cast = (document.getElementById('input-update-movies-cast').value =
        movie.data.doc.cast);
      const synopsis = (document.getElementById(
        'input-update-movies-synopsis'
      ).value = movie.data.doc.synopsis);
      const price = (document.getElementById(
        'input-update-movies-price'
      ).value = movie.data.doc.price);
      const parental = (document.getElementById(
        'input-update-movies-parental'
      ).value = movie.data.doc.parental);
      const photo = document.getElementById('photo-update-movies');
      photo.src = `/img/movies/${movie.data.doc.photo}`;
      photo.dataset.src = movie.data.doc.photo;
    });
  });
};
