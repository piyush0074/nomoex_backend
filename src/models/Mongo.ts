
import mongoose from 'mongoose';
import logger from "../loaders/Logger";
import config from "../config";

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
}