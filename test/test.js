const Hermes = require('../lib/Hermes');

const api = new Hermes('localhost:3000');
api.rifles().get().then(resp => {
  return resp.json()
}).then(json => console.log(json)).catch(e => console.log(e));

let asd = new Hermes('localhost:3001');
asd.get().then(resp => console.log(resp));