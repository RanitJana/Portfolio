const DB_NAME = "Portfolio";
const cookieOptions = {
  maxAge: 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: true,
  sameSite: "None",
};

const _envValue = Object.freeze({
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  WHITELISTED_URI: process.env.WHITELISTED_URI,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXP: process.env.REFRESH_TOKEN_EXP,
  ACCESS_TOKEN_EXP: process.env.ACCESS_TOKEN_EXP,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
});

export { DB_NAME, _envValue, cookieOptions };
