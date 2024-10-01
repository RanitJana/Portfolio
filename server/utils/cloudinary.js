import { v2 as cloudinary } from "cloudinary";
import { _envValue as env } from "../constants.js";

cloudinary.config({
  cloud_name: env.CLOUDINARY_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

const uploadImage = async function (filePath, name) {
  const uploadResult = await cloudinary.uploader
    .upload(filePath, { public_id: `${name}` })
    .catch((err) => {
      console.log(err);
    });
  return uploadResult;
};
export default uploadImage;
