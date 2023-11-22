import { Schema, model } from "mongoose";
import { handleSaveError, preUpdate} from "./hooks.js";

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
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    token: String
  }, {versionKey: false, timestamps: true});

  userSchema.post("save", handleSaveError);

  userSchema.pre("findOneAndUpdate", preUpdate);

  userSchema.post("findOneAndUpdate", handleSaveError)

  const User = model('user', userSchema);

export default User