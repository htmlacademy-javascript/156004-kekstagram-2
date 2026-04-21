const COMMENTS_STEP = 5;

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

let currentComments = [];
let shownCommentsCount = 0;

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

  comment.append(commentAvatar);
  comment.append(commentText);

  return comment;
};

const renderComments = () => {
  const commentsFragment = document.createDocumentFragment();
  const commentsToRender = currentComments.slice(0, shownCommentsCount);

  commentsList.innerHTML = '';

  commentsToRender.forEach((comment) => {
    commentsFragment.append(createComment(comment));
  });

  commentsList.append(commentsFragment);
  commentsShownCount.textContent = shownCommentsCount;
  commentsTotalCount.textContent = currentComments.length;

  if (shownCommentsCount >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const onCommentsLoaderClick = () => {
  shownCommentsCount = Math.min(
    shownCommentsCount + COMMENTS_STEP,
    currentComments.length
  );

  renderComments();
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

function openBigPicture({url, comments, description, likes}) {
  currentComments = comments;
  shownCommentsCount = Math.min(COMMENTS_STEP, currentComments.length);

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImage.src = url;
  bigPictureImage.alt = description;
  socialCaption.textContent = description;
  likesCount.textContent = likes;

  commentsCountBlock.classList.remove('hidden');
  renderComments();

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeBigPicture() {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  commentsList.innerHTML = '';
  currentComments = [];
  shownCommentsCount = 0;

  document.removeEventListener('keydown', onDocumentKeydown);
}

commentsLoader.addEventListener('click', onCommentsLoaderClick);
bigPictureCloseButton.addEventListener('click', closeBigPicture);

export {openBigPicture};
