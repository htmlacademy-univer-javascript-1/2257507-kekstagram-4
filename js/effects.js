const MAX_MARVIN_VALUE = 100;
const MAX_PHOBOS_VALUE = 3;
const MAX_HEAT_VALUE = 3;
const RELIX = 10;

const Slider = {
  MIN: 0,
  MAX: 100,
  STEP: 1,
  CONNECT: 'lower'
};

const PICTURE_SCALE_STEP = 25;
const PICTURE_SCALE_RATIO = 0.01;
const PictureScaleValue = {
  MAX: 100,
  MIN: 25
};

const uploadOverlay = document.querySelector('.img-upload__overlay');
const scaleControlValue = uploadOverlay.querySelector('.scale__control--value');
const picture = uploadOverlay.querySelector('.img-upload__preview').querySelector('img');
const uploadingPicture = uploadOverlay.querySelector('.img-upload__preview').querySelector('img');
const sliderValue = uploadOverlay.querySelector('.effect-level__value');
const sliderItem = uploadOverlay.querySelector('.effect-level__slider');
const sliderField = uploadOverlay.querySelector('.img-upload__effect-level');
const effectsList = uploadOverlay.querySelector('.effects__list');

let currentEffect = '';

noUiSlider.create(sliderItem, {
  range: {
    min: Slider.MIN,
    max: Slider.MAX
  },
  start: Slider.MAX,
  step: Slider.STEP,
  connect: Slider.CONNECT
});

const getEffectStep = (effectMaxValue) => effectMaxValue / Slider.MAX;

const effects = {
  none: () => {
    sliderField.classList.add('hidden');
    return 'none';
  },
  chrome: () => {
    sliderField.classList.remove('hidden');
    return `grayscale(${parseInt(sliderValue.value, RELIX) * getEffectStep(1)})`;
  },
  sepia: () => {
    sliderField.classList.remove('hidden');
    return `sepia(${parseInt(sliderValue.value, RELIX) * getEffectStep(1)})`;
  },
  marvin: () => {
    sliderField.classList.remove('hidden');
    return `invert(${parseInt(sliderValue.value, RELIX) * getEffectStep(MAX_MARVIN_VALUE)}%)`;
  },
  phobos: () => {
    sliderField.classList.remove('hidden');
    return `blur(${parseInt(sliderValue.value, RELIX) * getEffectStep(MAX_PHOBOS_VALUE)}px)`;
  },
  heat: () => {
    sliderField.classList.remove('hidden');
    const effectMin = Slider.MAX / (MAX_HEAT_VALUE - 1);
    return `brightness(${(effectMin + parseInt(sliderValue.value, RELIX)) * getEffectStep(MAX_HEAT_VALUE - 1)})`;
  }
};

const onSliderChange = () => {
  sliderValue.value = sliderItem.noUiSlider.get();

  uploadingPicture.style.filter = effects[currentEffect.replace('effects__preview--', '')]();
};

const onEffectsClick = (evt) => {
  let element = evt.target;

  if(element.classList.contains('effects__label')){
    element = element.querySelector('span');
  }

  if(element.classList.contains('effects__preview')) {
    if(currentEffect !== '') {
      uploadingPicture.classList.remove(currentEffect);
    }

    sliderItem.noUiSlider.set(Slider.MAX);
    sliderValue.value = sliderItem.noUiSlider.get();

    currentEffect = element.classList[1];
    uploadingPicture.classList.add(currentEffect);
    uploadingPicture.style.filter = effects[currentEffect.replace('effects__preview--', '')]();
  }
};

const setEffects = () => {
  currentEffect = 'effects__preview--none';

  uploadingPicture.style.filter = effects.none();

  effectsList.children[0].querySelector('input').checked = true;
};

sliderItem.noUiSlider.on('change', onSliderChange);
effectsList.addEventListener('click', onEffectsClick);

const updateScaleValueBig = () => {
  scaleControlValue.value = scaleControlValue.value.slice(0, -1) < PictureScaleValue.MAX
    ? `${+scaleControlValue.value.slice(0, -1) + PICTURE_SCALE_STEP}%`
    : `${PictureScaleValue.MAX}%`;

  picture.style.scale = +scaleControlValue.value.slice(0, -1) * PICTURE_SCALE_RATIO;
};

const updateScaleValueSmall = () => {
  scaleControlValue.value = scaleControlValue.value.slice(0, -1) > PictureScaleValue.MIN
    ? `${+scaleControlValue.value.slice(0, -1) - PICTURE_SCALE_STEP}%`
    : `${PictureScaleValue.MIN}%`;

  picture.style.scale = +scaleControlValue.value.slice(0, -1) * PICTURE_SCALE_RATIO;
};

export{setEffects, updateScaleValueBig, updateScaleValueSmall};
