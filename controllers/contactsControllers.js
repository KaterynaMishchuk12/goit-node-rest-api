// contactsController.js
import contactsService from "../services/contactsServices.js";
import contactsServices from "../services/contactsServices.js";

const { listContacts, getContactById, removeContact, addContact } =
  contactsServices;
// чи треба додавати до усіх методів next? *********

export const getAllContacts = (req, res) => {
  const contacts = listContacts();
  res.json({
    status: "success",
    code: 200,
    data: { contacts },
  });
};

export const getOneContact = (req, res) => {
  const oneContact = getContactById();
  const { id } = req.params;
  // може так??
  // if (oneContact.id === id) { res.json({
  //     status: "success",
  //     code: 200,
  //     data: { oneContact },
  // })} else res.json({status: 'fail', code: 404, message: 'Not found'})

  res.json({
    status: "success",
    code: 200,
    data: { oneContact },
  });
};

export const deleteContact = (req, res) => {};

export const createContact = (req, res) => {};

export const updateContact = (req, res) => {};
