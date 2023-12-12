import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
import validateBody from "../../decorators/bodyValidator.js";
import {
  addContactSchema,
  patchContactSchema,
  updateContactSchema,
} from "../../schemas/contacts-schemas.js";
import {
  isEmptyBody,
  isValidId,
  authenticate,
} from "../../middlewars/index.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", isValidId, contactsController.getByID);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(addContactSchema),
  contactsController.add
);

contactsRouter.delete("/:contactId", isValidId, contactsController.deleteByID);

contactsRouter.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  validateBody(updateContactSchema),
  contactsController.update
);

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  validateBody(patchContactSchema),
  contactsController.update
);

export default contactsRouter;
