'use strict';

import mongoose from 'mongoose';

const movieSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  director: {
    type: String,
    required: true,
  },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
}, { timestamps: true });

const skipInit = process.env.NODE_ENV === 'development';
export default mongoose.model('movies', movieSchema, 'movies', skipInit);
