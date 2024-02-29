const ALERT_SHOW_TIME = 5000;

function getRandomInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomArrayElement (elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
}

function createRandomId (a, b) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(a, b);
    if (previousValues.length >= (b - a + 1)) {
      return currentValue;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(a, b);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const isEscapeKey = (evt) => evt.key === 'Escape';

const body = document.querySelector('body');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successBtn = successTemplate.querySelector('.success__button');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorBtn = errorTemplate.querySelector('.error__button');

const closeMessage = (evt) => {
  if (isEscapeKey(evt) || evt.target === successBtn || evt.target === successTemplate){
    successBtn.removeEventListener('click', onCloseBtnClick);
    document.removeEventListener('keydown', onDocumentKeydown);
    body.removeChild(body.lastChild);
  } else if (evt.target === errorTemplate || evt.target === errorTemplate || isEscapeKey(evt)) {
    errorBtn.removeEventListener('click', onCloseBtnClick);
    document.removeEventListener('keydown', onDocumentKeydown);
    body.removeChild(body.lastChild);
  }
};

function onCloseBtnClick(evt) {
  closeMessage(evt);
}

function onDocumentClick(evt) {
  closeMessage(evt);
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage(evt);
  }
}

const showSuccess = () => {
  body.appendChild(successTemplate);
  successBtn.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

const showError = () => {
  body.appendChild(errorTemplate);
  errorBtn.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomInteger, getRandomArrayElement, createRandomId, isEscapeKey, showError, showSuccess, showAlert};
