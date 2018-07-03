## Submission Instructions
* **Deploy to Heroku**
* Open a pull request to this repository
* Submit on canvas 
  * a question: 
  * and observation: 
  * your original estimate: 5 hours
  * how long you spent: 
  * a link to your pull request (**You will get a 0 if you have a failing PR or haven't hooked up Travis CI**)
  * a link to your deployed Heroku URL: https://ashton-lab16-19.herokuapp.com/

#### Server Endpoints
* `POST /signup` 
  * pass data as stringifed JSON in the body of a **POST** request to create a new account
  * on success respond with a 200 status code and an authentication token
  * on failure due to a bad request send a 400 status code

## Tests
* POST should test for 200, 400, and 409 (if any keys are unique)

## Documentation
Add your Travis badge to the top of your README. List all of your registered routes and describe their behavior. Describe what your resouce is. Imagine you are providing this API to other developers who need to research your API in order to use it. Describe how a developer should be able to make requests to your API. Refer to the PokeAPI docs for a good example to follow.
