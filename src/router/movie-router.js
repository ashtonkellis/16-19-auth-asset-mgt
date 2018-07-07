'use strict';

import { Router } from 'express';
import HttpErrors from 'http-errors';
import logger from '../lib/logger';
import Movie from '../model/movie';
import bearerAuthMiddleware from '../lib/middleware/bearer-auth-middleware';

const movieRouter = new Router();

movieRouter.post('/api/movies', bearerAuthMiddleware, (request, response, next) => {
  if (!request.account) return next(new HttpErrors(401, 'MOVIE ROUTER POST ERROR: not authorized'));

  Movie.init()
    .then(() => {
      logger.log(logger.INFO, `MOVIE ROUTER BEFORE SAVE: Saved a new movie ${JSON.stringify(request.body)}`);
      return new Movie(request.body).save();
    })
    .then((newMovie) => {
      logger.log(logger.INFO, `MOVIE ROUTER AFTER SAVE: Saved a new movie ${JSON.stringify(newMovie)}`);
      return response.json(newMovie);
    })
    .catch(next);
  
  return undefined;
});

movieRouter.get('/api/movies/:id?', bearerAuthMiddleware, (request, response, next) => {
  if (!request.account) return next(new HttpErrors(401, 'MOVIE ROUTER POST ERROR: not authorized'));

  Movie.init()
    .then(() => {
      return Movie.findOne({ _id: request.params.id });
    })
    .then((foundMovie) => {
      logger.log(logger.INFO, `MOVIE ROUTER: FOUND THE MODEL, ${JSON.stringify(foundMovie)}`);
      response.json(foundMovie);
    })
    .catch(next);
  
  return undefined;
});

export default movieRouter;
