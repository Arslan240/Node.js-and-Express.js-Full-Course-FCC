const http = require("http");

// we have a method createServer which accepts a callback funciton which accepts request, response parameter
const server = http.createServer((req, res) => {
  // console.log(req);
  // we can access url property in req object to check what url user is requesting
  // using that we can show different responses

  // for homepage we use '/'
  if (req.url === "/") {
    res.end("Welcome to homepage");
  } else if (req.url === "/about") {
    res.end("This is our about page");
  }
  else {

    // now without any condition, this will be used as default response if the requested resource does not exist
    res.end(`
      <h1>Oops!</h1>
      <p>We can't seem to find the page you are looking for</p>
      <a href='/'>Back home<a/>
    `);
  }


});

// we also have to tell our server which port to listen to
server.listen(5000);

// when we run our app with server listening to some port, then it does not execute the program and exit it, it keeps on listeneing to the port
// we can see it by running our localhost:portNumber
