import 'babel-polyfill';
import faker from 'faker';
import { createAccountMockPromise } from './account-mock';
import Image from '../../model/image';

const createImageMockPromise = async () => {
  const mockData = {};
  const mockAcctResponse = await createAccountMockPromise();
  const image = await new Image({
    title: faker.lorem.words(2),
    url: faker.random.image(),
    fileName: faker.system.fileName(),
    accountId: mockAcctResponse.account._id,
  }).save();
  
  // console.log(JSON.stringify(image, null, 2), 'SAVED IMAGE');
  mockData.account = mockAcctResponse.account;
  mockData.token = mockAcctResponse.token;
  mockData.image = image;
  return mockData;
};

export default createImageMockPromise;
