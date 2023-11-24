import express from 'express';

import authController from '../../controllers/auth-controller.js';



import { userSigninSchema, userSignupSchema } from '../../schemas/user-schema.js';

import {authenticate, isEmptyBody} from "../../middlewares/index.js";



const authRouter = express.Router();

authRouter.post("/signup", isEmptyBody, authController.signup);

authRouter.post("/signin", isEmptyBody, authController.signin);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.get("/signout", authenticate, authController.signout)

export default authRouter;