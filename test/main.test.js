import { describe, expect, it } from 'vitest';
import {
  getRandomInteger,
  createRandomIdFromRangeGenerator,
  createPhotoInfo,
  createCommentInfo,
  COUNT_PHOTOS
} from '../js/main';

describe('Should return a number within the given range', () => {
  it('when called with min and max values', () => {
    for (let i = 0; i < 1000; i++) {
      const randomNumber = getRandomInteger(1, 10);

      expect(randomNumber).toBeGreaterThanOrEqual(1);
      expect(randomNumber).toBeLessThanOrEqual(10);
    }
  });

  it('when randomFn returns 0', () => {
    expect(getRandomInteger(1, 10, () => 0)).toBe(1);
  });

  it('when randomFn returns a value close to 1', () => {
    expect(getRandomInteger(1, 10, () => 0.999999)).toBe(10);
  });
});

describe('Should generate unique ids and return null after limit', () => {
  it('when generator is called until the range is exhausted', () => {
    const idGenerator = createRandomIdFromRangeGenerator(1, COUNT_PHOTOS);
    const generatedIds = new Set();

    for (let i = 1; i <= COUNT_PHOTOS; i++) {
      const id = idGenerator();
      expect(id).not.toBeNull();
      expect(generatedIds.has(id)).toBe(false);
      generatedIds.add(id);
    }

    expect(generatedIds.size).toBe(COUNT_PHOTOS);
    expect(idGenerator()).toBeNull();
  });
});

describe('Should create a comment object', () => {
  it('when generator id generator is provided', () => {
    const fakeDeps = {
      commentIdGen: () => 42,
      avatarIdGen: () => 3
    };

    const comment = createCommentInfo(fakeDeps);

    expect(comment.id).toBe(42);
    expect(comment.avatar).toBe('img/avatar-3.svg');
  });
});

describe('Should create a photo object using injected dependencies', () => {
  it('when valid generators are provided', () => {
    const fakeDeps = {
      idGen: () => 42,
      urlGen: () => 42,
      likesGen: () => 100,
      commentIdGen: () => 1,
      avatarIdGen: () => 3
    };

    const photo = createPhotoInfo(fakeDeps);

    expect(photo.id).toBe(42);
    expect(photo.url).toBe('photos/42.jpg');
    expect(photo.likes).toBe(100);
    expect(Array.isArray(photo.comments)).toBe(true);
  });
});

