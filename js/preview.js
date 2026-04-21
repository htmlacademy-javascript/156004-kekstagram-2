const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadFile = document.querySelector('.img-upload__input');
const previewImage = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');

const defaultPreviewSrc = previewImage.src;

const setImagePreview = (file) => {
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (!matches) {
    return;
  }

  const imageUrl = URL.createObjectURL(file);

  previewImage.src = imageUrl;

  effectsPreview.forEach((preview) => {
    preview.style.backgroundImage = `url("${imageUrl}")`;
  });
};

const resetPreview = () => {
  uploadFile.value = '';
  previewImage.src = defaultPreviewSrc;

  effectsPreview.forEach((preview) => {
    preview.style.backgroundImage = `url("${defaultPreviewSrc}")`;
  });
};

export {setImagePreview, resetPreview};
