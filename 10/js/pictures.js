import {loadPictures} from './api.js';
import {showDataError} from './data-error.js';
import {openBigPicture} from './popup-big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createPicture = ({url, description, comments, likes}) => {
  const picture = pictureTemplate.cloneNode(true);
  const img = picture.querySelector('.picture__img');
  const countLikes = picture.querySelector('.picture__likes');
  const countComments = picture.querySelector('.picture__comments');

  img.src = url;
  img.alt = description;
  countLikes.textContent = likes;
  countComments.textContent = comments.length;

  return picture;
};

const renderPictures = (pictures) => {
  const picturesContainerFragment = document.createDocumentFragment();

  pictures.forEach((pictureData) => {
    const picture = createPicture(pictureData);

    picture.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(pictureData);
    });

    picturesContainerFragment.appendChild(picture);
  });

  picturesContainer.appendChild(picturesContainerFragment);
};

const initPictures = async () => {
  try {
    const pictures = await loadPictures();
    renderPictures(pictures);
  } catch {
    showDataError();
  }
};

export {initPictures};
