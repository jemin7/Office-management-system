import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/common/config/db.js";

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();

  return app.listen(PORT, () => {
    console.log(
      `sever is running on the PORT:${PORT} in ${process.env.NODE_ENV} mode`,
    );
  });
}

start().catch((err) => {
  console.log("fail to start the server", err);
  process.exit(1);
});
