# Event Loop
The event loop is what allows Node.js to perform non-blocking I/O operations - despite the fact that Jacascript is single threaded - by offloading operations to the system kernel whenever possible. 

www.nodejs.dev have good info on event loop

# Blocking Code
  * When we create a server and setup code for different page requests.
  * If one page have some kind of blocking code (code which will take some type and is synchronous e.g: nested for loops), then it'll not only block that page but it'll block all kind of requests on that server.

# Async Patterns
  * To avoid blocking our server we try to deal with requests asynchronously and this have some asynchronously patterns