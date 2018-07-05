'use strict';

// import { Mongoose } from 'mongoose';
import { Router } from 'express';
// import createError from 'http-errors';
import logger from '../lib/logger';
import Movie from '../model/movie';

const movieRouter = new Router();

movieRouter.post('/api/movies', (request, response, next) => {
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
});

movieRouter.get('/api/movies/:id?', (request, response, next) => {
  Movie.init()
    .then(() => {
      return Movie.findOne({ _id: request.params.id });
    })
    .then((foundMovie) => {
      logger.log(logger.INFO, `MOVIE ROUTER: FOUND THE MODEL, ${JSON.stringify(foundMovie)}`);
      response.json(foundMovie);
    })
    .catch(next);
});

export default movieRouter;
