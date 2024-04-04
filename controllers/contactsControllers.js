import Types from "mongoose";
import HttpError from "../helpers/HttpError.js";
import contactsServices from "../services/contactsServices.js";

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactbyId,
} = contactsServices;

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    // const isValidId = Types.ObjectId.isValid(id);  не хоче працювати
    // if (!isValidId) throw HttpError(404, "Not found");

    const oneContact = await getContactById(id);

    if (!oneContact) throw HttpError(404, "Not found");

    res.status(200).json(oneContact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedContact = await removeContact(id);

    if (!deletedContact) throw HttpError(404, "Not found");

    res.status(200).json(deletedContact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await addContact({ name, email, phone });
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
    const { id } = req.params;
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "Body must have at least one field");
    }

    const contactToUpdate = await updateContactbyId(id, req.body);
    if (!contactToUpdate) throw HttpError(404, "Not found");

    res.status(200).json(contactToUpdate);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
};
