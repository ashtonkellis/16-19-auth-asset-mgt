'use strict';

// import { Mongoose } from 'mongoose';
import { Router } from 'express';
import createError from 'http-errors';
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

movieRouter.put('/api/movies/:id?', (request, response, next) => {
  if (JSON.stringify(request.body).length <= 2) return next(createError(400, 'Not found'));

  Movie.init()
    .then(() => {
      logger.log(logger.INFO, `MOVIE ROUTER BEFORE PUT: Updating movie ${JSON.stringify(request.body)}`);

      const options = {
        new: true,
        runValidators: true,
      };

      return Movie.findByIdAndUpdate(request.params.id, request.body, options);
    })
    .then((updatedMovie) => {
      logger.log(logger.INFO, `MOVIE ROUTER AFTER PUT: Updated movie details ${JSON.stringify(updatedMovie)}`);
      return response.json(updatedMovie);
    })
    .catch(next);
  return undefined;
});

movieRouter.delete('/api/movies/:id?', (request, response, next) => {
  Movie.init()
    .then(() => {
      logger.log(logger.INFO, `MOVIE ROUTER BEFORE DELETE: Deleting movie #${request.params.id}`);
      return Movie.findByIdAndRemove(request.params.id);
    })
    .then((data) => {
      return response.status(204).json(data);
    })
    .catch(next);
});

export default movieRouter;
