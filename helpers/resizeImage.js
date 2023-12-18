import Jimp from "jimp";
import { HttpError } from "../helpers/index.js";

const resizeImage = async (imagePath, storePath, width, height) => {
  try {
    const image = await Jimp.read(imagePath);
    image.resize(width, height).write(storePath);
  } catch (error) {
    throw HttpError(500, error.message);
  }
};

export default resizeImage;
