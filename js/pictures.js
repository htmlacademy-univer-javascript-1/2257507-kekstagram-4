import { createData } from './data';

const createPreviews = () => {
  const picturesContainer = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesData = createData();

  const picturesFragment = document.createDocumentFragment();

  picturesData.forEach(({url, description, likes, comments}) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture_img').src = url;
    picture.querySelector('.picture_img').alt = description;
    picture.querySelector('.picture_likes').textContent = likes;
    picture.querySelector('.picture_comments').textContent = comments.length;
    picturesFragment.append(picture);
  });

  picturesContainer.append(picturesFragment);
};

export { createPreviews };
