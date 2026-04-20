import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 100,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email is required"],
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Invalid email"],
    },
    jobtitle: {
      type: String,
      trim: true,
      maxlength: 50,
      required: [true, "Job title is required"],
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: [true, "Department is required"],
    },
    supervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },
    country: {
      type: String,
      trim: true,
      required: [true, "Country is required"],
    },
    state: { type: String, trim: true, required: [true, "State is required"] },
    city: { type: String, trim: true, required: [true, "City is required"] },
  },
  { timestamps: true },
);

export default mongoose.model("Employee", EmployeeSchema);
