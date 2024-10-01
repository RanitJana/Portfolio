const DB_NAME = "Portfolio";
const cookieOptions = {
  httpOnly: true,        // Prevent access via JavaScript
  secure: true,          // Ensures the cookie is sent over HTTPS
  sameSite: 'none',       
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
