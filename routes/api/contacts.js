import contactsController from '../../controllers/contacts-controller.js'


import express from 'express';

import {isEmptyBody, isValidId} from "../../middlewares/index.js";


const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getAllContacts);

contactsRouter.get('/:id', isValidId, contactsController.getByID);

contactsRouter.post('/', isEmptyBody, contactsController.add);

contactsRouter.patch("/:id/favorite", isValidId, isEmptyBody, contactsController.updateById)

contactsRouter.delete('/:id', contactsController.deleteById)

contactsRouter.put('/:id', isValidId, isEmptyBody, contactsController.updateById);

export default contactsRouter;
