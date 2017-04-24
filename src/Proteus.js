import fetch from 'node-fetch';

class Proteus {

  constructor(baseUrl) {
    let base = baseUrl;

    // Validate the use of http
    if (!baseUrl.startsWith('http')) {
      base = `http://${baseUrl}`;
    }

    this.endpoint = '';
    this.baseUrl = base;
  }

  _addResource_ = (resource, param) => {
    if (this.endpoint.length === 0) {
      this.endpoint = `${resource}`;
    } else {
      this.endpoint += `/${resource}`;
    }

    if (param) {
      this.endpoint += `/${param}`;
    }
  }

  fetch(options) {
    return this._makeHttpCall_(options);
  }

  get(options) {
    return this._makeHttpCall_(options, 'GET');
  }
  post(options) {
    return this._makeHttpCall_(options, 'POST');
  }
  put(options) {
    return this._makeHttpCall_(options, 'PUT');
  }
  patch(options) {
    return this._makeHttpCall_(options, 'PATCH');
  }
  del(options) {
    return this._makeHttpCall_(options, 'DELETE');
  }

  _makeHttpCall_ = (options, method) => {
    let opts = options;
    if (!options) {
      opts = {};
    }
    opts.method = method;

    let queryString = '';
    if (opts.query) {
      queryString = Object.keys(opts.query).reduce((acc, curr) =>
        `${acc}&${curr}=${opts.query[curr]}`, '?');
    }

    const url = `${this.baseUrl}/${this.endpoint}${queryString}`;
    this.endpoint = '';

    return fetch(url, opts);
  }
}

export default (baseUrl) => {
  const proteus = new Proteus(baseUrl);

  const proxyHandler = {
    get(target, key, proxy) {
      // Handle defined props
      if (target[key] !== undefined) {
        return target[key];
      } else if (proteus[key] !== undefined) {
        return proteus[key];
      } else if (typeof key === 'symbol') {
        return Object.getOwnPropertySymbols(target)[key];
      }

      // Handle all others
      return (...args) => {
        const [param] = args;
        proteus._addResource_(key, param);
        return proxy;
      };
    },
  };

  return new Proxy({}, proxyHandler);
};
