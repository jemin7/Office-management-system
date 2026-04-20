import crypto from "crypto";

export const generateToken = () => {
  const rawtoken = crypto.randomBytes(32).toString("hex");
  const hashedtoken = crypto
    .createHash("sha256")
    .update(rawtoken)
    .digest("hex");

  return { rawtoken, hashedtoken };
};