import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    maxlength: 200,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    unique: true,
    minlength: 8,
    minlength: 200,
    Select: false,
    required: [true, "password is required"],
  },

  resetPasswordtoken: { type: String, Select: false },
  refreshtoken: { type: String, Select: false },
  resetPasswordtoken: { type: String, Select: false },
  resetPasswordExpires: { type: String, Select: false },
});

export default mongoose.model("Admin", adminSchema);
