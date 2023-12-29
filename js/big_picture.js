const bigPicture = document.querySelector('.big-picture');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsContainer.children[0];
const closeButton = document.querySelector('.big-picture__cancel');

const onDocumentEscKeyDown = (evt) => {
  if(evt.key === 'Escape') {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onDocumentEscKeyDown);
  }
};

closeButton.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEscKeyDown);
});

const createComment = (comment) => {
  const newComment = commentTemplate.cloneNode(true);
  const newCommentImg = newComment.querySelector('.social__picture');

  newCommentImg.alt = comment.name;
  newCommentImg.src = comment.avatar;
  newComment.querySelector('.social__text').textContent = comment.message;

  return newComment;
};

const onPictureClick = (picture, pictureData) => {
  picture.addEventListener('click', () => {
    bigPicture.classList.remove('hidden');

    bigPicture.querySelector('.big-picture__img').querySelector('img').src = pictureData.url;
    bigPicture.querySelector('.likes-count').textContent = pictureData.likes;
    bigPicture.querySelector('.comments-count').textContent = pictureData.comments.length;
    bigPicture.querySelector('.social__caption').textContent = pictureData.description;

    commentsContainer.innerHTML = '';
    pictureData.comments.forEach((comment) => {
      commentsContainer.appendChild(createComment(comment));
    });

    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
    document.body.classList.add('modal-open');

    document.addEventListener('keydown', onDocumentEscKeyDown);
  });
};

export { onPictureClick };
