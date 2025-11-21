// app/models/User.ts
import { ObjectId } from "mongodb";

export interface UserDocument {
  _id?: ObjectId;
  id: string;
  name: string;
  email: string;
  password: string; // bcrypt hashed
  role: "user" | "admin";
  createdAt: string;
}
