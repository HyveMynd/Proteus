# Hermes
Ultra flexible api client. Never write a REST Client again!


## Overview
Hermes is the REST client to end all rest clients. It allows an app developer to idiomatically make REST calls 
without all the boilerplate. Leveraging [node-fetch](https://github.com/bitinn/node-fetch) which relies on the wonderful
[fetch](https://github.com/github/fetch) polyfill, Hermes is easy-to-use and allows you, the developer, to focus on more important problems.

## Installation

`npm i -S Hermes` (coming soon).

Just install from git in your `package.json`


## Usage

By leveraging `node-fetch`, the Hermes api will be very familiar to anyone who has developed with `fetch` in the past.

```
const Hermes = require('Hermes');
const api = new Hermes('https://jsonplaceholder.typicode.com');

api.users(1).fetch()
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

Hermes will read the object invocations and convert those into a REST endpoint to call. The name of the function being called will translate to a single path on the url. In order to provide a url parameter, simply provide an argument to the function (NOTE: must be coercable into a string).

```
const api = new Hermes('https://localhost');

// Makes a GET request to https://localhost/users/1/addresses
api.users(1).addresses().fetch();

// Makes a GET request to https://localhost/path/my-id/to/my/resource
api.path('my-id').to().my().resource().fetch();
```

## API

### Node-Fetch API

The final call to the call chain in Hermes is `fetch`. The `fetch` call follows mostly (adapted for node and this project) the same api. Please see [node-fetch](https://github.com/bitinn/node-fetch) for more detail about features made possible by Node.js.

#### fetch([,options])
- [options](#options) for the HTTP(S) request
- Returns: <code>Promise&lt;[Response](https://github.com/bitinn/node-fetch/blob/master/README.md#class-response)&gt;</code>

Perform an HTTP(S) fetch.

url should be an absolute url, such as http://example.com/. A path-relative URL (/file/under/root) or protocol-relative URL (//can-be-http-or-https.com/) will result in a rejected promise.

##### Options

The default values are shown after each option key.
```
{
	// These properties are part of the Fetch Standard
	method: 'GET',
	headers: {},        // request headers. format is the identical to that accepted by the Headers constructor (see below)
	body: null,         // request body. can be null, a string, a Buffer, a Blob, or a Node.js Readable stream
	redirect: 'follow', // set to `manual` to extract redirect headers, `error` to reject redirect

	// The following properties are node-fetch extensions
	follow: 20,         // maximum redirect count. 0 to not follow redirect
	timeout: 0,         // req/res timeout in ms, it resets on redirect. 0 to disable (OS limit applies)
	compress: true,     // support gzip/deflate content encoding. false to disable
	size: 0,            // maximum response body size in bytes. 0 to disable
	agent: null         // http(s).Agent instance, allows custom proxy, certificate etc.
	
	// These properties are Hermes extenstions
	query: null,        // map of key:value pairs for query parameters
}
```

##### Default Headers

If no values are set, the following request headers will be sent automatically:

Header            | Value
----------------- | --------------------------------------------------------
`Accept-Encoding` | `gzip,deflate` _(when `options.compress === true`)_
`Accept`          | `*/*`
`Connection`      | `close` _(when no `options.agent` is present)_
`Content-Length`  | _(automatically calculated, if possible)_
`User-Agent`      | `node-fetch/1.0 (+https://github.com/bitinn/node-fetch)`







