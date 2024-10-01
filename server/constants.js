const DB_NAME = "Portfolio";
const cookieOptions = {
  httpOnly: true,           // Prevents JavaScript access to cookies (recommended for session/auth cookies)
  secure: true,             // Ensures cookies are sent only over HTTPS
  sameSite: 'None',         // Required for cross-site cookies; must be 'None' for cookies to work across domains
  path: '/',                // Makes cookies available site-wide
  maxAge: 24 * 60 * 60 * 1000, // Set cookie expiration (e.g., 1 day in milliseconds)
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
