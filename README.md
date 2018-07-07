# Lab 16 - 19 Auth Asset Management
## Travis Badge
[![Build Status](https://travis-ci.org/ashtonkellis/16-19-auth-asset-mgt.svg?branch=master)](https://travis-ci.org/ashtonkellis/16-19-auth-asset-mgt)

## Code
to signup:
```
POST to api/signup

// request.body example
request.body = {
  username = 'foo',
  email = 'foo@bar.com',
  password = 'password',
}
```

to login:
```
GET to api/login
```

## Resource: Movis
Movies have the following fields:
```
Movie {
  _id: a unique id that is created on instantiation
  name: string (required)
  director: string (optional)
}
```

## API Endpoints
POST api/movies
```
  // example post request body
  request.body: {
    name: 'Moar Explozionz',
    director: 'Michael BayLeaf',
}
```

GET api/movies?id={Movie_id}
```
// example endpoint to get movies # 123
api/movies?id=123
```

DELETE api/movies?id={Movie_id}
```
// example endpoint to delete movies # 123
api/movies?id=123
```

PUT api/moviess?id={Movie_id}
```
// example endpoint to delete movies # 123
api/movies?id=123
```
