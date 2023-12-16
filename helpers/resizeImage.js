import Jimp from "jimp";
import { wrapController } from "../decorators/index.js";

const resizeImage = async (imagePath, width, height) => {
  const image = await Jimp.read(imagePath);
  image.resize(width, height);
};

export default wrapController(resizeImage);
