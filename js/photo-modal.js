import { isEscapeKey } from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const closeBigPicture = bigPictureElement.querySelector('.big-picture__cancel');
const body = document.querySelector('body');

const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigUserPhoto();
  }
};

const renderPictureDetails = ({url, description, likes, comments}) => {
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
  bigPictureElement.querySelector('.comments-count').textContent = comments.length;
};

// const renderComments = ({ comments }) => {
//   bigPictureElement.querySelector('.comments-count').textContent = comments.length;

//   comments.forEach(element => {


//   });

// };

function openBigUserPhoto (picture) {
  bigPictureElement.classList.remove('hidden');
  bigPictureElement.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureElement.querySelector('.comments-loader').classList.add('hidden');
  body.classlist.add('.modal-open');
  renderPictureDetails(picture);

  document.addEventListener('keydown', () => {
    onBigPictureEscKeydown();
  });
}

function closeBigUserPhoto () {
  bigPictureElement.classList.add('hidden');
  bigPictureElement.querySelector('.social__comment-count').classList.remove('hidden');
  bigPictureElement.querySelector('.comments-loader').classList.remove('hidden');
  body.classlist.remove('.modal-open');
  document.removeEventListener('keydown', () => {
    onBigPictureEscKeydown();
  });
  //прочая логика
}

closeBigPicture.addEventListener('click', () => {
  closeBigUserPhoto();
});

export {openBigUserPhoto,};

