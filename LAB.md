## Submission Instructions
* Submit on canvas:
  * your original time estimate: 5 hours
  * how long you spent: 5 hours
  * link to your pull request: 
  * link to your deployed Heroku URL: 

### Server Endpoints
* `POST /<resource-name>` 
  * pass a bearer authentication middleware in the request to authorize the creation of the resource
  * pass data as stringifed JSON in the body of a **POST** request to create a new resource
  * on success respond with a 200 status code and an authentication token
  * on failure due to a bad request send a 400 status code
  * **OR** on failure due to bad token or lack of token respond with a 401 status code
* `GET /<resource-name>/:id` 
  * pass a bearer authentication middleware in the request to authorize the creation of the resource
  * on success respond with a 200 status code and a resource
  * on failure due to a bad id send a 404 status code
  * on failure due to bad token or lack of token respond with a 401 status code

## Tests
* Write your additional tests utilizing the new [ES7 async/await syntax](https://javascript.info/async-await)
* Write 200, 400, and 401 **OR** 404 tests for `/login` (Auth router)
* Write 200, 400, and 401 **OR** 404 tests for `POST /<resource-name>`
* Write 200 and 401 **OR** 404 tests for `GET /<resource-name>/:id`
* **This will involve changing the 400 error codes I already gave you to a 401 or 404. Think about the most appropriate place in the code that should be changed to a more appropriate error code instead, and change it there.**

## Documentation
Same as previous lab, with addition of new routes for this lab. 
