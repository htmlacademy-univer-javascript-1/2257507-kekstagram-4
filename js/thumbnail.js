import { onPictureClick } from './big_picture.js';

const container = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture')
  .content.querySelector('.picture');

const createThumbnail = ({ url, description, likes, comments }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  onPictureClick(thumbnail, {url, description, likes, comments});

  return thumbnail;
};

const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });

  document.querySelectorAll('.picture').forEach((picture) => container.removeChild(picture));
  container.append(fragment);
};

export { renderThumbnails };
