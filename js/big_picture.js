/* eslint-disable no-use-before-define */
const COUNT_STEP = 5;
let commentsNumber = 0;
let currentComments = 0;

const bigPicture = document.querySelector('.big-picture');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsContainer.children[0];
const closeButton = document.querySelector('.big-picture__cancel');
const loadButton = bigPicture.querySelector('.comments-loader');
const commentsCounter = bigPicture.querySelector('.social__comment-count');
const commentsCounterTemplate = '<span class="current-comments-count"></span> из <span class="comments-count"></span> комментариев';
commentsCounter.innerHTML = commentsCounterTemplate;
const currentCommentsCounter = commentsCounter.querySelector('.current-comments-count');

const displayComments = (limit) => {
  for (let i = 0; i < limit; i++) {
    commentsContainer.children[i].classList.remove('hidden');
  }
};

const onLoadButtonClick = () => {
  if (currentComments < commentsNumber - COUNT_STEP) {
    currentComments += COUNT_STEP;
  } else {
    currentComments = commentsNumber;
    loadButton.removeEventListener('click', onLoadButtonClick);
    loadButton.classList.add('hidden');
  }
  displayComments(currentComments);
  currentCommentsCounter.textContent = currentComments;
};

const onDocumentEscKeyDown = (evt) => {
  if(evt.key === 'Escape') {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onDocumentEscKeyDown);
    closeButton.removeEventListener('click', onCloseButtonClick);
    loadButton.removeEventListener('click', onLoadButtonClick);
  }
};

const onCloseButtonClick = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEscKeyDown);
  closeButton.removeEventListener('click', onCloseButtonClick);
  loadButton.removeEventListener('click', onLoadButtonClick);
};

const createComment = (comment) => {
  const newComment = commentTemplate.cloneNode(true);
  const newCommentImg = newComment.querySelector('.social__picture');

  newCommentImg.alt = comment.name;
  newCommentImg.src = comment.avatar;
  newComment.querySelector('.social__text').textContent = comment.message;
  newComment.classList.add('hidden');

  return newComment;
};

const onPictureClick = (picture, pictureData) => {
  picture.addEventListener('click', () => {
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');

    bigPicture.querySelector('.big-picture__img').querySelector('img').src = pictureData.url;
    bigPicture.querySelector('.likes-count').textContent = pictureData.likes;
    bigPicture.querySelector('.comments-count').textContent = pictureData.comments.length;
    bigPicture.querySelector('.social__caption').textContent = pictureData.description;

    commentsContainer.innerHTML = '';
    pictureData.comments.forEach((comment) => {
      commentsContainer.appendChild(createComment(comment));
    });

    commentsNumber = pictureData.comments.length;
    if (commentsNumber > COUNT_STEP) {
      currentComments = COUNT_STEP;
      currentCommentsCounter.textContent = currentComments;
      commentsCounter.classList.remove('hidden');
      loadButton.classList.remove('hidden');
      displayComments(currentComments);
      loadButton.addEventListener('click', onLoadButtonClick);
    } else {
      displayComments(commentsNumber);
      currentCommentsCounter.textContent = commentsNumber;
      loadButton.classList.add('hidden');
    }

    document.addEventListener('keydown', onDocumentEscKeyDown);
    closeButton.addEventListener('click', onCloseButtonClick);
  });
};

export { onPictureClick };
