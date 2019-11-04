# Introdution to Node.js and NPM

The goal with this section is to get you (student) to write code with Node.js as fast as possible but without worrying to much about what's happening behind the scenes.

---

## What is Node.js and why use it?

Node.js is a JavaScript runtime built on google's open-source v8 JavaScript engine. Usually JavaScript runs on the browser, with Node we can take JavaScript and run it outside of the browser.

This means that we can use Node.js as a web server to build fast, highly scalable network application (back-end). Another pro to use Node.js is that we can use JavaScript across the entire stack which will result in a faster and more efficient development.

NPM: huge library of open-source packages available for everyone for free.

Possible uses to Node.js:

- API with database behind it (preferably NoSQL)
- Data streaming (think YouTube/Netflix)
- Real-time chat application
- Server-side web application

Don't use Node to develop applications with heavy server-side processing (CPU-intensive).

---

## Running JavaScript outside the browser

To start running Node code on the terminal just type `node`. Then we can start typing some JavaScript code directly on the terminal.

---

## Using Modules 1: Core Modules

With Node.js we can do all type of amazing things that we cannot do with JavaScript on the browser, like, for example reading files from the file system.

In order to do that we need to use a node module. Node.js is built around this concept of modules, where all kinds of functionality are stored in a module. For reading files in inside the `fs` Module - `require('fs')`

---

## Read and Writing Files

In order to read or write files we can to use the fs (file system) module. We simply require it and assign it to a variable to be used later.

### Read files

To read a file we use our variable were we assigned the fs module and run the `readFileSync` method passing in the path of the file and the encoding

### Write files

To write a file we use the `writeFileSync` passing the path of where we want our file to be written and the content that we want in the file.

---

## Blocking and Non-Blocking: Asynchronous Nature of Node.js

The piece of code that we wrote in the last lesson to read the file and to save it's content in a variable, was writen in a Synchronous way. This means that every line of code "waits" for the result of the previous one. This type of code is known as blocking.

Node.js is single-threaded and this means that all the users using the app are using the same thread. If a user block the code with a synchronous method it blocks the thread for all the users.

We should use asynchrounous code, that instead of blocking the execution does the heavy work in the background. While it's ready the data in the background all the other users can perform theirs tasks. Use the Non-blocking I/O model.

This is why we use so many callback functions in Node.js.

It's important to know that using callbacks does not make our code automatically asynchronous.

---

## Reading and Writing Files Asynchronously

To read a file in a asynchronous way we should use the `readFile` method instead of the `readFileSync` and pass it a callback to execute once it finishes reading the contents.

The same applies to writing a file. There's an example in the repo with some code to read and write files in a asynchronous way.

---

## Creating a Simple Web Server

The first step is to include the `http` module.
The second step is to use the `createServer()` method inside the http module, and pass it a callback function with the request and response.

Once we got our server ready we need to listen for connections using the `listen()` method. We need to pass the port and an optional location. E.g: `server.listen(8000, '127.0.0.1')`

---

## Routing

In this example we are going to implement routing only using Node.js, however, in a real application and in the next app we are going to use `express`.

We are going to use another built in method called `url` to implement a simple example of routing. We are going to compare the `pathName` inside the server and display a message according to the page that the user requires.

To return the `404` Status Code, we use the `res.writeHead()`. We can also use this method to send headers. To do this we need to specify and object with the headers that we want to send back.

In the example we are informing the browser that we are going to send back some HTML, so in the `end()` we can use HTML without any issue.

IMPORTANT: We need to specify the headers BEFORE sending out the response.
