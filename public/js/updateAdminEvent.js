import {
  btnShowUpdateAdmin,
  modalSection,
  updateAdminBox,
  inputPhotoUpdateAdmin,
  photoUpdateAdmin,
} from './index.js';

export const updateAdminEvent = () => {
  btnShowUpdateAdmin.forEach((btn) => {
    btn.addEventListener('click', async () => {
      modalSection.style.display = 'grid';
      updateAdminBox.style.display = 'grid';

      inputPhotoUpdateAdmin.addEventListener('change', () => {
        photoUpdateAdmin.src = window.URL.createObjectURL(
          inputPhotoUpdateAdmin.files[0]
        );
      });

      // queing/getting the current movie based on the show-update-movie dataset
      const user = await axios({
        method: 'GET',
        url: `/api/v1/users/${btn.dataset.id}`,
      });
      console.log(user);
      // Replacing all the input placeholder with the real value
      const id = (document.getElementById('input-update-admin-id').value =
        user.data.doc._id);
      const name = (document.getElementById('input-update-admin-name').value =
        user.data.doc.name);
      const email = (document.getElementById('input-update-admin-email').value =
        user.data.doc.email);
      const password = (document.getElementById(
        'input-update-admin-password'
      ).value = user.data.doc.password);
      const photo = document.getElementById('photo-update-admin');
      photo.src = `/img/users/${user.data.doc.photo}`;
      photo.dataset.src = user.data.doc.photo;
    });
  });
};
