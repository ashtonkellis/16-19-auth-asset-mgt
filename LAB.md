## Submission Instructions
* Continue from previous authorization labs.
* Submit on canvas: 
  * an observation: i noticed that out process.env.SECRET_KEY is visible in our test.env.js once we push to GitHub? Is this on purpose, or should we be taking steps to hide this piece of info?
  * your original time estimate: 5 hours (12:30 start time)
  * how long you spent: 
  * a link to your pull request: 
  * a link to your deployed Heroku URL: https://ashton-lab16-19.herokuapp.com/
  * an attached screenshot that shows you succesfully uploaded a Multer hash-named file to your AWS S3 bucket: https://raw.githubusercontent.com/ashtonkellis/16-19-auth-asset-mgt/master/src/__test__/assets/proof.png

#### Server Endpoints

* `DELETE /<resource-name>/:id` 
  * pass a bearer authentication token in the request to authorize the deletion of the resource
  * on success respond with a 204 status code
  * on failure due to a bad id send a 404 status code
  * on failure due to bad token or lack of token respond with a 401 status code
  
## Tests

* Write 204, 404, and 401 tests for `DELETE /<resource-name>/:id`

## Documentation
Same as previous labs with documentations on updated routes. 
