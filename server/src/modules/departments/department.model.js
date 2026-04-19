import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 1,
      maxlength: 100,
      required: [true, "Department name is required"], 
    },
  },
  { timestamps: true },
); 

export default mongoose.model("Department", departmentSchema);
