import { Express, Request, Response, NextFunction } from 'express';
import express from 'express';
import routes from '../api';
import logger from './Logger';
import config from '../config';
import { Mongodb } from '../models/Mongo';
import { NotFoundError, ApiError, InternalError } from '../core/APIerror';

import cors from 'cors';
import * as http from "http";
import * as socketio from "socket.io";
import { verify } from 'jsonwebtoken';
import axios from'axios';

export class Server {
  static instance: Server;
    static socket: any;
  static getInstance(
    app: Express,
    mongodb: Mongodb
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
    public mongodb: Mongodb
  ) {
  }

  async start() {
    try {
      await this.mongodb.init();


      const corsOptions = {
        origin: '*',
      }
      this.app.use(cors(corsOptions));
      this.app.options('*', cors());

      this.app.use(express.json());

      this.app.use(express.urlencoded({
        extended: true
      }));


      this.app.use(config.api.prefix, routes());
      logger.info('Routes initialize.');


      this.app.listen(config.port, () => {
        logger.info('******Server listening on PORT: ' + config.port + '******');
      });


      this.app.use((req, res, next) => next(new NotFoundError()));
      this.initSocketConnection();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof ApiError) {
          ApiError.handle(err, res);
        } else {
          if (process.env.NODE_ENV === 'development') {
              logger.error(err);
              return res.status(500).send(err.message);
            }
            console.log(req.body)
          logger.error('Error server : '+err);
          ApiError.handle(new InternalError('internal error...'), res);
        }
      });
    } catch (error) {
      logger.error('Server error occured in server.start ' + error);
    }
  }

  private async  sendData(io:any) {
      setInterval( async() => {
        const response = await axios.get(config.binanceAPI);
        if(response) {
            logger.silly('send crypto data')
            io.emit('message',{'data':JSON.stringify(response.data)})
        }
    },5000)
    }

  private initSocketConnection() {
    const server = http.createServer();
    const io = new socketio.Server(server, {cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }});

    server.listen(3000)
    Server.socket = io;


    io.on("connection", (socket) => {
        logger.silly(socket.id)
        this.sendData(socket)
        });
  }

}