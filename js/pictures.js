import {openBigPicture} from './popup-big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createPicture = (pictureData) => {
  const {url, description, comments, likes} = pictureData;

  const picture = pictureTemplate.cloneNode(true);
  const img = picture.querySelector('.picture__img');
  const countLikes = picture.querySelector('.picture__likes');
  const countComments = picture.querySelector('.picture__comments');

  img.src = url;
  img.alt = description;
  countLikes.textContent = likes;
  countComments.textContent = comments.length;

  picture.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(pictureData);
  });

  return picture;
};

const clearPictures = () => {
  const pictures = picturesContainer.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
};

const renderPictures = (pictures) => {
  clearPictures();

  const picturesFragment = document.createDocumentFragment();

  pictures.forEach((pictureData) => {
    const picture = createPicture(pictureData);
    picturesFragment.append(picture);
  });

  picturesContainer.append(picturesFragment);
};

export {renderPictures};
