const Hermes = require('../lib/Hermes');

const api = new Hermes('localhost:3000');


api.rifles().get()
  .then(resp => resp.json())
  .then(json => console.log(json));

let asd = new Hermes('localhost:3001');
asd.rifle().exec()
  .catch(e => {
    console.log('NOOOOOOOOES!') // todo remove
    console.log('Its ok :)') // todo remove
  });