import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import User from "../models/User.js";
import gravatar from 'gravatar';
import path from "path";
import jimp from 'jimp';
import fs from "fs/promises";


import { HttpError } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

const postersPath = path.resolve("public", "avatar");

dotenv.config();
const {JWT_SECRET} = process.env;

const signup = async (req, res) => {
    const { email, password } = req.body;

    const avatarURL = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });

    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, avatar: avatarURL, password: hashPassword });

    res.status(201).json({
        username: newUser.username,
        email: newUser.email,
    });
};

const signin = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) {
        throw HttpError(401,"Email or password is wrong");
    }
    const passwordCommpare = await bcrypt.compare(password, user.password);
    if (!passwordCommpare) {
        throw HttpError(401,"Email or password is wrong" );
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "23h"});
    await User.findByIdAndUpdate(user._id, {token});
    res.json({
        token,
    })
}

const getCurrent = async(req, res) => {
    const {username, email} = req.user;

    res.json ({
        username,
        email,
    })
}

const signout = async(req, res)=> {
const {_id} = req.user;
await User.findByIdAndUpdate(_id, {token: ""})


res.json({
    message: "Signout success"
})
}


const patchAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(postersPath, filename);
    const avatar = path.join("avatar", filename);

        const image = await jimp.read(oldPath);
        await image.resize(250, 250);
        await image.writeAsync(newPath);

        await User.findByIdAndUpdate(_id, { avatarURL: avatar });

        res.status(200).json({ avatarURL: avatar });
}

export default {
    signup: ctrlWrapper(signup),
    signin: ctrlWrapper(signin),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signout),
    patchAvatar: ctrlWrapper(patchAvatar),
}