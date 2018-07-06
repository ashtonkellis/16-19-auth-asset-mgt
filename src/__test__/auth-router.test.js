import superagent from 'superagent';
import faker from 'faker';

import { startServer, stopServer } from '../lib/server';
import { createAccountMockPromise, removeAccountMockPromise } from './lib/account-mock';

const apiUrl = `http://localhost:${process.env.PORT}/api`;

describe('AUTH router', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  beforeEach((done) => {
    removeAccountMockPromise();
    done();
  });

  test.only('GET 200 to api/login for successful login and receipt of a TOKEN', () => {
    return createAccountMockPromise()
      .then((mockData) => {
        return superagent.get(`${apiUrl}/login`)
          .auth(mockData.account.username, mockData.originalRequest.password);
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.token).toBeTruthy();
      })
      .catch((err) => {
        throw err;
      });
  });

  test('GET 400 to /api/login for unsuccesful login with bad username and password', () => {
    return superagent.get(`${apiUrl}/login`)
      .auth('bad username', 'bad password')
      .then((response) => {
        throw response;
      })
      .catch((err) => {
        expect(err.status).toEqual(400);
      });
  });

  test('POST 200 to /api/signup for successful account creation and receipt of a TOKEN', () => {
    const mockAccount = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: 'password',
    };

    return superagent.post(`${apiUrl}/signup`)
      .send(mockAccount)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.token).toBeTruthy();
      })
      .catch((err) => {
        throw err;
      });
  });

  test('POST 400 to /api/signup for bad request', () => {
    const badMockAccount = {
      username: faker.internet.userName(),
      password: 'password',
    };

    return superagent.post(`${apiUrl}/signup`)
      .send(badMockAccount)
      .then((response) => {
        throw response;
      })
      .catch((err) => {
        expect(err.status).toBe(400);
      });
  });

  test('POST 409 to /api/signup for duplicate value', () => { //eslint-disable-line

    return createAccountMockPromise()
      .then((account) => {
        const mockAccountRequestData = account.originalRequest;
        return mockAccountRequestData;
      })
      .then((mockAccountRequestData) => {
        console.log(JSON.stringify(mockAccountRequestData, null, 2), 'MOCK ACCOUNT REQUEST DATA');
        return superagent.post(`${apiUrl}/signup`)
          .send(mockAccountRequestData)
          .then((response) => {
            console.log(JSON.stringify(response, null, 2), 'SUPERAGENT POST RESPONSE');
          })
          .catch((err) => {
            console.log(JSON.stringify(err, null, 2), 'SUPERAGENT POST ERROR');
          });
      })
      .then((response) => {
        console.log(JSON.stringify(response, null, 2), 'RESPONSE');
      })
      .catch((err) => {
        throw err;
      });
  });
});
