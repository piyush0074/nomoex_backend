
import mongoose from 'mongoose';
import logger from "../loaders/Logger";
import config from "../config";

const User = require('./User')

export class Mongodb {

    init(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            logger.info('Mongodb init.');
            try {
                const mongoDB = config.DatabaseURL;
                logger.info("URI : " + mongoDB)
                await mongoose.connect(mongoDB);
                const db = mongoose.connection;
                // Bind connection to error event (to get notification of connection errors)
                db.on('error',
                    // tslint:disable-next-line:no-console
                    console.error.bind(console, 'MongoDB connection error:'));
                return resolve();
            } catch (err) {
                logger.error('Initialize mongodb failed. ' + err)
                return reject(err);
            }
        });
    }

    getUser(email: string): Promise<any> {
        return new Promise(async(resolve, reject) => {
            let userData:any;
            try {
                userData = User.findOne({
                    email
                })
                if(userData !== null ) return resolve(userData);
                return reject(null);
            } catch (err) {
                logger.error('Error while fetching user : '+err);
                return reject(err);
            }
        })
    }

    setUser(
        username: string,
        email: string,
        password: string
    ): Promise<any> {
        return new Promise(async(resolve, reject) => {
            try{
                const user = new User({
                    email,
                    username,
                    password
                })
                await user.save();
                return resolve(user);
            } catch(err) {
                logger.error('Error while saving new user : '+err);
                return reject(err);
            }
        })
    }
}