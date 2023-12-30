const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');
const textHashtag = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

function isValidHashtag () {
  const hashtags = textHashtag.value.split(' ');
  const validHashtag = /^#[a-zа-яё0-9]{1,19}$/i;
  if (textHashtag.value === '') {
    return true;
  } else {
    return hashtags.every((hashtag) => validHashtag.test(hashtag));
  }
}

function isValidHashtagCount () {
  const hashtags = textHashtag.value.split(' ');
  return hashtags.length <= 5;
}

function notDuplicateHashtag () {
  const hashtags = textHashtag.value.split(' ');
  return hashtags.length === new Set(hashtags).size;
}

function isValidDescription () {
  return textDescription.value.length <= 140;
}

const validateForm = (evt) => {
  const pristine = new Pristine(uploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--invalid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'form__error'
  });

  pristine.addValidator(textHashtag, isValidHashtag, 'Не правильный хештег');
  pristine.addValidator(textHashtag, isValidHashtagCount, 'Превышено количество хештегов');
  pristine.addValidator(textHashtag, notDuplicateHashtag, 'Хештеги повторяются');
  pristine.addValidator(textDescription, isValidDescription, 'Превышено количество символов');

  if (!pristine.validate()) {
    evt.preventDefault();
  }
};

function onInputEscKeyDown (evt) {
  const active = document.activeElement;
  const isInput = active.tagName === 'INPUT' || active.tagName === 'TEXTAREA';
  if (evt.key === 'Escape' && isInput) {
    evt.stopPropagation();
    active.blur();
  }
}

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentEscKeyDown);
  uploadForm.addEventListener('keydown', onInputEscKeyDown);
  uploadForm.addEventListener('change', validateForm);
};

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentEscKeyDown);
  uploadForm.removeEventListener('keydown', onInputEscKeyDown);
  uploadForm.removeEventListener('change', validateForm);

  uploadInput.value = '';
  textDescription.value = '';
  textHashtag.value = '';
};

function onCloseButtonClick () {
  closeUploadForm();
}

function onDocumentEscKeyDown (evt) {
  if(evt.key === 'Escape') {
    evt.preventDefault();
    closeUploadForm();
  }
}

function uploadImg () {
  uploadInput.addEventListener('change', openUploadForm);
}

export {uploadImg};
