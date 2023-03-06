import {getRandomArrayElement, getRandomInteger, createIdGenerator} from './util.js';

const PHOTOS_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const DESCRIPTIONS = [
  'Я на рыбалке',
  'Я на море',
  'Я на  концерте',
  'Сидим в кафе с приятным видом'
];
const NAMES = [
  'Никита',
  'Ира',
  'Денис',
  'Ксюша',
  'Арина',
  'Паша'
];

const generateCommentId = createIdGenerator();

const createMessage = () =>
  Array.from({ length: getRandomInteger(1,2) }, () => getRandomArrayElement(COMMENT_MESSAGES)).join(' ');

const createMessageComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessage(COMMENT_MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const generatePhotoId = createIdGenerator();
const generateUrlNumber = createIdGenerator();

const createUserPhotoDescription = () => ({
  id: generatePhotoId(),
  url: `photos/${generateUrlNumber()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: Array.from({length: getRandomInteger(1, 5)}, () => createMessageComment())
});

const createUserPhotos = () => Array.from({length: PHOTOS_COUNT}, () => createUserPhotoDescription());

export {createUserPhotos};
