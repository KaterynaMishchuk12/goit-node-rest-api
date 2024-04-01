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
    res.json({
      status: "success",
      code: 200,
      contacts,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    // треба робити checkID ***************
    const { id } = req.params;
    const oneContact = await getContactById(id);

    if (oneContact) {
      res.json({
        status: "success",
        code: 200,
        oneContact,
      });
    } else {
      throw HttpError(404, "Not found");
    }
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedContact = await removeContact(id);

    if (deletedContact) {
      res.status(200).json({
        status: "success",
        message: "Contact deleted",
        deletedContact,
      });
    } else {
      throw HttpError(404, "Not found");
    }
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await addContact(name, email, phone);
    if (newContact) {
      res.status(201).json(newContact);
    } else {
      throw HttpError(404, "Not found");
    }
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    // треба робити checkID ***************
    const { id } = req.params;
    const contactToUpdate = await updateContactbyId(id, req.body);
    res.status(200).json(contactToUpdate);
  } catch (error) {
    next(error);
  }
};
