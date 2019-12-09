# Express: Let's start building the Natours API!

Here we are finally starting to build the course big project (Natours). We are going to start by building the API and for this we are going to use Express.

## What is Express?

Express a minimal node.js framework, which means, it's actual built on top of node.js. Express is writen 100% using node.js code.

Express contains a very robusct set of features: complex routing, easier handling of requests and responses, middleware, server-side rendering, etc. arr allk included out of the box and this allow us to have a rapid development of node.js applciations: we don't have to re-invent the wheel.

Also express makes it easier to organize our application into the MVC architecture.

---

## Setting Up Express and Basic Routing

Lets create a simple server and set up some basic routing.

Theres is kind of a convention to have all the Express code in the `app.js` so that's what we are going to do here.

---

## APIs and RESTful API Design

Now that we know what express is we are almost ready to start building our API. But before we do that we need to quickly talk about APIs on a higher level and have an introduction to the REST architecture which is the most used API architecture used today.

API - Application Program Interface is a piece of software that can be used bny another piece of software, in order to allow applications to talk to each other.

REST - Representational State Transfer is basically a way of building Web APIs in a logical way making them easier to consume.

To build RESTful APIs we need to follow a couple of principals:

1 - Separate API into logical Resourses
2 - Expose Stuctured resource-based URLs
3 - Use HTTP methods (verbs)
4 - Send data as JSON (usually)
5 - Be stateless

### What is a Resource?

A resource is an object or representation of something, which has data associated to it. Any information that can be **named** can be a resource. Like for instance on the Natours API that we are going to build, **tours** **users** and **reviews** are all resources.

### Stateless RESTful API?

In a stateless RESTful API all state is handled on the client. This means that each request must contain **all** the information necessary to process a certain request. The server should **not** have to remember previous requests.

---

## Starting our API: Handling GET Requests

Lets start building our Natours API. We are going to start by building a GET Request and sending a JSON response back.

In order to do this we are going to use the data that is on the starter files inside the course resources.

---

## Handing Post Requests

Lets now implement a route handler for POST request so that we can add new tours. Notice that the URL is exactly the same, the only thing that changes is the HTTP method that we use.

We need to use a middleware here. A middleware is a function that can modify the incoming request data. It's called middleware because it acts in the middle, between the request and the response.

---

## Responding to URL Parameters

Lets learn an easy way to find, read and respond to parameters that are in the URL.

In order to add a route that is expecting some params we need to declare it, using the `/:param`, we can have as much params as we need and can say that they are optional using the `?`.

We can get the URL params using the `req.params`. In the `req.params` there's an Object with every param that is passed in the URL.

---

## Handling Patch Requests

After GET and POST, lets learn how to handle the PATCH method to actualy update data.

We have 2 HTTP methods to update data (PUT and PATCH).

With PUT we except that our application recieves the entire new updated object and with PATCH we only expect the properties that are actually going to be updated on the object.

---

## Handling Delete Requests

Finally lets now handle the DELETE Request.

Like the last lesson we will not implement the delete method because we are only learning the logic in this methods. In a near future we will develop a full API and then use the delete method in its full glory.

---

## Refactoring our Routes

Lets re-organize some of our routes to make our code much better.

Basically we are going to declare all our functions and then use them in the specific route.

Then to make our code easier to read and to maintain we are going to use the `app.route()` and chain all the methods that can be used in that specific route.

---

## Middleware and the Request-Response Cycle

In the last lessons we started getting the fundamentals of `express` development. So now is the perfect time of diving a little deeper into how express works and in order to do that we need to learn about middleware and the request-response cycle.

When someone hits our server express will recieve an incoming request for which it will then create a request and response Objects. That data will then be used and processed in order to generate and send back a meaningful response.

To process that dat ain express we use a `Middleware` which can manipulate the request or response object or really execute any other code that we would like.

