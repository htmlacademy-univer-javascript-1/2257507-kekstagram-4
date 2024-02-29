import { renderThumbnails } from './thumbnail.js';
import { sendForm, uploadImg } from './upload-form.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';

uploadImg();
getData()
  .then((pictures) => renderThumbnails(pictures))
  .catch((err) => showAlert(err.message));

sendForm();

