import fetch from 'node-fetch';

class Proteus {
  constructor(baseUrl) {
    let base = baseUrl;

    // Validate the use of http
    if (!baseUrl.startsWith('http')) {
      base = `http://${baseUrl}`;
    }

    this.baseUrl = base;
  }

  addResource(resource, param) {
    if (!this.endpoint) {
      this.endpoint = `${resource}`;
    } else {
      this.endpoint += `/${resource}`;
    }

    if (param) {
      this.endpoint += `/${param}`;
    }
  }

  fetch(options) {
    return this.makeHttpCall(options);
  }

  get(options) {
    return this.makeHttpCall(options, 'GET');
  }
  post(options) {
    return this.makeHttpCall(options, 'POST');
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

  async makeHttpCall(options, method) {
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
    this.endpoint = null;

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
        proteus.addResource(key, param);
        return proxy;
      };
    },
  };

  return new Proxy({}, proxyHandler);
};
