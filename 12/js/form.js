import {initScale, resetScale} from './scale.js';
import {initEffects, resetEffects} from './effects.js';
import {validateForm, resetValidation} from './validation.js';
import {sendPicture} from './api.js';
import {showSuccessMessage, showErrorMessage} from './messages.js';
import {setImagePreview, resetPreview} from './preview.js';

const body = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('.img-upload__cancel');
const hashtagsField = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const isTextFieldFocused = () =>
  document.activeElement === hashtagsField ||
  document.activeElement === descriptionField;

const isUploadFormOpened = () =>
  !uploadOverlay.classList.contains('hidden');

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && isUploadFormOpened() && !isTextFieldFocused()) {
    evt.preventDefault();
    closeUploadForm();
  }
}

function openUploadForm() {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUploadForm() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadForm.reset();
  resetScale();
  resetEffects();
  resetValidation();
  resetPreview();
  document.removeEventListener('keydown', onDocumentKeydown);
}

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Опубликовываю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onUploadInputChange = () => {
  const file = uploadInput.files[0];

  if (!file) {
    return;
  }

  setImagePreview(file);
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

const onFormSubmit = async (evt) => {
  evt.preventDefault();

  const isValid = validateForm();

  if (!isValid) {
    return;
  }

  try {
    blockSubmitButton();
    await sendPicture(new FormData(uploadForm));
    closeUploadForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  } finally {
    unblockSubmitButton();
  }
};

const initForm = () => {
  initScale();
  initEffects();

  uploadInput.addEventListener('change', onUploadInputChange);
  closeButton.addEventListener('click', onCloseButtonClick);

  hashtagsField.addEventListener('keydown', onTextFieldKeydown);
  descriptionField.addEventListener('keydown', onTextFieldKeydown);

  uploadForm.addEventListener('submit', onFormSubmit);
};

export {initForm};
