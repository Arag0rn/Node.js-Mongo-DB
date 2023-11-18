import contactsController from '../../controllers/contacts-controller.js'


import express from 'express';

import {isEmptyBody, isEmptyFavorite, isValidId} from "../../middlewares/index.js";



const contactsRouter = express.Router();

contactsRouter.get('/', contactsController.getAllContacts);

contactsRouter.get('/:contactId', isValidId, contactsController.getByID);

contactsRouter.post('/', isEmptyBody, contactsController.add);

contactsRouter.patch("/:contactId/favorite", isValidId, isEmptyFavorite, contactsController.updateStatusContact)

contactsRouter.delete('/:contactId', contactsController.deleteById)

contactsRouter.put('/:contactId', isValidId, isEmptyBody, contactsController.updateById);

export default contactsRouter;
