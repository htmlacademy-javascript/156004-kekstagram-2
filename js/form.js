import {initScale, resetScale} from './scale.js';
import {initEffects, resetEffects} from './effects.js';
import {validateForm, resetValidation} from './validation.js';

const body = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('.img-upload__cancel');
const hashtagsField = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');

const isTextFieldFocused = () =>
  document.activeElement === hashtagsField ||
  document.activeElement === descriptionField;

const isUploadFormOpened = () =>
  !uploadOverlay.classList.contains('hidden');

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
};

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadForm.reset();
  resetScale();
  resetEffects();
  resetValidation();
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && isUploadFormOpened() && !isTextFieldFocused()) {
    evt.preventDefault();
    closeUploadForm();
  }
};

const onUploadInputChange = () => {
  openUploadForm();
};

const onCloseButtonClick = () => {
  closeUploadForm();
};

const onTextFieldKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

const onFormSubmit = (evt) => {
  const isValid = validateForm();

  if (!isValid) {
    evt.preventDefault();
  }
};

const initForm = () => {
  initScale();
  initEffects();

  uploadInput.addEventListener('change', onUploadInputChange);
  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);

  hashtagsField.addEventListener('keydown', onTextFieldKeydown);
  descriptionField.addEventListener('keydown', onTextFieldKeydown);

  uploadForm.addEventListener('submit', onFormSubmit);
};

export {initForm};
