import { renderThumbnails } from './thumbnail.js';
import { sendForm, uploadImg } from './upload-form.js';
import { getData } from './api.js';
import { showAlert } from './alerts.js';
import { initFilters } from './filters.js';

uploadImg();
getData()
  .then((pictures) => {
    initFilters(pictures, renderThumbnails);
  })
  .catch((err) => showAlert(err.message));

sendForm();

