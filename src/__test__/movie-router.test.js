'use strict';

import superagent from 'superagent';
import faker from 'faker';
import { startServer, stopServer } from '../lib/server';
import Movie from '../model/movie';
import { createMovieMockPromise, removeMoviesAndAccounts } from './lib/movie-mock';
import { createAccountMockPromise, removeAccountMockPromise } from './lib/account-mock';

const apiUrl = `http://localhost:${process.env.PORT}/api/movies`;

beforeAll(startServer);
afterAll(stopServer);
afterEach(() => Movie.remove({}));

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

        console.log(JSON.stringify(accountMock, null, 2), 'ACCOUNT MOCK');
        console.log(JSON.stringify(token, null, 2), 'TOKEN');
        console.log(JSON.stringify(movieData, null, 2), 'MOVIE DATA');
        return superagent.post(apiUrl)
          .set('Authorization', `Bearer ${token}`)
          .send(movieData)
          .then((response) => {
            console.log(JSON.stringify(response, null, 2), 'SUPERAGENT POST RESPONSE');
            expect(response.status).toBe(200);
          });
      })
      .catch((err) => {
        console.log(JSON.stringify(err, null, 2), 'ERROR FROM POST API MOVIES');
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
  test.only('200 GET for successful fetching of a movie', () => {
    let savedMovie;
    return createMovieMockPromise()
      .then((newMovie) => {
        savedMovie = newMovie;
        const { token } = newMovie;
        console.log(savedMovie.movie._id, 'SAVED MOVIE ID');
        console.log(JSON.stringify(savedMovie, null, 2), 'SAVED MOVIE');
        return superagent.get(`${apiUrl}/${savedMovie.movie._id}`)
          .set('Authorization', `Bearer ${token}`)
          .then((response) => {
            console.log(JSON.stringify(response.body, null, 2), 'SUPERAGENT GET RESPONSE BODY');
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
