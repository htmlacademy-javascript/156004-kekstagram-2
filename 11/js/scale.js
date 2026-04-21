const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleValueInput = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

const applyScale = (value) => {
  scaleValueInput.value = `${value}%`;
  imagePreview.style.transform = `scale(${value / 100})`;
};

const onScaleSmallerClick = () => {
  const currentValue = parseInt(scaleValueInput.value, 10);
  const newValue = Math.max(currentValue - SCALE_STEP, SCALE_MIN);
  applyScale(newValue);
};

const onScaleBiggerClick = () => {
  const currentValue = parseInt(scaleValueInput.value, 10);
  const newValue = Math.min(currentValue + SCALE_STEP, SCALE_MAX);
  applyScale(newValue);
};

const resetScale = () => {
  applyScale(SCALE_DEFAULT);
};

const initScale = () => {
  scaleSmallerButton.addEventListener('click', onScaleSmallerClick);
  scaleBiggerButton.addEventListener('click', onScaleBiggerClick);
  resetScale();
};

export {initScale, resetScale};
