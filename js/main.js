import {createUserPhotos} from './data.js';
import {renderGallery} from './render-photo.js';
import {renderPhoto} from './render-big-photo.js';

renderGallery(createUserPhotos());
renderPhoto(createUserPhotos());

