import { isEscapeKey } from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const closeBigPicture = bigPictureElement.querySelector('.big-picture__cancel');

const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigUserPhoto();
  }
};

function openBigUserPhoto () {
  bigPictureElement.classList.remove('hidden');

  document.addEventListener('keydown', () => {
    onBigPictureEscKeydown();
  });
}

function closeBigUserPhoto () {
  bigPictureElement.classList.add('hidden');

  document.removeEventListener('keydown', () => {
    onBigPictureEscKeydown();
  });
  //прочая логика
}

closeBigPicture.addEventListener('click', () => {
  closeBigUserPhoto();
});

export {openBigUserPhoto};

