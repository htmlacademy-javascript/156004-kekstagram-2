const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImage = bigPictureElement.querySelector('.big-picture__img img');
const likesCount = bigPictureElement.querySelector('.likes-count');
const commentsShownCount = bigPictureElement.querySelector('.social__comment-shown-count');
const commentsTotalCount = bigPictureElement.querySelector('.social__comment-total-count');
const commentsList = bigPictureElement.querySelector('.social__comments');
const socialCaption = bigPictureElement.querySelector('.social__caption');
const commentsCountBlock = bigPictureElement.querySelector('.social__comment-count');
const commentsLoader = bigPictureElement.querySelector('.comments-loader');
const bigPictureCloseButton = bigPictureElement.querySelector('.big-picture__cancel');

const createComment = ({avatar, name, message}) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');

  const commentAvatar = document.createElement('img');
  commentAvatar.classList.add('social__picture');
  commentAvatar.src = avatar;
  commentAvatar.alt = name;
  commentAvatar.width = 35;
  commentAvatar.height = 35;

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = message;

  comment.appendChild(commentAvatar);
  comment.appendChild(commentText);

  return comment;
};

const renderComments = (comments) => {
  commentsList.innerHTML = '';

  const commentsFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    commentsFragment.appendChild(createComment(comment));
  });

  commentsList.appendChild(commentsFragment);
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture({url, comments, description, likes}) {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureImage.src = url;
  bigPictureImage.alt = description;
  socialCaption.textContent = description;
  likesCount.textContent = likes;
  commentsTotalCount.textContent = comments.length;
  commentsShownCount.textContent = comments.length;

  renderComments(comments);

  commentsCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPicture() {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

bigPictureCloseButton.addEventListener('click', () => {
  closeBigPicture();
});

export {openBigPicture};
