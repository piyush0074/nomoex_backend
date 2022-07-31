import { Request, Response } from 'express';
import Joi from 'joi';
import logger from '../../loaders/Logger';
import { BadRequestError } from '../../core/APIerror';

export class UserReqValidate {

    public static registerReq(req: Request, res: Response, next: any){
        const schemaRules = {
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            username: Joi.string().alphanum().min(3).max(12).required(),
            password: Joi.string().min(8).max(12).required(),
        }
        const schema = Joi.object(schemaRules);

        const { error, value } = schema.validate(req.body);

        if(error) {
            logger.error(JSON.stringify(error));
            throw new BadRequestError(JSON.stringify(error));
            // new BadRequestResponse(JSON.stringify(error)).send(res);
        } else {
            next();
        }
    }

    public static loginReq(req: Request, res: Response, next: any){
        const schemaRules = {
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().min(8).max(12).required(),
        }
        const schema = Joi.object(schemaRules);

        const { error, value } = schema.validate(req.body);

        if(error) {
            logger.error(JSON.stringify(error));
            throw new BadRequestError(JSON.stringify(error));
            // new BadRequestResponse(JSON.stringify(error)).send(res);
        } else {
            next();
        }
    }
}