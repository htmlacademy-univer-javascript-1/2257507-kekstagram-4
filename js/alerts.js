import { isEscapeKey } from './utils.js';

const ALERT_SHOW_TIME = 5000;

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
  } else if (isEscapeKey(evt) || evt.target === errorTemplate || evt.target === errorBtn) {
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

export { showAlert, showError, showSuccess};
