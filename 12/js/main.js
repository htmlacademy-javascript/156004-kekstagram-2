import {loadPictures} from './api.js';
import {showDataError} from './data-error.js';
import {renderPictures} from './pictures.js';
import {initFilters} from './filters.js';
import {initForm} from './form.js';

const initApp = (pictures) => {
  renderPictures(pictures);
  initFilters(pictures);
};

initForm();

loadPictures()
  .then(initApp)
  .catch(showDataError);
