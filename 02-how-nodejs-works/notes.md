# How Node.js Works: A Look Behind the Scenes

In this section we are going to deeper in how Node.js works behind the scenes. We are about the Node.js architecture, events in the events loop, streams, modules and much more...

This section will be a mix of theory with some practical exercises.

---

## Node, V8, Libuv and C++

Lets start by learning about the Node Architecture. The node runtime has several dependencies and the more important ones are V8 and Libuv.

V8 - The V8 is what converts JS code into machine code. Writen in JS & C++.

Libuv - Is an open source library wiht strong focus on asynchronous I/O. This is what gives node access to the file system, networking and more. It also implements the event loop and thread pool. Writen C++.
