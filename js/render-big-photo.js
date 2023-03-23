import { openBigUserPhoto } from './photo-modal.js';

const container = document.querySelector('.pictures');

const renderPreviewPhoto = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-picture-id]');

    if (!thumbnail) {
      return;
    }

    const picture = pictures.find((element) => element.id === +thumbnail.dataset.pictureId);

    if (picture) {
      openBigUserPhoto(picture);
    }

  });


};

export {renderPreviewPhoto};
