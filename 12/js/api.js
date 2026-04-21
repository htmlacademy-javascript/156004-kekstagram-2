const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const APIRoute = {
  GET: `${BASE_URL}/data`,
  POST: `${BASE_URL}/`,
};

const loadPictures = async () => {
  const response = await fetch(APIRoute.GET, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Не удалось загрузить фотографии');
  }

  return response.json();
};

const sendPicture = async (formData) => {
  const response = await fetch(APIRoute.POST, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Не удалось отправить форму');
  }
};

export {loadPictures, sendPicture};
