import express from 'express';
import Logger from './loaders/Logger';
import { Server } from './loaders/Server';
import { Mongodb } from './models/Mongo';

export class Factory {
  static InitializeServer(): Server {
    try {
      Logger.info('index.InitializeServer');
      const app = express();
      const mongodb = new Mongodb();
      return Server.getInstance(
        app,
        mongodb,
      );
    } catch (error) {
      Logger.error('Error occured in factory while initializing server '+error);
    }
}
}