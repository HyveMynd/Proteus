const Proteus = require('../Proteus');
const { describe, it, beforeEach } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();

describe('Proteus', () => {
  let api;
  beforeEach(() => {
    api = new Proteus('https://jsonplaceholder.typicode.com');
  });

  describe('CRUD', () => {
    describe('makes GET requests', () => {
      it('for many', () =>
        api.users().fetch()
          .then(response => response.json())
          .should.eventually.have.length(10));
      it('for 1 with id', () =>
        api.users(1).fetch()
          .then(response => response.json())
          .should.eventually.include.keys('id'));
      it('for a nested route', () =>
        api.posts(1).comments().fetch()
          .then(response => response.json())
          .should.eventually.have.length(5));
      it('with a query string', () => api.posts().fetch({ query: { userId: 1 }})
        .then(res => res.json())
        .should.eventually.have.length(10));
    });

    describe('makes POST requests', () => {
      const body = {
        userId: 1,
        title: 'Something fancy',
        body: 'youp',
      };
      const options = {
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(body),
      };

      it('created the resource', () =>
        api.posts().post(options)
          .then(res => res.json())
          .then(json => {
            json.should.have.property('userId', body.userId);
            json.should.have.property('title', body.title);
            json.should.have.property('body', body.body);
          })
      );
      it('can post again', () =>
        api.posts().post(options)
          .then(res => res.json())
          .then(json => {
            json.should.have.property('userId', body.userId);
            json.should.have.property('title', body.title);
            json.should.have.property('body', body.body);
          })
      );
    });
    describe('makes PUT requests', () => {
      const id = 1;
      const userId = 101;
      const title = 'something fancy';
      const body = 'thebody';
      const options = {
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          title,
          body,
        }),
      };

      it('patches the resource', () => api.posts(id).put(options)
        .then(res => res.json())
        .then(json => {
          json.should.have.property('id', id);
          json.should.have.property('userId', userId);
          json.should.have.property('title', title);
          json.should.have.property('body', body);
        }));
    });
    describe('makes PATCH requests', () => {
      const id = 1;
      const userId = 101;
      const title = 'something fancy';
      const options = {
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          title,
        }),
      };

      it('patches the resource', () => api.posts(id).patch(options)
        .then(res => res.json())
        .then(json => {
          json.should.have.property('id', id);
          json.should.have.property('userId', userId);
          json.should.have.property('title', title);
        }));
    });
    describe('makes DELETE requests', () => {
      it('deleted the resource', () => api.posts(1).del())
    });
  });

  describe('Bugs', () => {
    it('makes successful call with no resource', () => {
      const api = new Proteus('https://jsonplaceholder.typicode.com/users');
      return api.fetch()
        .then(response => response.json())
        .should.eventually.have.length(10)
    });
    describe('can make subsequent calls on same client', () => {
      const api = new Proteus('https://jsonplaceholder.typicode.com');

      it('makes first call', () => {
        return api.users().get()
          .then(res => res.json())
          .should.eventually.have.length(10);
      });
      it('makes subsequent call on same client', () => {
        return api.users().get()
          .then(res => res.json())
          .should.eventually.have.length(10);
      });

    });
  });
});
