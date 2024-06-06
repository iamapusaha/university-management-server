import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";

import bcrypt from "bcrypt";
import config from "../../config";

const UserScheme = new Schema<TUser>(
  {
    id: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "ID is required"],
      maxlength: [20, "password can't more than 20 characters"],
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["admin", "student", "faculty"],
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
//pre save middleware/hook : will work on create() save()
UserScheme.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

//post save middleware /hook
UserScheme.post("save", function (doc, next) {
  doc.password = "";
  next();
});

export const User = model<TUser>("user", UserScheme);
