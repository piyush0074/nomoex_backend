import { Router } from 'express';
import { User } from '../../controller/User';
import middlewares from '../middlewares';

const route = Router();

export default ( app: Router) => {
    app.use('',route);
    const user = new User()
    route.post(
        '/register',
        middlewares.UserReqValidate.registerReq,
        (req, res) => {
        user.registerUser(req, res)
    });

    route.post(
        '/login',
        middlewares.UserReqValidate.loginReq,
        (req, res) => {
        user.loginUser(req, res)
    });

}