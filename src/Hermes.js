import fetch from 'node-fetch';

class Hermes {
  constructor(baseUrl) {
    let base = baseUrl;

    // Validate the use of https
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

  exec(options) {
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

    const url = `${this.baseUrl}/${this.endpoint}`;
    this.endpoint = null;

    return fetch(url, options);
  }
}

export default (baseUrl) => {
  const hermes = new Hermes(baseUrl);

  const proxyHandler = {
    get(target, key, proxy) {
      // Handle defined props
      if (target[key] !== undefined) {
        return target[key];
      } else if (hermes[key] !== undefined) {
        return hermes[key];
      } else if (typeof key === 'symbol') {
        return Object.getOwnPropertySymbols(target)[key];
      }

      // Handle all others
      return (...args) => {
        const [param] = args;
        hermes.addResource(key, param);
        return proxy;
      };
    },
  };

  return new Proxy({}, proxyHandler);
};
