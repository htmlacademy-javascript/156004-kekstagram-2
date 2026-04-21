import {renderPictures} from './pictures.js';
import {debounce} from './util.js';

const imgFilters = document.querySelector('.img-filters');
const filterForm = document.querySelector('.img-filters__form');

const RANDOM_PICTURES_COUNT = 10;
const DEBOUNCE_DELAY = 500;

let pictures = [];

const showFilters = () => {
  imgFilters.classList.remove('img-filters--inactive');
};

const sortByComments = (pictureA, pictureB) =>
  pictureB.comments.length - pictureA.comments.length;

const getRandomPictures = (items) =>
  [...items]
    .sort(() => Math.random() - 0.5)
    .slice(0, RANDOM_PICTURES_COUNT);

const getFilteredPictures = (filterId) => {
  switch (filterId) {
    case 'filter-random':
      return getRandomPictures(pictures);
    case 'filter-discussed':
      return [...pictures].sort(sortByComments);
    case 'filter-default':
    default:
      return [...pictures];
  }
};

const debouncedRender = debounce((filteredPictures) => {
  renderPictures(filteredPictures);
}, DEBOUNCE_DELAY);

const setActiveButton = (button) => {
  const currentActiveButton = filterForm.querySelector('.img-filters__button--active');

  if (currentActiveButton) {
    currentActiveButton.classList.remove('img-filters__button--active');
  }

  button.classList.add('img-filters__button--active');
};

const onFilterClick = (evt) => {
  const button = evt.target.closest('.img-filters__button');

  if (!button) {
    return;
  }

  setActiveButton(button);
  const filteredPictures = getFilteredPictures(button.id);
  debouncedRender(filteredPictures);
};

const initFilters = (loadedPictures) => {
  pictures = [...loadedPictures];
  showFilters();
  filterForm.addEventListener('click', onFilterClick);
};

export {initFilters};
