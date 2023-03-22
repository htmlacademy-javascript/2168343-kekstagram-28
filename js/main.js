import {createUserPhotos} from './data.js';
import {renderPhoto} from './render-photo.js';
import './photo-modal.js';


const collectPhoto = createUserPhotos();
renderPhoto(collectPhoto);

