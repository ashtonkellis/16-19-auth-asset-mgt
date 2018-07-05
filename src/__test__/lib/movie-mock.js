'use strict';

import faker from 'faker';
import Movie from '../../model/movie';

export default () => {
  const mockResouceToPost = {
    name: faker.lorem.words(2),
    director: faker.lorem.words(2),
  };
  return new Movie(mockResouceToPost).save();
};
