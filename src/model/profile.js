import mongoose from 'mongoose';

const profileSchema = mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  bio: { type: String },
  profileImageUrl: { type: String },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    unique: true,
  },
});

const skipInit = process.env.NODE_END === 'development';
export default mongoose.model('profiles', profileSchema, 'profiles', skipInit);
