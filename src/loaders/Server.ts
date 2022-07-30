import { Express, Request, Response, NextFunction } from 'express';
import express from 'express';
import routes from '../api';
import logger from './Logger';
import config from '../config';
import { Mongodb } from '../models/Mongo';
import { NotFoundError, ApiError, InternalError } from '../core/APIerror';

export class Server {
  static instance: Server;

  static getInstance(
    app: Express,
    mongodb: Mongodb,
  ) {
    if (Server.instance === undefined || Server.instance === null) {
      Server.instance = new Server(
        app,
        mongodb
              );
    }
    return Server.instance;
  }

  private constructor(
    public app: Express,
    public mongodb: Mongodb,
  ) { }

  async start() {
    try {
      await this.mongodb.init();

      this.app.use(express.json());

      this.app.use(express.urlencoded({
        extended: true
      }));

      // this.app.use(getAccessLogger())
      // this.app.use(this.uniqueId);
      this.app.use(config.api.prefix, routes());
      logger.info('Routes initialize.');

      this.app.listen(config.port, () => {
        logger.info('******Server listening on PORT: ' + config.port + '******');
      });

      this.app.use((req, res, next) => next(new NotFoundError()));

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof ApiError) {
          ApiError.handle(err, res);
        } else {
          if (process.env.NODE_ENV === 'development') {
            logger.error(err);
            return res.status(500).send(err.message);
          }
          logger.error(err);
          ApiError.handle(new InternalError('internal error...'), res);
        }
      });
    } catch (error) {
      logger.error('Server error occured in server.start ' + error);
    }
  }
  private uniqueId(req: Request, res: Response, next: NextFunction) {
    next();
  }
}