const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = effectLevel.querySelector('.effect-level__slider');
const effectLevelValue = effectLevel.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const imagePreview = document.querySelector('.img-upload__preview img');

const EFFECTS = {
  none: {
    slider: {min: 0, max: 100, start: 100, step: 1},
    isHidden: true,
    filter: () => 'none'
  },
  chrome: {
    slider: {min: 0, max: 1, start: 1, step: 0.1},
    isHidden: false,
    filter: (value) => `grayscale(${value})`
  },
  sepia: {
    slider: {min: 0, max: 1, start: 1, step: 0.1},
    isHidden: false,
    filter: (value) => `sepia(${value})`
  },
  marvin: {
    slider: {min: 0, max: 100, start: 100, step: 1},
    isHidden: false,
    filter: (value) => `invert(${value}%)`
  },
  phobos: {
    slider: {min: 0, max: 3, start: 3, step: 0.1},
    isHidden: false,
    filter: (value) => `blur(${value}px)`
  },
  heat: {
    slider: {min: 1, max: 3, start: 3, step: 0.1},
    isHidden: false,
    filter: (value) => `brightness(${value})`
  }
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
      min: currentEffect.slider.min,
      max: currentEffect.slider.max,
    },
    start: currentEffect.slider.start,
    step: currentEffect.slider.step,
  });

  if (currentEffect.isHidden) {
    hideSlider();
    imagePreview.style.filter = 'none';
    effectLevelValue.value = '';
    return;
  }

  showSlider();
};

const onEffectsChange = (evt) => {
  const target = evt.target;

  if (!target.classList.contains('effects__radio')) {
    return;
  }

  currentEffect = EFFECTS[target.value];
  updateSlider();
};

const resetEffects = () => {
  currentEffect = EFFECTS.none;
  document.querySelector('#effect-none').checked = true;
  imagePreview.style.filter = 'none';
  updateSlider();
};

const initEffects = () => {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: EFFECTS.none.slider.min,
      max: EFFECTS.none.slider.max,
    },
    start: EFFECTS.none.slider.start,
    step: EFFECTS.none.slider.step,
    connect: 'lower',
  });

  hideSlider();

  effectLevelSlider.noUiSlider.on('update', () => {
    const sliderValue = effectLevelSlider.noUiSlider.get();
    effectLevelValue.value = sliderValue;

    if (currentEffect.isHidden) {
      imagePreview.style.filter = 'none';
      return;
    }

    imagePreview.style.filter = currentEffect.filter(sliderValue);
  });

  effectsList.addEventListener('change', onEffectsChange);
};

export {initEffects, resetEffects};
