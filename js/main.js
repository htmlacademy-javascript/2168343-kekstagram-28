import {createUserPhotos} from './data.js';
import {renderPhoto} from './renderPhoto.js';

const collectPhoto = createUserPhotos();
renderPhoto(collectPhoto);
