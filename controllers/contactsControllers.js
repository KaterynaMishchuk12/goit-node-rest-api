// contactsController.js
import contactsServices from "../services/contactsServices.js";

const { listContacts, getContactById, removeContact, addContact } =
  contactsServices;
// чи треба додавати до усіх методів next? *********

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

export const getOneContact = async (req, res) => {
  try {
    const { id } = req.params;
    const oneContact = await getContactById(id);

    if (oneContact) {
      res.json({
        status: "success",
        code: 200,
        oneContact,
      });
    } else {
      res.status(404).json({ status: "error", message: "Not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await removeContact(id);

    if (deletedContact) {
      res.status(200).json({
        status: "success",
        message: " Contact deleted",
        deletedContact,
      });
    } else {
      res.status(404).json({ status: "error", message: "Not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const createContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await addContact(name, email, phone);
    if (newContact) {
      res.status(201).json(newContact);
    } else {
      res.status(400).json({ status: "error", message: error.message });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateContact = (req, res) => {};
