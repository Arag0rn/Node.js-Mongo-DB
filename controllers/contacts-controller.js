import { contactAddSchema, contactUpdateSchema, ContactFavoriteSchema } from "../schemas/contacts-schema.js";

import Contact from "../models/Contact.js";

import {HttpError} from "../helpers/index.js"




const getAllContacts = async (req, res, next) => {
    try{
    const result = await Contact.find()
    res.json(result)
 }
 catch(error){
    res.status(500).json({
        message: error.message,
    })
 }
}

const getByID = async (req, res, next) => {
    try{
    const {id} = req.params;
    const result = await Contact.findById(id);
    if(!result){
        throw HttpError (404, `Contact with id=${id} not found`);
    }
    res.json(result);

}catch(error){
    next(error);
}
  }

const add = async (req, res, next) => {
 try {
    const {error} = contactAddSchema.validate(req.body);
    if (error){
        throw HttpError(400, error.message);
    }
    const result = await Contact.create(req.body);

    res.status(201).json(result);

 } catch (error) {
    next(error)
 }
}

ContactFavoriteSchema

const updateById = async(req, res, next)=>{
 try {
    const {error} = contactUpdateSchema.validate(req.body);
    if (error){
        throw HttpError(400, error.message);
    }
    const {id} = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body);
    if(!result){
        throw HttpError (404, `Contact with id=${contactId} not found`);
    }

    res.json(result);

 } catch (error) {
    next(error);
 }
}

const deleteById = async(req, res, next)=>{
    try {
        const {id} = req.params;
        const result = await Contact.findByIdAndDelete(id);
        if(!result){
            throw HttpError (404, `Contact with id=${contactId} not found`);
        }
        res.json({
            message: "contact deleted"
        })
    } catch (error) {
        next(error);
    }
}

export default {
    getAllContacts,
    getByID,
    add,
    updateById,
    deleteById,
}