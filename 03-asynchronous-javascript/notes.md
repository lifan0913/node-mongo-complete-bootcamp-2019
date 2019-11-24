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

For Node functions (like readFile) we need to build the Promise ourselfs.

Here we are going to learn how to consume Promises and later in this section we are going to learn how to build them.

---

## Building Promises

In this section we are going to promisify the readFile and writeFile functions. This means that we will make them return Promises.

We are going to write two functions that are going to return Promises, one for the readFile and another for the writeFile. In this functions besides making them return a new Promise we are only going to call some node functions and run the `reject` if something goes wrong or the `resolve` if the promise is fulfilled.

Then the trick is to return the previous Promise everytime on the `.then()`, so we return the result of the call for each one of our new functions and then chain them together in order to avoid the callback hell.

The .catch works for all the Promise, so if any of our chained Promises returns a reject (fails) it will be caught by the .catch and all our Promise (`readFilePro`) will fail.

---

## Consuming Promises with Async/Await

Instead of consuminf Promises with the `.then()` method that still uses callbacks we can user something called Async/Await which is something that was introduced in ES8.

To use async/await we need to declare that our function is async, using the `async` keyword when creating it. Then we use the keyword `await` in every promise and save the result in a variable. The await keyword will stop the code until the promise is resolved.

Once this is done we can do the next step, in our case our next promise.

In order to catch the errors we need to put our entire code inside a try/catch block. And if any error is returned it wil be catched and the code inside the catch block will be executed.

---

## Returning Values from Async Functions

In order to return values from Async Functions we have a couple of options to do this.

We can return a value at the end of the execution and then run the `.then()` and get the returned value there. This however has a problem, if we have an error in the main Promise because we are always returning it as a resolved (sucessfull) promise, to fix this we need to `throw()` an error inside the catch method and then catch it in our function.

Another way to do this is to use async/await inside an IFY.

We create an async IFY and then inside a try/catch block put our console.logs and async to a new variable (x) the result of the await of our Promise. Then we just need to log it.
