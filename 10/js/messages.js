const createMessage = (templateId) => {
  const template = document.querySelector(`#${templateId}`).content.querySelector(`.${templateId}`);
  return template.cloneNode(true);
};

const closeMessage = (messageElement) => {
  messageElement.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
};

let currentMessageElement = null;

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && currentMessageElement) {
    evt.preventDefault();
    closeMessage(currentMessageElement);
    currentMessageElement = null;
  }
}

function onDocumentClick(evt) {
  if (!currentMessageElement) {
    return;
  }

  const inner = evt.target.closest('.success__inner, .error__inner');

  if (!inner) {
    closeMessage(currentMessageElement);
    currentMessageElement = null;
  }
}

const showMessage = (templateId, buttonSelector) => {
  currentMessageElement = createMessage(templateId);
  document.body.append(currentMessageElement);

  const button = currentMessageElement.querySelector(buttonSelector);
  button.addEventListener('click', () => {
    closeMessage(currentMessageElement);
    currentMessageElement = null;
  });

  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

const showSuccessMessage = () => showMessage('success', '.success__button');
const showErrorMessage = () => showMessage('error', '.error__button');

export {showSuccessMessage, showErrorMessage};
