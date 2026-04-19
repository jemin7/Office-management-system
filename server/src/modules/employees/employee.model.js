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
    },
    jobtitle: {
      type: String,
      trim: true,
      maxlength: 50,
      required: [true, "Job title is required"],
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "department",
      required: [true, "Department is required"],
    },
    supervisor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },
    country: {
      type: String,
      required: [true, "country is required"],
    },
    state: {
      type: String,
      required: [true, "state is required"],
    },
    city: {
      type: String,
      required: [true, "city is required"],
    },
  },
  { timestamps: true },
);

export default mongoose.model("Employee", EmployeeSchema);
