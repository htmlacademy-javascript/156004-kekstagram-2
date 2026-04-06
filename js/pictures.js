import {photoCollection} from './data.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const picturesContainerFragment = document.createDocumentFragment();

const createPicture = ({url, description, comments, likes}) => {
  const picture = pictureTemplate.cloneNode(true);
  const img = picture.querySelector('.picture__img');
  const countLikes = picture.querySelector('.picture__likes');
  const countComments = picture.querySelector('.picture__comments');

  img.src = url;
  countLikes.alt = description;
  countLikes.textContent = likes;
  countComments.textContent = comments.length;

  return picture;
};

photoCollection.forEach((photo) => {
  const picture = createPicture(photo);
  picturesContainerFragment.appendChild(picture);
});

picturesContainer.appendChild(picturesContainerFragment);
