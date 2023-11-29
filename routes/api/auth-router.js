import express from 'express';

import authController from '../../controllers/auth-controller.js';



import { userSigninSchema, userSignupSchema } from '../../schemas/user-schema.js';

import {authenticate, isEmptyBody} from "../../middlewares/index.js";
import validateBody from '../../decorators/validaterBody.js';



const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, validateBody(userSignupSchema), authController.signup);

authRouter.post("/login", isEmptyBody, validateBody(userSigninSchema), authController.signin);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.get("/logout", authenticate, authController.signout)

export default authRouter;