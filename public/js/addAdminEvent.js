import {
  btnShowAddAdmin,
  modalSection,
  addAdminBox,
  updateAdminBox,
  inputPhotoAddAdmin,
  photoAddAdmin,
} from './index.js';

export const addAdminEvent = () => {
  btnShowAddAdmin.addEventListener('click', () => {
    updateAdminBox.style.display = 'none';
    modalSection.style.display = 'grid';
    addAdminBox.style.display = 'grid';

    // event for input (file) change the image immediately.
    inputPhotoAddAdmin.addEventListener('change', () => {
      photoAddAdmin.src = window.URL.createObjectURL(
        inputPhotoAddAdmin.files[0]
      );
    });
  });
};
