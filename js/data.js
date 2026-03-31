import {getRandomInteger, createRandomIdFromRangeGenerator} from './util.js';

/**
 * @typedef {() => (number | null)} NullableGeneratorFunction
 */

/**
 * @typedef {Object} CommentInfoDeps
 * @property {NullableGeneratorFunction} commentIdGen
 * @property {() => number} avatarIdGen
 */

/**
 * @typedef {Object} PhotoInfoDeps
 * @property {NullableGeneratorFunction} idGen
 * @property {NullableGeneratorFunction} urlGen
 * @property {NullableGeneratorFunction} likesGen
 * @property {NullableGeneratorFunction} commentIdGen
 * @property {() => number} avatarIdGen
 */

/**
 * Возвращает объект с характеристиками комментария
 * @typedef {Object} Comment
 * @property {number} id
 * @property {string} avatar
 * @property {string} message
 * @property {string} name
 */

/**
 * Возвращает объект с характеристиками фотографии
 * @typedef {Object} Photo
 * @property {number} id
 * @property {string} url
 * @property {string} description
 * @property {number} likes
 * @property {Comment[]} comments
 */

const COMMENT_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTION_PHOTO = [
  'Живописный закат над морем с розовыми облаками и чайками',
  'Семья на пикнике в парке: мама, папа и двое детей',
  'Уютная кофейня с винтажной мебелью и ароматным кофе',
  'Цветущая сакура в японском саду весной',
  'Городской пейзаж с небоскрёбами на фоне ясного неба',
  'Кот, уютно устроившийся на подоконнике с книгой',
  'Горный водопад в окружении зелени и камней',
  'Праздничный торт со свечами и свежими ягодами',
  'Детская площадка с весёлыми детьми на качелях',
  'Старинная книга с позолоченным переплётом на деревянном столе',
  'Букет полевых цветов в стеклянной вазе',
  'Парусник на фоне заката в открытом море',
  'Мастерская художника с кистями и палитрой',
  'Уютный камин с горящими поленьями в зимнем доме'
];

const NAMES = [
  'Александр',
  'Мария',
  'Дмитрий',
  'Елена',
  'Сергей',
  'Анна',
  'Максим',
  'Ольга',
  'Павел',
  'Татьяна'
];

const COUNT_PHOTOS = 25;
const MAX_COMMENTS_PER_PHOTO = 30;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_NUMBER_AVATAR = 1;
const MAX_NUMBER_AVATAR = 6;
const AVATAR_PATH = 'img/avatar-';
const PHOTO_PATH = 'photos/';
const AVATAR_EXTENSION = '.svg';
const PHOTO_EXTENSION = '.jpg';

/** @type {PhotoInfoDeps} */

const defaultDeps = {
  idGen: createRandomIdFromRangeGenerator(1, COUNT_PHOTOS),
  urlGen: createRandomIdFromRangeGenerator(1, COUNT_PHOTOS),
  likesGen: createRandomIdFromRangeGenerator(MIN_LIKES, MAX_LIKES),
  commentIdGen: createRandomIdFromRangeGenerator(1, 1000),
  avatarIdGen: () => getRandomInteger(MIN_NUMBER_AVATAR, MAX_NUMBER_AVATAR)
};

/**
 * Возвращает случайный элемент из переданного массива
 * @template A
 * @param {A[]} elements - Массив элементов, из которых выбирается случайный элемент.
 * @returns {A}
 */

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

/**
 * Создает объект комментария
 * @param {CommentInfoDeps} deps
 * @returns {Comment}
 */

const createCommentInfo = ({commentIdGen, avatarIdGen}) => {
  const id = commentIdGen();
  const avatarId = avatarIdGen();

  if (id === null) {
    throw new Error('Comment ID generator limit exceeded');
  }

  return {
    id,
    avatar: `${ AVATAR_PATH }${ avatarId }${ AVATAR_EXTENSION }`,
    message: getRandomArrayElement(COMMENT_MESSAGE),
    name: getRandomArrayElement(NAMES)
  };
};

/**
 * Создает объект фотографии
 * @param {PhotoInfoDeps} [deps=defaultDeps]
 * @returns {Photo}
 */

const createPhotoInfo = (deps = defaultDeps) => {
  const { idGen, urlGen, likesGen, commentIdGen, avatarIdGen } = deps;

  const id = idGen();
  const urlId = urlGen();
  const likes = likesGen();

  if (id === null || urlId === null || likes === null) {
    throw new Error('Photo generator limit exceeded');
  }

  const randomCommentsCount = getRandomInteger(0, MAX_COMMENTS_PER_PHOTO);

  return {
    id,
    url: `${ PHOTO_PATH }${ urlId }${ PHOTO_EXTENSION }`,
    description: getRandomArrayElement(DESCRIPTION_PHOTO),
    likes,
    comments: Array.from({length: randomCommentsCount}, () => createCommentInfo({commentIdGen, avatarIdGen}))
  };
};

/**
 * Создает массив объектов с характеристиками фотографий
 * @returns {Photo[]}
 */

const photoCollection = Array.from({length: COUNT_PHOTOS}, () => createPhotoInfo());

export {photoCollection};
