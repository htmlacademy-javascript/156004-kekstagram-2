const DATA_ERROR_SHOW_TIME = 5000;

const showDataError = () => {
  const template = document.querySelector('#data-error')
    .content
    .querySelector('.data-error');

  const errorElement = template.cloneNode(true);
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, DATA_ERROR_SHOW_TIME);
};

export {showDataError};
