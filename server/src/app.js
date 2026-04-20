import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import employeeRoutes from "./modules/employees/employee.routes.js";
import departmentRoutes from "./modules/departments/department.routes.js";
import verifyAdmin from "./modules/auth/auth.middleware.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/employees", verifyAdmin, employeeRoutes);
app.use("/api/departments", verifyAdmin, departmentRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});
export default app;
