import { btnDeleteAdmin, btnDeleteMovie } from './index.js';
import { deleteItem } from './deleteItem.js';

export const deleteEvent = () => {
  // Delete selected movie if click
  btnDeleteMovie.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      console.log(e.target.dataset.id);
      deleteItem(id, 'movies');
    });
  });

  btnDeleteAdmin.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      console.log(e.target.dataset.id);
      deleteItem(id, 'users');
    });
  });
};
