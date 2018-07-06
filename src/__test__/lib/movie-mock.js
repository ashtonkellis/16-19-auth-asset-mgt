'use strict';

import 'babel-polyfill';
import faker from 'faker';
import { createAccountMockPromise } from './account-mock';
import Movie from '../../model/movie';
import Account from '../../model/account';

// export default () => {
//   const mockResouceToPost = {
//     name: faker.lorem.words(2),
//     director: faker.lorem.words(2),
//   };
//   return new Movie(mockResouceToPost).save();
// };

const createMovieMockPromise = async () => {
  const mockData = {};

  const mockAcctResponse = await createAccountMockPromise();
  mockData.account = mockAcctResponse.account;
  mockData.token = mockAcctResponse.token;

  const movie = await new Movie({
    name: faker.lorem.words(2),
    director: faker.lorem.words(2),
    accountId: mockData.account._id,
  }).save();

  mockData.movie = movie;

  return mockData;
};

const removeMoviesAndAccounts = () => {
  return Promise.all([
    Account.remove({}),
    Movie.remove({}),
  ]);
};

export { createMovieMockPromise, removeMoviesAndAccounts };
