const uploadForm = document.querySelector('.img-upload__form');
const textHashtag = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const submitBtn = document.querySelector('.img-upload__submit');

function isValidHashtag () {
  const hashtags = textHashtag.value.trim().split(' ');
  const validHashtag = /^#[a-zа-яё0-9]{1,19}$/i;
  if (textHashtag.value === '') {
    return true;
  } else {
    return hashtags.every((hashtag) => validHashtag.test(hashtag));
  }
}

function isValidHashtagCount () {
  const hashtags = textHashtag.value.trim().split(' ');
  return hashtags.length <= 5;
}

function notDuplicateHashtag () {
  const hashtags = textHashtag.value.trim().toLowerCase().split(' ');
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
    submitBtn.disabled = true;
  } else {
    submitBtn.disabled = false;
  }
};

export {validateForm};
