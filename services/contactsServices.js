import { Contact } from "../models/contactModel.js";

async function listContacts() {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contactToRemomve = await Contact.findByIdAndDelete(contactId);
    return contactToRemomve;
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(data) {
  try {
    const newContact = await Contact.create(data);

    return newContact;
  } catch (error) {}
}

async function updateContactbyId(id, data) {
  try {
    const contactToUpdate = await Contact.findByIdAndUpdate(id, data, {
      new: true,
    });
    return contactToUpdate;
  } catch (error) {
    console.log(error);
  }
}

async function updateFavoriteStatus(contactId, data) {
  try {
    const status = { favorite: data };
    const statusToUpdate = await Contact.findByIdAndUpdate(contactId, status, {
      new: true,
    });
    return statusToUpdate;
  } catch (error) {
    console.log(error);
  }
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactbyId,
  updateFavoriteStatus,
};
