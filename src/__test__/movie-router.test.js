'use strict';

import superagent from 'superagent';
import faker from 'faker';
import { startServer, stopServer } from '../lib/server';
import Movie from '../model/movie';
import Account from '../model/account';
import Profile from '../model/profile';
import createMovieMockPromise from './lib/movie-mock';
import { createAccountMockPromise } from './lib/account-mock';

const apiUrl = `http://localhost:${process.env.PORT}/api/movies`;

beforeAll(startServer);
afterAll(stopServer);
afterEach((done) => {
  Promise.all([
    Account.remove({}),
    Movie.remove({}),
    Profile.remove({}),
  ]);
  done();
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

  test('404 GET for valid request made with an id that was not found', () => {
    return superagent.get(`${apiUrl}/"5b345f9d1086d2149c26d370"`)
      .then((response) => {
        throw response;
      })
      .catch((err) => {
        expect(err.status).toBe(404);
      });
  });
});
