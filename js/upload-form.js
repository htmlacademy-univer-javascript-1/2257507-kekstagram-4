import { sendData } from './api.js';
import { isEscapeKey } from './utils.js';
import { showError, showSuccess } from './alerts.js';
import { validateForm } from './validate.js';
import { setEffects, updateScaleValueBig, updateScaleValueSmall } from './effects.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');
const textHashtag = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const submitBtn = uploadOverlay.querySelector('.img-upload__submit');

const scaleBtnSmaller = uploadOverlay.querySelector('.scale__control--smaller');
const scaleBtnBigger = uploadOverlay.querySelector('.scale__control--bigger');
const scaleControlValue = uploadOverlay.querySelector('.scale__control--value');
const picture = uploadOverlay.querySelector('.img-upload__preview').querySelector('img');
const sliderForEffect = uploadOverlay.querySelector('.effect-level__slider');
const effectItems = uploadOverlay.querySelectorAll('.effects__preview');

function onInputEscKeyDown (evt) {
  const active = document.activeElement;
  const isInput = active.tagName === 'INPUT' || active.tagName === 'TEXTAREA';
  if (isEscapeKey(evt) && isInput) {
    evt.stopPropagation();
    active.blur();
  }
}

function clearForm () {
  picture.src = '';
  effectItems.forEach((item) => {
    item.style.backgroundImage = 'none';
  });
  uploadInput.value = '';
  textDescription.value = '';
  textHashtag.value = '';
  sliderForEffect.noUiSlider.destroy();
  picture.style.scale = 1;
  scaleControlValue.value = '';
  picture.style.filter = 'none';
}

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentEscKeyDown);
  uploadForm.addEventListener('keydown', onInputEscKeyDown);
  uploadForm.addEventListener('change', validateForm);
  uploadForm.addEventListener('submit', sendForm);

  scaleBtnBigger.addEventListener('click', updateScaleValueBig);
  scaleBtnSmaller.addEventListener('click', updateScaleValueSmall);

  picture.style.scale = 1;
  scaleControlValue.value = '100%';
  picture.style.filter = 'none';
  setEffects();
};

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentEscKeyDown);
  uploadForm.removeEventListener('keydown', onInputEscKeyDown);
  uploadForm.removeEventListener('change', validateForm);
  uploadForm.removeEventListener('submit', sendForm);

  scaleBtnBigger.removeEventListener('click', updateScaleValueBig);
  scaleBtnSmaller.removeEventListener('click', updateScaleValueSmall);
};

function onCloseButtonClick () {
  closeUploadForm();
  clearForm();
}

function onDocumentEscKeyDown (evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadForm();
    clearForm();
  }
}

function uploadImg () {
  uploadInput.addEventListener('change', () => {
    const file = uploadInput.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      picture.src = URL.createObjectURL(uploadInput.files[0]);
      effectItems.forEach((item) => {
        item.style.backgroundImage = `url("${picture.src}")`;
      });
      openUploadForm();
    }
  });
}

function sendForm (evt) {
  evt.preventDefault();
  submitBtn.disabled = true;
  const formData = new FormData(evt.target);
  sendData(formData)
    .then(() => showSuccess())
    .catch((err) => showError(err.message))
    .finally(() => {
      submitBtn.disabled = false;
      closeUploadForm();
      clearForm();
    });
}

export { uploadImg, sendForm};
