'use strict';

import superagent from 'superagent';
import faker from 'faker';
import { startServer, stopServer } from '../lib/server';
import createMovieMockPromise from './lib/movie-mock';
import createAccountMockPromise from './lib/account-mock';
import removeAllDocuments from './lib/remove-all-documents';

const apiUrl = `http://localhost:${process.env.PORT}/api/movies`;

beforeAll(startServer);
afterAll(stopServer);
afterEach(async () => {
  await removeAllDocuments();
});

describe('POST /api/movies', () => {
  test('200 POST for successful post of a movie', () => {
    return createAccountMockPromise()
      .then((accountMock) => {
        const movieData = {
          name: faker.lorem.words(2),
          director: faker.lorem.words(2),
          accountId: accountMock.account._id,
        };
        const { token } = accountMock;

        return superagent.post(apiUrl)
          .set('Authorization', `Bearer ${token}`)
          .send(movieData)
          .then((response) => {
            expect(response.status).toBe(200);
          });
      })
      .catch((err) => {
        throw err;
      });
  });

  test('400 POST for bad request if no request body was provided', () => {
    return superagent.post(apiUrl)
      .then((response) => {
        throw response;
      })
      .catch((err) => {
        expect(err.status).toBe(400);
      });
  });
});

describe('GET /api/movies', () => {
  test('200 GET for successful fetching of a movie', () => {
    let savedMovie;
    return createMovieMockPromise()
      .then((newMovie) => {
        savedMovie = newMovie;
        const { token } = newMovie;
        return superagent.get(`${apiUrl}/${savedMovie.movie._id}`)
          .set('Authorization', `Bearer ${token}`)
          .then((response) => {
            expect(response.status).toBe(200);
            expect(response.body.name).toBe(savedMovie.movie.name);
            expect(response.body.director).toBe(savedMovie.movie.director);
          });
      })
      .catch((err) => {
        throw err;
      });
  });

  test('404 GET for valid request made with an id that was not found', async () => {
    try {
      const savedMovieData = await createMovieMockPromise();
      const response = await superagent.get(`${apiUrl}/"badId"`)
        .set('Authorization', `Bearer ${savedMovieData.token}`);

      expect(response).toBe('foo');
    } catch (err) {
      expect(err.status).toBe(404);
    }
  });

  test('401 GET for a valid request made with an invalid token', async () => {
    try {
      const savedMovieData = await createMovieMockPromise();
      // const { token } = savedMovieData;
      const token = 'BADTOKEN';
      const response = await superagent.get(`${apiUrl}/${savedMovieData.movie._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe('foo');
    } catch (err) {
      expect(err.status).toBe(401);
    }
  });
});
