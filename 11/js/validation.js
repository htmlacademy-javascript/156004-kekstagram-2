const uploadForm = document.querySelector('.img-upload__form');
const hashtagsField = uploadForm.querySelector('.text__hashtags');
const descriptionField = uploadForm.querySelector('.text__description');

const MAX_HASHTAGS_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 140;

const HASHTAG_REGEXP = /^#[a-zа-яё0-9]+$/i;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'pristine-error',
});

const normalizeTags = (value) =>
  value
    .trim()
    .split(/\s+/)
    .filter((tag) => tag.length > 0);

const hasValidTagsCount = (tags) =>
  tags.length <= MAX_HASHTAGS_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const isValidTag = (tag) =>
  HASHTAG_REGEXP.test(tag) &&
  tag.length <= MAX_HASHTAG_LENGTH;

const hasValidTags = (tags) =>
  tags.every(isValidTag);

const hasValidDescription = (value) =>
  value.length <= MAX_DESCRIPTION_LENGTH;

const validateHashtags = (value) => {
  if (!value.trim()) {
    return true;
  }

  const tags = normalizeTags(value);

  return (
    hasValidTagsCount(tags) &&
    hasUniqueTags(tags) &&
    hasValidTags(tags)
  );
};

const getHashtagsErrorMessage = (value) => {
  const tags = normalizeTags(value);

  if (tags.length > MAX_HASHTAGS_COUNT) {
    return 'Нельзя указать больше 5 хэштегов';
  }

  if (!hasUniqueTags(tags)) {
    return 'Хэштеги не должны повторяться';
  }

  const invalidTag = tags.find((tag) => !isValidTag(tag));

  if (invalidTag) {
    if (!invalidTag.startsWith('#')) {
      return 'Хэштег должен начинаться с #';
    }

    if (invalidTag.length > MAX_HASHTAG_LENGTH) {
      return 'Максимальная длина хэштега — 20 символов';
    }

    return 'Хэштег может содержать только буквы и числа';
  }

  return '';
};

pristine.addValidator(
  hashtagsField,
  validateHashtags,
  getHashtagsErrorMessage
);

pristine.addValidator(
  descriptionField,
  hasValidDescription,
  `Комментарий не может быть длиннее ${MAX_DESCRIPTION_LENGTH} символов`
);

const validateForm = () => pristine.validate();
const resetValidation = () => pristine.reset();

export { validateForm, resetValidation };
