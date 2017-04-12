# Hermes
Ultra flexible api client. Never write a REST Client again!


## Overview
Hermes is the REST client to end all rest clients. It allows an app developer to idiomatically make REST calls 
without all the boilerplate. Leveraging [node-fetch](https://github.com/bitinn/node-fetch) which relies on the wonderful
[fetch](https://github.com/github/fetch) polyfill, Hermes is easy-to-use and a delightful experience. 

## Installation

`npm i -S Hermes` (coming soon).

Just install from git in your `package.json`


## Usage

By leveraging `node-fetch`, the Hermes api will be very familiar to anyone who has developed with `fetch` in the past.

```
const Hermes = require('Hermes');
const api = new Hermes('https://jsonplaceholder.typicode.com');

api.users(1).exec()
  .then(response => response.json())
  .then(json => console.log(json));

// Outputs the following 
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}
```

## How it works

Hermes will read the object invocations and convert those into a REST endpoint to call.

```
const api = new Hermes('https://localhost');
api.users(1).addresses().exec();

// Makes a GET request to https://localhost/users/1/addresses

api.path('to').my('resource').get();

// Makes a GET request to https://localhost/path/to/my/resource
```
