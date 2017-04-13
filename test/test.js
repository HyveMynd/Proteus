const Proteus = require('../lib/Proteus');

const api = new Proteus('https://jsonplaceholder.typicode.com');

api.users(1).fetch()
  .then(response => response.json())
  .then(json => console.log(json));


let asd = new Proteus('localhost:3001');
asd.noexist().fetch()
  .catch(e => {
    console.log('NOOOOOOOOES!') // todo remove
  });

let qwe = new Proteus('localhost:3000');
qwe.rifle().shotguns().fetch()
  .then(response => console.log(response))