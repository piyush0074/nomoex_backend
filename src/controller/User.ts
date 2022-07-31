import { Request, Response } from 'express';
import { Server } from '../loaders/Server';
import logger from '../loaders/Logger';
import bcrypt from 'bcrypt';
import jwt, { decode, verify } from 'jsonwebtoken';
import { BadRequestResponse, CreateResponse, DuplicateResponse, SuccessMsgResponse, SuccessResponse } from '../core/APIresponse';
import config from '../config';
import axios from 'axios';


export class User {

    public async registerUser(req: Request, res: Response) {
        logger.info('register new user')
        try {
            if(!await this.isUserexists(req)) {
                const hashpassword = await this.getHashPassword(req.body.password);
                logger.silly('saving new user')
                await Server.instance.mongodb.setUser(
                    req.body.username,
                    req.body.email,
                    hashpassword
                )
                return new CreateResponse('created').send(res);
            }
            return new DuplicateResponse('Email already exits').send(res)
        } catch(err) {
            logger.error('Error register user : '+err);
            return new BadRequestResponse('err : '+err).send(res)
        }
    }

    public async loginUser(req: Request, res: Response) {
        logger.info('Logging in user')
        let token: string;
        try {
            const user = await Server.instance.mongodb.getUser(
                req.body.email,
            )
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (
                validPassword
            ) {
                token = this.generateToken(req.body.email);

                // this.connectSocket()
                return new SuccessResponse('Login in sccuessfull', {
                    token
                }).send(res);
            } else {
                return new BadRequestResponse('invalid email or password').send(res);
            }
        } catch(err) {
            logger.error('Error in login : '+err)
            return new BadRequestResponse('User doesnt exists. error : '+err).send(res);
        }
    }

    // private connectSocket() {
    //     Server.socket.on("connection", (socket:any) => {
    //         logger.silly(socket.id)
    //         });
    // }

    private generateToken(email: string): string {
        logger.info('generating token')
        const jwtSecretKey = config.jwtSecret;
        const data: {[id: string]: string} = {
            email,
        }
        const token = jwt.sign(
            { email },
            config.jwtSecret,
            { expiresIn: '2h' }
        );
        return token

    }

    private async isUserexists(req: Request) {
        logger.silly('checking user exist or not')
        const email: string = req.body.email;
        let user: any;
        try {
            user = await Server.instance.mongodb.getUser(email);
            logger.silly(JSON.stringify(user))
            if(user === null) return false;
            return true;
        } catch(err) {
            return err;
        }
    }

    private async getHashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword
    }
}