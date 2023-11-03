import { getRandomInteger, getRandomArrayElement, createRandomId} from './utils.js';

const PHOTOS_COUNT = 25;

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Красивая картинка',
  'Очень красивая картинка',
  'Очень очень красивая картинка',
  'Очень * 3 красивая картинка',
  'Очень * 4 красивая картинка',
];

const NAMES = [
  'Иван',
  'Николай',
  'Дмитрий',
  'Андрей',
  'Александр',
];

function createComments (length) {
  const getCommentId = createRandomId(0, length-1);
  return function () {
    return {
      id: getCommentId(), //любое число, не повторяется
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`, //img/avatar-{{1-6}}.svg
      message: getRandomArrayElement(MESSAGES), //1-2 из messages
      name: getRandomArrayElement(NAMES) //случайное из names
    };
  };
}

const getPhotoId = createRandomId(1, 25);

function createPhotoDescriptions () {
  const randomId = getPhotoId();
  const arrayLength = getRandomInteger(0, 30);
  return {
    id: randomId, //1-25, не повторяются
    url: `photos/${randomId}.jpg`, //photos/{{i}}, 1 < i < 25, не повторяться
    description: getRandomArrayElement(DESCRIPTIONS), //придумать
    likes: getRandomInteger(15, 200), //15-200
    comments: Array.from({length: arrayLength}, createComments(arrayLength)), //кол-во: 0-30,
  };
}

const createData = () => Array.from({length: PHOTOS_COUNT}, createPhotoDescriptions);

export {createData};
