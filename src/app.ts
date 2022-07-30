import { Factory } from './Factory';

import Logger from './loaders/Logger';

async function startServer() {
  try {
    Logger.info('Init');

    const server = Factory.InitializeServer();

    server.start();
  } catch (error) {
    Logger.error('Error occured in app file :'+ error);
  }

}

startServer();