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

---

## Building a (very) Simple API

API - Application Programming Interface

An API in a nutshell is a service from which we can request some data. In this example we are going to request some data about the products that we are offering in the node-farm.

The information is in the `dev-data/data.json`. We are going to read the data from this file and than parse JSON into JavaScript and than send back that result to the client.

To convert JSON into JavaScript we use the `JSON.parse()`.

To make the server more efficient we are going to read the file when the server loads and then just send the response when somebody makes a request for the API instead of reading it every time. And we are using the Sync version because it's nor problematic here, the code will run "before" the server starts.

SIDE NOTE: On the `readFile()` method we are using a different way to say where our data is located. We are doing this because usually the './' is where the script is being executed and '\_\_dirname' is where the current file is located.

---

## HTML Templating: Builing the Templates

Our goal is to build an application where we have an overview with all the products and every product has a view with the information that we are reading from the file.

We are going to built the templates based on the ones that already exist in the `templates` folder. Replacing the static data with `{%PROCUCT_FIELD%}`.

---

## HTML Templating: Filling the Templates

We already have the templates ready so now we are going to replace the placeholders with content.

We are going to create an aux function to replace our placeholders with the data coming from the file. Then we pass our final output and print the page with all the info listed.

---

## Parsing Variables from URLs

We are going to pass our URL in order to build the product page. We are going to parse our URL so that we can have our query and it's value and use them to fetch the data of the product that we want to load and display to the user.

---

## Using Modules 2: Our Modules

We can create our own modules and export something from them (eg. a function), import the function in another module and the use it there.

Lets create a new module for the `replaceTemplate()` method and then import it in our simple-server. In order to do this, we are creating a new folder and in there a new file with our module code. Our module will be an anonymous function and will be exported using `module.exports`.

Then we need to import it using require('path-to-our-module') and assign to a variable in order to be used, in our case we are going to use `replaceTemplate` because if we use the same name that we already have we don't need to change anything else in the our server code.

---

## Introduction to NPM and the package.json File

NPM - Node Package Manager - is a command line interface that automatically comes includes in Node and which we use to install and manage open source packages. These packages usually come from the npm repository.

The first thing that we usually do whenever we start a new project is to start with `npm init`. This command creates the package.json file where we can find the all kinds of data about the project.

---

## Types of Packages and Installs

There are two types of packages that we can use with npm and there are also two types of installs.

### Types of Packages

The types of packages are simple dependencies or development dependecies.

Simple dependencies are use by your application in order for something to work in your code.

Development dependencies are dependencies that are being used while developing the application which can be for example to build the bundle, this type of dependencies are only used while developing the project.

### Types of Installs

There are also two types of installs, the local install and the global install.

As the name implies the local installs are going to be used locally (by the app) and the global installs can be used in any folder or any project in the machine that they are installed.

---

## Using Modules 3: 3rd Party Modules

So far we learned how to require node.js core modules, how to require our own modules and now we are going to take a look on how to require 3rd party modules.

Like usual we do the require at the top and normally we require the core modules first, then the 3rd party modules and finally our own modules coming from the local file system.

In order to use 3rd party modules we need to require the and assign them to a variable, in our example we are requiring **slugify** and we are assing it to a variable with the same name `const slugify = require("slugify");`.

Then we are iterating the `dataObject` and creating an array with all our new slugs for the node-farm products.
