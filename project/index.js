const fs = require('fs');
const path = require('path');

const log = require('./logger')();

const monexpress = require('./monexpress/monexpress');
const pkg = require('./package.json');

const app = monexpress();
const port = process.env.MONEXPRESS_PORT || 9000;

app.get('/', (req, res) => {
  log.debug('Called GET /');
  res.end('coucou.js');
});

app.get('/version', (req, res) => {
  log.debug('Called GET /version');
  res.end(pkg.version);
});

app.get('/tenacious', (req, res) => {
  log.debug('Called GET /tenacious');

  fs.createReadStream(path.resolve('./tend2001-10-21d1t03.mp3'))
    .pipe(res);
});

app.get('/crash', (req, res) => {
  throw new Error('Nope');
});

app.post('/', (req, res, body) => {
  log.debug('Called POST /');

  if (body.name) {
    res.end(`Hello ${body.name} !`);
  } else {
    res.end(body);
  }
});

app.listen(port, () => {
  log.info(`Le serveur tourne sur le port ${port}`);
});