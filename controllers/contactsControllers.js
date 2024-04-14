import { Types } from "mongoose";
import HttpError from "../helpers/HttpError.js";
import contactsServices from "../services/contactsServices.js";

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactbyId,
  updateFavoriteStatus,
} = contactsServices;

export const getAllContacts = async (req, res) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const contacts = await listContacts({ owner }, { skip, limit });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { id } = req.params;

    const isValidId = Types.ObjectId.isValid(id);
    if (!isValidId) throw HttpError(404, "Not found");

    const oneContact = await getContactById({ _id: id, owner });

    if (!oneContact) throw HttpError(404, "Not found");

    res.status(200).json(oneContact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { id } = req.params;
    const deletedContact = await removeContact({ _id: id, owner });

    if (!deletedContact) throw HttpError(404, "Not found");

    res.status(200).json(deletedContact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { name, email, phone } = req.body;
    const newContact = await addContact({ name, email, phone, owner });
    if (!newContact) {
      throw HttpError(404, "Not found");
    }
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { id } = req.params;
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "Body must have at least one field");
    }

    const contactToUpdate = await updateContactbyId(
      { _id: id, owner },
      req.body
    );
    if (!contactToUpdate) throw HttpError(404, "Not found");

    res.status(200).json(contactToUpdate);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { id } = req.params;
    const { favorite } = req.body;

    const withUpdatedStatus = await updateFavoriteStatus(
      { _id: id, owner },
      favorite
    );
    if (!withUpdatedStatus) throw HttpError(404, "Not found");

    res.status(200).json(withUpdatedStatus);
  } catch (error) {
    next(error);
  }
};
