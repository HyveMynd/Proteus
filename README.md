# Proteus
Ultra flexible api client. Never write a REST Client again!

> In Greek mythology, Proteus is an early sea-god or god of rivers and oceanic bodies of water, 
> ... of "versatile", "mutable", "capable of assuming many forms". "Protean" has positive connotations 
> of flexibility, versatility and adaptability.

## Overview
Proteus is the REST client to end all rest clients. It allows an app developer to idiomatically make REST calls
without all the boilerplate. Leveraging [node-fetch](https://github.com/bitinn/node-fetch) which relies on the wonderful
[fetch](https://github.com/github/fetch) polyfill, Proteus is easy-to-use and allows you, the developer, to focus on more important problems.

## Installation

`npm i -S proteus-client`

## Usage

Create a Proteus client with a `baseUrl`. Then simply chain resource endpoints togehter to dynamically build your REST endpoint URL. Lastly, call `fetch` in order to execute the request. By leveraging `node-fetch`, the Proteus api will be very familiar to anyone who has developed with Github's `fetch` API.

```
const Proteus = require('Proteus');
const api = new Proteus('https://jsonplaceholder.typicode.com');

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

Proteus will read the object invocations and convert those into a REST endpoint to call. The name of the function being called will translate to a single path on the url. In order to provide a url parameter, simply provide an argument to the function (NOTE: must be coercable into a string).

```
const api = new Proteus('https://localhost');

// Makes a GET request to https://localhost/users/1/addresses
api.users(1).addresses().fetch();

// Makes a GET request to https://localhost/path/my-id/to/my/resource
api.path('my-id').to().my().resource().fetch();
```

## API

### Node-Fetch API

The final call to the call chain in Proteus is `fetch`. The `fetch` call follows mostly (adapted for node and this project) the same api. Please see [node-fetch](https://github.com/bitinn/node-fetch) for more detail about features made possible by Node.js.

### new Proteus(baseUrl)
- `baseUrl` A string representing the base URL for the fetch request
- Returns: <code>[Proteus](#Proteus-instance)</code>  instance

Create a new instance of Proteus.

`baseUrl` should be an absolute url, such as `http://example.com/`. A path-relative URL (`/file/under/root`) or protocol-relative URL (`//can-be-http-or-https.com/`) will result in a rejected promise.

<a id="Proteus-instance"></a>
### proteusInstance.key([param])
- `key` The name provided will resolve into a url path.
- `param` The value of `param` will resolve into the next part of the url path following the `key`
- Returns: <code>[Proteus](#Proteus-instance)</code>

Builds the URL to fetch. Chainable to build more complex URLs.

Examples:
```
const proteusInstance = new Proteus('http://localhost');

proteusInstance.users();
// http://localhost/users

proteusInstance.users(1).addresses();
// http://localhost/users/1/addresses

proteusInstance.buildings(502).floors(2).wings('west').rooms(213).desks(10).chairs('a');
// http://localhost/buildings/502/floors/2/wings/west/rooms/213/desks/10/chairs/a
```

### fetch([options])
- [`options`](#options) for the HTTP(S) request
- Returns: <code>Promise&lt;[Response](https://github.com/bitinn/node-fetch/blob/master/README.md#class-response)&gt;</code>

Perform an HTTP(S) fetch.

### get([options])
- [`options`](#options) for the HTTP(S) request
- Returns: <code>Promise&lt;[Response](https://github.com/bitinn/node-fetch/blob/master/README.md#class-response)&gt;</code>

Shorthand to perform an HTTP(S) fetch using the `GET` verb.

### post([options])
- [`options`](#options) for the HTTP(S) request
- Returns: <code>Promise&lt;[Response](https://github.com/bitinn/node-fetch/blob/master/README.md#class-response)&gt;</code>

Shorthand to perform an HTTP(S) fetch using the `POST` verb.

### put([options])
- [`options`](#options) for the HTTP(S) request
- Returns: <code>Promise&lt;[Response](https://github.com/bitinn/node-fetch/blob/master/README.md#class-response)&gt;</code>

Shorthand to perform an HTTP(S) fetch using the `PUT` verb.

### patch([options])
- [`options`](#options) for the HTTP(S) request
- Returns: <code>Promise&lt;[Response](https://github.com/bitinn/node-fetch/blob/master/README.md#class-response)&gt;</code>

Shorthand to perform an HTTP(S) fetch using the `PATCH` verb.

### del([options])
- [`options`](#options) for the HTTP(S) request
- Returns: <code>Promise&lt;[Response](https://github.com/bitinn/node-fetch/blob/master/README.md#class-response)&gt;</code>

Shorthand to perform an HTTP(S) fetch using the `DELETE` verb.

#### Options

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

	// These properties are Proteus extensions
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







