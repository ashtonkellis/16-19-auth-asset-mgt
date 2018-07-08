import Account from '../../model/account';
import Image from '../../model/image';
import Movie from '../../model/movie';
import Profile from '../../model/profile';

const removeAllDocuments = () => {
  return Promise.all([
    Account.remove(),
    Image.remove(),
    Movie.remove(),
    Profile.remove(),
  ]);  
};

export default removeAllDocuments;
