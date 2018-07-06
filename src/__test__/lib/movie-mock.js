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
  const mockAcctResponse = await createAccountMockPromise();

  // console.log(JSON.stringify(mockAcctResponse, null, 2), 'MOCK ACCOUNT RESPONSE');

  const movie = await new Movie({
    name: faker.lorem.words(2),
    director: faker.lorem.words(2),
    accountId: mockAcctResponse.account._id,
  }).save();

  const mockData = {};
  mockData.movie = movie;
  mockData.account = mockAcctResponse.account;
  mockData.token = mockAcctResponse.token;

  // console.log(JSON.stringify(mockData, null, 2), 'MOCK DATA');
  return Promise.resolve(mockData);
};

const removeMoviesAndAccounts = () => {
  return Promise.all([
    Account.remove({}),
    Movie.remove({}),
  ]);
};

export { createMovieMockPromise, removeMoviesAndAccounts };
