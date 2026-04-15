import {photoCollection} from './data.js';
import {openBigPicture} from './popup-big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const picturesContainerFragment = document.createDocumentFragment();

const createPicture = ({url, description, comments, likes, id}) => {
  const picture = pictureTemplate.cloneNode(true);
  const img = picture.querySelector('.picture__img');
  const countLikes = picture.querySelector('.picture__likes');
  const countComments = picture.querySelector('.picture__comments');

  img.src = url;
  img.alt = description;
  countLikes.textContent = likes;
  countComments.textContent = comments.length;

  picture.dataset.pictureId = id;

  return picture;
};

photoCollection.forEach((photo) => {
  const picture = createPicture(photo);
  picturesContainerFragment.appendChild(picture);
});

picturesContainer.appendChild(picturesContainerFragment);

picturesContainer.addEventListener('click', (evt) => {
  const picture = evt.target.closest('.picture');

  if (!picture) {
    return;
  }

  evt.preventDefault();

  const pictureId = Number(picture.dataset.pictureId);
  const currentPhoto = photoCollection.find((photo) => photo.id === pictureId);

  if (!currentPhoto) {
    return;
  }

  openBigPicture(currentPhoto);
});
