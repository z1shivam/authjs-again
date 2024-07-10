import { Model, Schema, model, models } from "mongoose";

interface User {
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
    select:false
  },
  googleId: {
    type: String,
  },
  githubId: {
    type: String,
  },
});

 const User = models?.User as Model<User> || model("User", userSchema);
 export default User