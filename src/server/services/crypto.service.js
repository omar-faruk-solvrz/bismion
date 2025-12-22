import crypto from "node:crypto";

const ALGO = "aes-256-cbc";
const KEY = Buffer.from(process.env.ENCRYPTION_KEY, "hex");

export const encrypt = (text) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGO, KEY, iv);
  return (
    iv.toString("hex") +
    ":" +
    cipher.update(text, "utf8", "hex") +
    cipher.final("hex")
  );
};

export const decrypt = (hash) => {
  const [ivHex, data] = hash.split(":");
  const decipher = crypto.createDecipheriv(
    ALGO,
    KEY,
    Buffer.from(ivHex, "hex")
  );
  return decipher.update(data, "hex", "utf8") + decipher.final("utf8");
};
