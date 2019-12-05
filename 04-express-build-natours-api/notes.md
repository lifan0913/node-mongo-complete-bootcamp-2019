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
