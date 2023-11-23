import express from 'express';

import authController from '../../controllers/auth-controller.js';



import { userSigninSchema, userSignupSchema } from '../../schemas/user-schema.js';

import {isEmptyBody} from "../../middlewares/index.js";



const authRouter = express.Router();

authRouter.post("/signup", isEmptyBody, authController.signup);

authRouter.post("/signin", isEmptyBody, authController.signin);


export default authRouter;