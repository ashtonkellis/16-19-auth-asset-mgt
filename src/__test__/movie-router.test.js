'use strict';

import superagent from 'superagent';
import faker from 'faker';
import { startServer, stopServer } from '../lib/server';
import Movie from '../model/movie';
import createMockMoviePromise from './lib/movie-mock';

const apiUrl = `http://localhost:${process.env.PORT}/api/movies`;

beforeAll(startServer);
afterAll(stopServer);
afterEach(() => Movie.remove({}));

describe('POST /api/movies', () => {
  const mockResource = {
    name: faker.lorem.words(2),
    director: faker.lorem.words(2),
  };

  test('200 POST for successful post of a movie', () => {
    return superagent.post(apiUrl)
      .send(mockResource)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(mockResource.name);
        expect(response.body._id).toBeTruthy();
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
    return createMockMoviePromise()
      .then((newMovie) => {
        savedMovie = newMovie;
        return superagent.get(`${apiUrl}/${newMovie._id}`);
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual(savedMovie.name);
        expect(response.body.director).toEqual(savedMovie.director);
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
