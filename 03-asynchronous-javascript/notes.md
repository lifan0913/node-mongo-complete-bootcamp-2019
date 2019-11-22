# Asynchronous JavaScript: Promises and Async/Await

In modern JavaScript we now have some better tools to deal with asynchronous code. These tools are Promises and Async/Await.

---

## The Problem with Callbacks: Callback Hell

Let's talk about the that can arise when we are using to many callbacks functions. To do that we are going to do a small example to illustrate this example.

We are going to use the dog.txt to read the dog bread and we are going to make an http request to get a random image of a dog with the bread on the file and save that random image in another text file.

There are 3 steps here and we are going to use callback functions to illustrate the problem when using to many callbacks.

See code to see example of how easy is to get inside a callback hell.

---

## From Callback Hell to Promises

Lets start to learn how to solve callback hell by using promises. We are going to start by using a Promise for the HTTP Request. This is going to work because the superagent package has support for Promises out-of-the-box.

For Node functions we need to build the Promise ourselfs.

Here we are going to learn how to consume Promises and later in this section we are going to learn how to build them.
