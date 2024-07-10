import { Schema, model, models } from "mongoose";

export default interface IUser {
  name: string;
  email: string;
  username: string;
  password?: string;
  googleId?: string;
  githubId?: string;
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
  },
  githubId: {
    type: String,
  },
});

export const User = models?.User || model("User", userSchema);
