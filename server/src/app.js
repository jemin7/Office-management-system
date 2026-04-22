import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import employeeRoutes from "./modules/employees/employee.routes.js";
import departmentRoutes from "./modules/departments/department.routes.js";
import { verifyAuth } from "./modules/auth/auth.middleware.js";
const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = (process.env.CLIENT_URLS || process.env.CLIENT_URL || "")
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean);

      if (!origin || allowed.length === 0 || allowed.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is healthy" });
});

app.use("/api/auth", authRoutes);
app.use("/api/employees", verifyAuth, employeeRoutes);
app.use("/api/departments", verifyAuth, departmentRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});
export default app;
