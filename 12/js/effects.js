const imagePreview = document.querySelector('.img-upload__preview img');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

const EFFECTS = {
  none: {
    filter: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    isHidden: true,
  },
  chrome: {
    filter: (value) => `grayscale(${value})`,
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
  },
  sepia: {
    filter: (value) => `sepia(${value})`,
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
  },
  marvin: {
    filter: (value) => `invert(${value}%)`,
    min: 0,
    max: 100,
    step: 1,
    start: 100,
  },
  phobos: {
    filter: (value) => `blur(${value}px)`,
    min: 0,
    max: 3,
    step: 0.1,
    start: 3,
  },
  heat: {
    filter: (value) => `brightness(${value})`,
    min: 1,
    max: 3,
    step: 0.1,
    start: 3,
  },
};

let currentEffect = EFFECTS.none;

const hideSlider = () => {
  effectLevel.classList.add('hidden');
};

const showSlider = () => {
  effectLevel.classList.remove('hidden');
};

const updateSlider = () => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    step: currentEffect.step,
    start: currentEffect.start,
  });

  if (!currentEffect.isHidden) {
    effectLevelValue.value = currentEffect.start;
    imagePreview.style.filter = currentEffect.filter(currentEffect.start);
  }
};

const onEffectChange = (evt) => {
  const effectName = evt.target.value;
  currentEffect = EFFECTS[effectName];

  if (currentEffect.isHidden) {
    hideSlider();
    imagePreview.style.filter = '';
    return;
  }

  showSlider();
  updateSlider();
};

const onSliderUpdate = () => {
  const sliderValue = parseFloat(effectLevelSlider.noUiSlider.get());
  effectLevelValue.value = sliderValue;

  if (currentEffect.isHidden) {
    imagePreview.style.filter = '';
    return;
  }

  imagePreview.style.filter = currentEffect.filter(sliderValue);
};

const initEffects = () => {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: EFFECTS.none.min,
      max: EFFECTS.none.max,
    },
    start: EFFECTS.none.start,
    step: EFFECTS.none.step,
    connect: 'lower',
  });

  hideSlider();

  effectLevelSlider.noUiSlider.on('update', onSliderUpdate);

  document.querySelector('.img-upload__effects')
    .addEventListener('change', onEffectChange);
};

const resetEffects = () => {
  currentEffect = EFFECTS.none;
  imagePreview.style.filter = '';
  effectLevelValue.value = '';
  hideSlider();
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: EFFECTS.none.min,
      max: EFFECTS.none.max,
    },
    step: EFFECTS.none.step,
    start: EFFECTS.none.start,
  });
  document.querySelector('#effect-none').checked = true;
};

export {initEffects, resetEffects};
