Hello HTTP
======

Use the Node.js `http` module to create an end-to-end (E2E) tested http server. 

## Directions

Your server should:

1. Respond with a greeting if the method is `GET` and url (path) is `/happy-birthday/<name>`
  * Response should look like: 
      ```html
      <html><body><p>Happy Birthday <strong>Jane!</strong></p></body></html>
      ```
  * Content Type should be set to `text/html`
  * If query string specifies a `custom` value, like `/happy-birthday/Jane&custom=You%20Rock`, add that
  to the response: 
      ```html
      <html><body><p>Happy Birthday <strong>Jane!</strong> You Rock</p></body></html>
      ```
  * If name is not included, use `Stranger`, otherwise use name part of the request path.
  
2. Responds with one random of (at least) three interesting facts about http (up to you) when method is 
GET and the url (path) is `/fact`. 
    * **Return the fact as an object with a fact property and make sure Content-Type 
is `application/json`**. (Make sure that each interesting fact has the word `http` somewhere in the fact, 
this will make it easier to test the fact.)

3. **BONUS** Add more routes! Consider:
    1. Path (url)
    1. Query
    1. Method (use body parser from class if you want to POST/PUT)
4. Any other request that doesn't match a defined `METHOD` and url `path` should return status code 404 Not Found 
and include the text: `CANNOT <METHOD> <path>`

**IMPORTANT**: Add a `README.md` that describes how to use your API 

### Architecture and Design

1. Define the listening function for your server in `lib/app.js`, but export it and create the server and listen 
in a `server.js` file at the root of your project. You will import (`require`) this same function into your E2E test
and use `chai.request(app)` to start the server
* Use 'extract' function to not have all of your code live in the listening function. You should be able to do this
for 1) greeting, 2) interesting fact, 3) other BONUS methods. TDD these synchronous functions first before 
exposing via the server.

## Testing

* Unit test your discrete module functions for making a birthday page and returning an interesting fact. For the 
randomly returned interesting fact, just test the word http as a regex:

    ```js
    assert.ok(/http/.test(response));
    ```

* Use chai-http to E2E test the API.
