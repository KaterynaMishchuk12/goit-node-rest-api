import { Contact } from "../models/contactModel.js";

async function listContacts({ owner }) {
  try {
    const contacts = await Contact.find({ owner });
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById({ _id, owner }) {
  try {
    const contact = await Contact.findOne({ _id, owner });
    return contact;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact({ _id, owner }) {
  try {
    const contactToRemomve = await Contact.findOneAndDelete({ _id, owner });
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
    const contactToUpdate = await Contact.findOneAndUpdate(id, data, {
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
    const statusToUpdate = await Contact.findOneAndUpdate(contactId, status, {
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
