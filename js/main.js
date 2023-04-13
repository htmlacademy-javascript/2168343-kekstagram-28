import {createUserPhotos} from './data.js';
import './form.js';
import {renderGallery} from './render-photo.js';
import {renderPreviewPhoto} from './render-big-photo.js';

const picture = createUserPhotos();

renderGallery(picture);
renderPreviewPhoto(picture);

