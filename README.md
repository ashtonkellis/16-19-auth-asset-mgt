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
GET api/images?id={Movie_id}
```
// example endpoint to get images # 123
api/images?id=123
```

DELETE api/images?id={Movie_id}
```
// example endpoint to delete images # 123
api/images?id=123
```

PUT api/imagess?id={Movie_id}
```
// example endpoint to delete images # 123
api/movies?id=123
```

## Load Testing Analysis
All testing performed on the deployed heroku app, using the free tier option. 

RPS: The depolyed app was tested using 1000 responses per second
Latency:
- Min: 99.6 ms (the minimum latency observed was 0.096 seconds)
- Max: 9876.8 ms (the maximum latency observeed was 9.8 seconds)
- Median: 2503.4 ms (the median latency observed was 2.5 seconds)
- 95th percentile: 8990.9 ms (95% of the users expect to experience a latency of less than 9 seconds)
- 99th percentile: 9437.1 ms (99% of the users expect to experience a latency of less than 9.5 seconds)
