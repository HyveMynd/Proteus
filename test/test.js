const Hermes = require('../lib/Hermes');

const api = new Hermes('https://jsonplaceholder.typicode.com');

api.users(1).fetch()
  .then(response => response.json())
  .then(json => console.log(json));


let asd = new Hermes('localhost:3001');
asd.rifle().fetch()
  .catch(e => {
    console.log('NOOOOOOOOES!') // todo remove
  });

let qwe = new Hermes('localhost:3000');
qwe.rifle().shotguns().fetch()
  .then(response => console.log(response))