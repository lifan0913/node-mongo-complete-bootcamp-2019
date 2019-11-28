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
