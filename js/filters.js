import {debounce, sortRandom, sortByComments} from './utils.js';

const MAX_RANDOM_CARD = 10;

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSS: 'filter-discussed'
};

const filtersContainer = document.querySelector('.img-filters');
const filtersForm = filtersContainer.querySelector('.img-filters__form');

let pictures = null;
let activeFilter = Filter.DEFAULT;
let callback = null;

const filterFunction = {
  [Filter.DEFAULT]: () => pictures,
  [Filter.RANDOM]: () => pictures.slice().sort(sortRandom).slice(0, MAX_RANDOM_CARD),
  [Filter.DISCUSS]: () => pictures.slice().sort(sortByComments)
};

function onFiltersContainerClick (evt) {
  const id = evt.target.id;
  if (id && id !== activeFilter) {
    filtersForm.querySelector(`#${activeFilter}`).classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    activeFilter = id;
    if (callback) {
      callback(filterFunction[id]());
    }
  }
}

function initFilters (data, cb) {
  pictures = data.slice();
  callback = cb;

  filtersContainer.classList.remove('img-filters--inactive');
  filtersContainer.addEventListener('click', debounce(onFiltersContainerClick));

  cb(pictures);
}

export { initFilters };
