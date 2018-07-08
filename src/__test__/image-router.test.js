'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import createImageMockPromise from './lib/image-mock';
import Account from '../model/account';
import Image from '../model/image';
import Movie from '../model/movie';
import Profile from '../model/profile';

const poopImg = `${__dirname}/assets/poop.png`;
const apiUrl = `http://localhost:${process.env.PORT}/api/images`;

describe('TESTING ROUTES AT /api/images', () => {
  let token;
  let account; /*eslint-disable-line*/
  let image;
  beforeAll(startServer);
  afterAll(stopServer);
  beforeEach(async () => {
    try {
      const mockData = await createImageMockPromise();
      // console.log(mockData, 'MOCK DATA');
      token = mockData.token; /*eslint-disable-line*/
      account = mockData.account; /*eslint-disable-line*/
      image = mockData.image; /*eslint-disable-line*/
    } catch (err) {
      // return console.log(err, 'ERROR FROM IMAGE-ROUTER-TEST: before each'); /*eslint-disable-line*/
    }
    return undefined;
  });
  afterEach(async () => {
    await Promise.all([
      Account.remove(),
      Image.remove(),
      Profile.remove(),
      Movie.remove(),
    ]);
  });

  describe('POST ROUTES TO /api/images', () => {
    test('POST 200', async () => {
      try {
        const response = await superagent.post(apiUrl)
          .set('Authorization', `Bearer ${token}`)
          .field('title', 'poop emoji')
          .attach('image', poopImg);

        expect(response.status).toEqual(200);
        expect(response.body.title).toEqual('poop emoji');
        expect(response.body._id).toBeTruthy();
        expect(response.body.url).toBeTruthy();
        expect(response.body.url).toBeTruthy();
      } catch (err) {
        // console.log(err, 'ERROR FROM IMAGE-ROUTER TEST: post 200 test'); /*eslint-disable-line*/
        expect(err).toEqual('foo');
      }
      return undefined;
    });

    test('POST 400 on bad request', async () => {
      try {
        const response = await superagent.post(apiUrl)
          .set('Authorization', `Bearer ${token}`)
          .field('BADFIELDNAME', 'BADFIELD')
          .attach('image', poopImg);

        expect(response).toBe('foo');
      } catch (err) {
        expect(err.status).toBe(400);
      }
    });

    test('POST 401 on bad token', async () => {
      try {
        const badToken = 'BADTOKEN';
        const response = await superagent.post(apiUrl)
          .set('Authorization', `Bearer ${badToken}`)
          .field('BADFIELDNAME', 'BADFIELD')
          .attach('image', poopImg);

        expect(response).toBe('foo');
      } catch (err) {
        expect(err.status).toBe(401);
      }
    });
  });

  describe('GET ROUTES to /api/images', () => {
    test('200 GET /api/images for succesful fetching of a image', async () => {
      try {
        const response = await superagent.get(`${apiUrl}/${image._id}`)
          .set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200);
        expect(response.body.title).toEqual(image.title);
        expect(response.body.accountId).toEqual(image.accountId.toString());
        expect(response.body.url).toEqual(image.url);
        expect(response.body.fileName).toEqual(image.fileName);
      } catch (err) {
        console.log(err, 'ERROR FROM IMAGE-ROUTER-TEST: get 200 test'); /*eslint-disable-line*/
        expect(err).toEqual('FAILING IN GET 200 POST');
      }
    });

    test('404 GET due to bad id', async () => {
      try {
        const response = await superagent.get(`${apiUrl}/${'BADID'}`)
          .set('Authorization', `Bearer ${token}`);

        expect(response).toBe('foo');
      } catch (err) {
        expect(err.status).toBe(404);
      }
    });

    test('401 GET due to bad token', async () => {
      try {
        const response = await superagent.get(`${apiUrl}/${image._id}`)
          .set('Authorization', `Bearer ${'BADTOKEN'}`);
        expect(response).toEqual('foo');
      } catch (err) {
        expect(err.status).toBe(401);
      }
    });
  });

  describe('DELETE ROUTES to /api/images', () => {
    test('204 DELETE /api/images for succesful delete', async () => {
      try {
        const response = await superagent.delete(`${apiUrl}/${image._id}`)
          .set('Authorization', `Bearer ${token}`);

        expect(response.status).toEqual(204);
      } catch (err) {
        expect(err).toEqual('FAILING IN DELETE 204 POST');
      }
    });

    test('404 DELETE for bad id', async () => {
      try {
        const response = await superagent.delete(`${apiUrl}/${'BADID'}`)
          .set('Authorization', `Bearer ${token}`);

        expect(response).toEqual('FAILING IN DELETE 404');
      } catch (err) {
        expect(err.status).toBe(404);
      }
    });

    test('401 DELETE for bad token', async () => {
      try {
        const response = await superagent.delete(`${apiUrl}/${image._id}`)
          .set('Authorization', `Bearer ${'BADTOKEN'}`);

        expect(response).toEqual('FAILING IN DELETE 401');
      } catch (err) {
        expect(err.status).toBe(401);
      }
    });
  });
});
