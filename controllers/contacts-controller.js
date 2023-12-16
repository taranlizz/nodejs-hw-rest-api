import fs from "fs/promises";
import path from "path";
import { HttpError } from "../helpers/index.js";
import wrapController from "../decorators/controllerWrapper.js";
import Contact from "../models/Contact.js";

const avatarsPath = path.resolve("public", "avatars");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email");
  res.json(result);
};

const getByID = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findById({ contactId, owner });
  if (!result) {
    return next(HttpError(404, "Not found"));
  }
  res.json(result);
};

const add = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarsPath, filename);
  await fs.rename(oldPath, newPath)
  const result = await Contact.create({ ...req.body, owner });

  res.status(201).json(result);
};

const deleteByID = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findByIdAndDelete({ contactId, owner });
  if (!result) {
    return next(HttpError(404, "Not found"));
  }
  res.json({ message: "contact deleted" });
};

const update = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findByIdAndUpdate(
    { contactId, owner },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!result) {
    return next(HttpError(404, "Not found"));
  }
  res.json(result);
};

export default {
  getAll: wrapController(getAll),
  getByID: wrapController(getByID),
  add: wrapController(add),
  deleteByID: wrapController(deleteByID),
  update: wrapController(update),
};
