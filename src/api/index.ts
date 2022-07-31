import { Router } from 'express';
import User from './routes/User';

export default () => {
    const app = Router();

    User(app);
    return app
}