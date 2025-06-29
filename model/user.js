// models/user.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: Number, required: true, unique: true },
  batchYear: { type: Number, required: true },
  department: { type: String, required: true },
  password: { type: String, required: true }, // <-- added password field
}, { collection: "user" });

export default mongoose.models.User || mongoose.model("User", UserSchema);
