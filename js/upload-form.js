const PICTURE_SCALE_STEP = 25;
const PICTURE_SCALE_RATIO = 0.01;
const PictureScaleValue = {
  MAX: 100,
  MIN: 25
};
const EffectSetting = {
  NONE: {
    name: 'effect-none',
    style: '',
    unit: ''
  },
  CHROME: {
    name: 'effect-chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  SEPIA: {
    name: 'effect-sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  MARVIN: {
    name: 'effect-marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  PHOBOS: {
    name: 'effect-phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  HEAT: {
    name: 'effect-heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
};

const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');
const textHashtag = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const scaleBtnSmaller = uploadOverlay.querySelector('.scale__control--smaller');
const scaleBtnBigger = uploadOverlay.querySelector('.scale__control--bigger');
const scaleControlValue = uploadOverlay.querySelector('.scale__control--value');
const picture = uploadOverlay.querySelector('.img-upload__preview').querySelector('img');
const sliderForEffect = uploadOverlay.querySelector('.effect-level__slider');
const effectContainer = uploadOverlay.querySelector('.effects__list');
const effectLevel = uploadOverlay.querySelector('.img-upload__effect-level');
const effectlevelValue =  effectLevel.querySelector('.effect-level__value');

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

const createEffectSlider = () => {
  effectLevel.classList.add('hidden');
  noUiSlider.create(sliderForEffect, {
    range: {
      min: 0,
      max: 0,
    },
    start: 0,
    step: 1,
    connect: 'lower',
  });
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

  textDescription.addEventListener('focus', onTextAreaFocus);
  textDescription.addEventListener('blur', onTextAreaBlur);
  textHashtag.addEventListener('focus', onTagAreaFocus);
  textHashtag.addEventListener('blur', onTagAreaBlur);

  scaleBtnBigger.addEventListener('click', onPictureScaleSmallerBtnClick);
  scaleBtnSmaller.addEventListener('click', onPictureScaleBiggerBtnClick);
  effectContainer.addEventListener('change', onEffectContainerChange);

  picture.style.scale = 1;
  scaleControlValue.value = '100%';
  picture.style.filter = 'none';
  createEffectSlider();
};

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentEscKeyDown);
  uploadForm.removeEventListener('keydown', onInputEscKeyDown);
  uploadForm.removeEventListener('change', validateForm);

  textDescription.removeEventListener('focus', onTextAreaFocus);
  textDescription.removeEventListener('blur', onTextAreaBlur);
  textHashtag.removeEventListener('focus', onTagAreaFocus);
  textHashtag.removeEventListener('blur', onTagAreaBlur);

  scaleBtnBigger.removeEventListener('click', onPictureScaleSmallerBtnClick);
  scaleBtnSmaller.removeEventListener('click', onPictureScaleBiggerBtnClick);
  effectContainer.removeEventListener('change', onEffectContainerChange);

  uploadInput.value = '';
  textDescription.value = '';
  textHashtag.value = '';
  sliderForEffect.noUiSlider.destroy();
  picture.style.scale = 1;
  scaleControlValue.value = '';
  picture.style.filter = 'none';
};


function onTextAreaFocus() {
  document.removeEventListener('keydown', onDocumentEscKeyDown);
}

function onTextAreaBlur() {
  document.addEventListener('keydown', onDocumentEscKeyDown);
}

function onTagAreaFocus() {
  document.removeEventListener('keydown', onDocumentEscKeyDown);
}

function onTagAreaBlur() {
  document.addEventListener('keydown', onDocumentEscKeyDown);
}

const updateScaleValueSmall = () => {
  scaleControlValue.value = scaleControlValue.value.slice(0, -1) < PictureScaleValue.MAX
    ? `${+scaleControlValue.value.slice(0, -1) + PICTURE_SCALE_STEP}%`
    : `${PictureScaleValue.MAX}%`;

  picture.style.scale = +scaleControlValue.value.slice(0, -1) * PICTURE_SCALE_RATIO;
};

const updateScaleValueBig = () => {
  scaleControlValue.value = scaleControlValue.value.slice(0, -1) > PictureScaleValue.MIN
    ? `${+scaleControlValue.value.slice(0, -1) - PICTURE_SCALE_STEP}%`
    : `${PictureScaleValue.MIN}%`;

  picture.style.scale = +scaleControlValue.value.slice(0, -1) * PICTURE_SCALE_RATIO;
};

function onPictureScaleSmallerBtnClick() {
  updateScaleValueSmall();
}

function onPictureScaleBiggerBtnClick() {
  updateScaleValueBig();
}

const updateSlider = (effect) => {
  sliderForEffect.noUiSlider.on('update', () => {
    picture.style.filter = `${effect.style}(${sliderForEffect.noUiSlider.get()}${effect.unit})`;
    effectlevelValue.value = sliderForEffect.noUiSlider.get();
  });
  sliderForEffect.noUiSlider.updateOptions({
    range: {
      min: effect.min,
      max: effect.max
    },
    start: effect.max,
    step: effect.step
  });
};

const effectApplication = (evt) => {
  if (evt.target.id === EffectSetting.NONE) {
    picture.style.filter = 'none';
    effectLevel.classList.add('hidden');
  }
  else {
    effectLevel.classList.remove('hidden');
    if (evt.target.id === EffectSetting.CHROME.name) {
      updateSlider(EffectSetting.CHROME);
    }
    if (evt.target.id === EffectSetting.SEPIA.name) {
      updateSlider(EffectSetting.SEPIA);
    }
    if (evt.target.id === EffectSetting.MARVIN.name) {
      updateSlider(EffectSetting.MARVIN);
    }
    if (evt.target.id === EffectSetting.PHOBOS.name) {
      updateSlider(EffectSetting.PHOBOS);
    }
    if (evt.target.id === EffectSetting.HEAT.name) {
      updateSlider(EffectSetting.HEAT);
    }
  }
};

function onEffectContainerChange(evt) {
  effectApplication(evt);
}

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
