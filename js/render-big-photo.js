import { openBigPhoto } from './photo-modal.js';
//контейнер со всеми фотографиями
const container = document.querySelector('.pictures');

//Отслуживает нажатие на фото
const renderPreviewPhoto = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-picture-id]');
    //если клик не по картинке, ничего не происходит
    if (!thumbnail) {
      return;
    }

    const picture = pictures.find((element) => element.id === +thumbnail.dataset.pictureId);

    if (picture) {
      openBigPhoto(picture);
    }

  });


};

export {renderPreviewPhoto};
