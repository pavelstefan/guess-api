require('dotenv').config();

const app = require('../app');
const debug = require('debug')('guess-api:server');
const http = require('http');

const port = process.env.PORT || '8080';
app.set('port', port);

const db = require('../utils').db;
const models = require('../models');

Promise.all([
  db.initializeDbConnection().then(
    () => models.sync()
  )
]).then(() => {
  const server = http.createServer(app);

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }

  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
}).catch((e) => {
  console.info("Couldn't start the server. An error occured");
  console.error(e)
})
