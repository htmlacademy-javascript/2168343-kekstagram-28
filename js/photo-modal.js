import { isEscapeKey } from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const closeBigPicture = bigPictureElement.querySelector('.big-picture__cancel');
const bigPictureImg = bigPictureElement.querySelector('.big-picture__img img');
const bigPictureAlt = bigPictureElement.querySelector('.big-picture__img img');
const likesCount = bigPictureElement.querySelector('.likes-count');
const socialCaption = bigPictureElement.querySelector('.social__caption');
const commentsCount = bigPictureElement.querySelector('.comments-count');
const socialCommentCount = bigPictureElement.querySelector('.social__comment-count');
const commentsLoader = bigPictureElement.querySelector('.comments-loader');
const socialComments = bigPictureElement.querySelector('.social__comments');
const socialComment = bigPictureElement.querySelector('.social__comment');


const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigUserPhoto();
  }
};

const renderPictureDetails = ({url, description, likes, comments}) => {
  bigPictureImg.src = url;
  bigPictureAlt.alt = description;
  likesCount.textContent = likes;
  socialCaption.textContent = description;
  commentsCount.textContent = comments.length;
};

const renderComments = (item) => {
  const commentFragment = document.createDocumentFragment();

  item.comments.forEach(({id, name, avatar, message}) => {
    const NewSocialComment = socialComment.cloneNode(true);
    NewSocialComment.querySelector('.social__picture').src = avatar;
    NewSocialComment.querySelector('.social__picture').alt = name;
    NewSocialComment.querySelector('.social__text').textContent = message;
    NewSocialComment.dataset.commentId = id;

    commentFragment.append(NewSocialComment);
  });

  socialComments.innerHTML = '';
  socialComments.append(commentFragment);

};

function openBigUserPhoto (picture) {
  bigPictureElement.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');
  renderPictureDetails(picture);
  renderComments(picture);

  document.addEventListener('keydown', onBigPictureEscKeydown);
}

function closeBigUserPhoto () {
  bigPictureElement.classList.add('hidden');
  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureEscKeydown);
}

closeBigPicture.addEventListener('click', () => {
  closeBigUserPhoto();
});

export {openBigUserPhoto,};

