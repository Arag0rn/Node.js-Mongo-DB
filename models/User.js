import { Schema, model } from "mongoose";
import { handleSaveError, preUpdate} from "./hooks.js";
import Joi from "joi";


const userSchema = new Schema ({
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
    token: String
  }, {versionKey: false, timestamps: true});

  userSchema.post("save", handleSaveError);

  userSchema.pre("findOneAndUpdate", preUpdate);

  userSchema.post("findOneAndUpdate", handleSaveError)

  const User = model('user', userSchema);


export default User