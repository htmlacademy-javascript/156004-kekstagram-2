const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const loadPictures = async () => {
  const response = await fetch(`${BASE_URL}/data`);

  if (!response.ok) {
    throw new Error('Не удалось загрузить фотографии');
  }

  return response.json();
};

const sendPicture = async (formData) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Не удалось отправить форму');
  }
};

export {loadPictures, sendPicture};
