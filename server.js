require('dotenv').config();

const app = require('./app');
const { db } =  require('./connection/mongoDB');
const SERVER_CONFIG = require('./utils/env');

const port = normalizePort(SERVER_CONFIG.port);
app.set('port', port);

db.then(() => {
    app.listen(SERVER_CONFIG.port, () => {
      console.log(`Server listening on ${SERVER_CONFIG.port}`);
    });
});
app.on('error', onError);
app.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.log(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.log(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
}
  
  /**
   * Event listener for HTTP server "listening" event.
   */
  
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}


process.on('SIGINT', async () => {
    process.exit(0);
});
  