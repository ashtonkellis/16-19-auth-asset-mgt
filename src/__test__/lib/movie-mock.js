import 'babel-polyfill';
import faker from 'faker';
import createAccountMockPromise from './account-mock';
import Movie from '../../model/movie';

const createMovieMockPromise = async () => {
  const mockAcctResponse = await createAccountMockPromise();

  const movie = await new Movie({
    name: faker.lorem.words(2),
    director: faker.lorem.words(2),
    accountId: mockAcctResponse.account._id,
  }).save();

  const mockData = {
    movie,
    account: mockAcctResponse.account,
    token: mockAcctResponse.token,
  };

  return mockData;
};

export default createMovieMockPromise;