It's called middleware because is a function that is executed in the middle (between receiving the request and sending the response).

The middleware stack (all the middleware in our code) are executed by the same order that they are defined, so the order MATTERS a lot in Express.

So the Request-Response Cycle is only this, since when we receive the incoming request, run our various middleware and send a response. It is a linear and straight forward process.

---

## Creating our own Middleware

Lets now create our own Middleware functions. In order to use middleware we use `app.use()` and to define our own Middleware we just need to create it (our custom function). We need to pass a third element and by convention we use `next`. If we dont call the `next` argument the request-response cycle will be stuck.

Remember that the middleware run on the order of the code, so if by any chance we had our middleware after the the app.route it would never run because the cycle would be already finished. The middleware needs to run before the response is send back to the user.

On our second Middleware we are going to create a timestamp of when the request happens and add this field to our request. Then we will console.log it on the request for all the tours and send it back on the response aswell.

---

## Using 3rd-Party Middleware

Lets use a middleware called `morgan` from NPM, this will allow us to see request data right in the console. We will install it as a regular dependency `npm i morgan`.

Into the morgan function we can pass an argument which will specify how the logging will look like and that's it. We required the Middleware and we used it.

Calling the Middleware will return a function similar to our own Middlewares, we can see this by looking at the morgan source code.

---

## Implementing the "USERS" Routes

Lets implement some Routes for the USERS resources. So that we can have users accounts, user roles, etc...

---

## Creating and Mounting Multiple Routers

Now is where things start to get a little more advanced and that is because we will now create multiple routers and use a process called mouting. Our ultimate goal is to separate all of our code into multiple files with the goal of having one file that only contains the routes for the tours, then another file with the routes for the users. We will also have a file that contains the handlers for the tours and a file that contains the handlers for the users.

In order to be able to do that we need to create one separate router for each of our resources and we will connect it to our application as a Middleware with `app.use()`.

---

## A Better File Structure

Lets now completly refactor our application and create a lot of new files and a whole new file structure. We want to separate our routes into new files, so this will be the first step.

We are going to create a new folder called **routes** and in there we will have a file for the Tours and a file for the Users and move their respective code into there leaving on the Middlewares (`app.use()`) and the start server on the app.js.

Once this is done, lets take a step further and create a new folder called "controllers" and create a controller for the tours and another for the users. This thing about controllers will become clear when we start to investigate the Model View Controller (MVC) architecture. Grab the handlers code and move it to the respective files and then import the functions into the respectivo routes.

Finally lets create a server file, mainly because it's a good practice to have everything that is related to express in one file and everything that is related to the server in another **main** file. So `server.js` will now be our starting file.

---

## Param Middleware

Param middleware is middleware that only runs for certain parameters, so basically when we have a certain parameter in our URL. In our example the only param that we have is the ID. So lets write a middleware that runs when the ID is present. In a param middleware we also have acess to a 4th param, we usually call it the `val` which stands for value.

---

## Chaining Multiple Middleware Functions

Whenever we want to define a middleware we only ever pass one middleware function. Until now we only have been using a Middleware , now we are going to chain them.

In this examples we are going to chain a middleware to the post method to verify is the req.body is correct before running the createTour middleware.

---

## Serving Static Files

What are we refering to static files? Our static files are sitting in our file system that we currently cannot access using our routes (eg Overview file in the public folder). We can't type (localhost:3000/public/overview.html) in the browser and access the file because we haven't defined a route for it. If we want to access something from our file system we need to use a built in express middleware.

The middleware in question is the `express.static()` middleware and we pass it the directory on the static files that we want to serve. Then to access them we don't need the public folder in the URL, so we just need to type (localhost:3000/overview.html). We don't need the public folder because when we open up a URL that can't be found in any of the routes it will then look in that public folder that we defined and it kinda of sets that folder to the root. So we can pretend that the root "/" is our public folder.

This wraps up the basic introduction to express.
