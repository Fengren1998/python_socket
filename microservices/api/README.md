# api (PaperWork PH Microservice) 
Handles microservice chommunication and client authentication. Other microservices like `frontend` call the APIs here, which will call the required service.

## Quickstart
See `/routes/ping.js` to see what a resource looks like and `/app.js` to see how to use that resource. A resource refers to an endpoint that can be accessed in a RESTful manner (e.g. GET /ping, POST /ping). These resources are accesse by `frontend` to fetch the data that it needs.

1. Create a file called `test.js` inside the `/routes` folder which will be our test resource.
2. Add our dependencies to the file:
```
const express = require('express');
const router = express.Router();
```
3. Create a GET endpoint for the test resource that returns the string "Hello World".
```
// GET /test/hello
router.get('/hello', (req, res) => {
  res.send('Hello World');
});

// Notes:
// req contains the data sent in the Request for this resource
// res defines the Response that this server will reply to the Request sent.
// res.send sends the data supplied to it back to the Request maker.
```
4. Export the router object which contains all the endpoints so that it can be used anywhere in our app by importing it.
```
module.exports = router;
```
5. In the `app.js` file, import the router object containing the test resource along with our existing main dependencies.
```
const testRouter = require('./routes/test');
```
6. Add the resource to our server with the url /test:
```
// Allocates the /test route for the test resource.
// Reason why router.get inside test has the url /test/hello
app.use('/test', testRouter);
```
7. Create a GET /test/hello request to test it out using Postman or simply using your browser (Fun Fact: Typing a url in a browser is a GET request towards the URL).
```
// Assuming docker-compose is running our app
1. Go to localhost:5000/test/hello in your browser
2. 'Hello World' should appear.
```

## Stack
### NodeJS
Our application framework built on Chrome's V8 engine.

### Express
A simple backend framework allowing us to create a server.

### ESLint
Our linter. This dictates how we format the code throughout our application to ensure that we have a clean and unified codebase.

## Configuration
Application Port: 5000  
This is the port used when the application is run on standalone without Docker.

Container Port: 5000  
This is the port allocated when Docker is used to run the application.
