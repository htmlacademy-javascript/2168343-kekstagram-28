import { openBigUserPhoto } from './photo-modal.js';


const container = document.querySelector('.pictures');

const renderPhoto = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-picture-id]');
    if (!thumbnail) {
      return;
    }

    const picture = pictures.find(
      (item) => item.id === +thumbnail.dataset.dataPictureId
    );

    openBigUserPhoto(picture);
  });


};

export {renderPhoto};
