const fetch = require('node-fetch');

class Hermes {
  constructor(baseUrl) {
    let base = baseUrl;

    // Validate the use of https
    if (!baseUrl.startsWith('http')) {
      base = `http://${baseUrl}`;
    }
    // else if (!baseUrl.startsWith('https')) {
    //   base = baseUrl.replace('http', 'https');
    // }

    this.baseUrl = base;
  }

  addResource(resource, param) {
    console.log('Adding', resource, param) // todo remove
    if (!this.endpoint) {
      this.endpoint = `${resource}`;
    } else {
      this.endpoint += `/${resource}`
    }

    if (param) {
      this.endpoint += `/${param}`;
    }
  }

  makeHttpCall(options, method) {
    if (!options) {
      options = {};
    }
    options.method = method;

    const url = `${this.baseUrl}/${this.endpoint}`;
    this.endpoint = null;
    console.log(url) // todo remove
    return fetch(url, options)
      .catch(err => { throw err });
  };

  get(options) {
    return this.makeHttpCall(options, 'GET');
  }
  post(options) {
    this.makeHttpCall(options, 'POST');
  }
  put(options) {
    return this.makeHttpCall(options, 'PUT');
  }
  patch(options) {
    return this.makeHttpCall(options, 'PATCH');
  }
  del(options) {
    return this.makeHttpCall(options, 'DELETE');
  }
}

module.exports = (baseUrl) => {
  const hermes = new Hermes(baseUrl);

  const proxyHandler = {
    get: function (target, key, proxy) {

      // Handle defined props
      if (target[key] !== undefined) {
        return target[key]
      } else if (hermes[key] !== undefined) {
        return hermes[key]
      } else if (typeof key === 'symbol') {
        return Object.getOwnPropertySymbols(target)[key];
      }

      // Handle all others
      return (...args) => {
        const [ param ] = args;
        hermes.addResource(key, param);
        return proxy;
      }
    },
  };

  return new Proxy({}, proxyHandler)
};
