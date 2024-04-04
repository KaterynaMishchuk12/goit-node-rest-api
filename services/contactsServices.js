import { promises as fs } from "fs";
import path from "path";
import { v4 } from "uuid";
import { Contact } from "../models/contactModel.js";

const contactsPath = path.resolve("./db", "contacts.json");

async function listContacts() {
  try {
    const contacts = await Contact.find();
    return contacts;
    // const readJsonResult = await fs.readFile(contactsPath);
    // const arrayOfContacts = JSON.parse(readJsonResult);
    // return arrayOfContacts;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
    // const contacts = await listContacts();
    // return contacts.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contactToRemomve = await Contact.findByIdAndDelete(contactId);
    return contactToRemomve;
    // const contacts = await listContacts();
    // const contactIndex = contacts.findIndex(
    //   (contact) => contact.id === contactId
    // );

    // if (contactIndex !== -1) {
    //   const contactToRemove = contacts.splice(contactIndex, 1)[0];

    //   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    //   return contactToRemove || null;
    // }
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(data) {
  try {
    const newContact = await Contact.create(data);
    // const contacts = await listContacts();
    // const newContactId = v4();
    // const newContact = { id: newContactId, name, email, phone };
    // contacts.push(newContact);
    // await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {}
}

async function updateContactbyId(id, data) {
  try {
    const contactToUpdate = await Contact.findByIdAndUpdate(id, data, {
      new: true,
    });
    return contactToUpdate;
    // const contacts = await listContacts();
    // const contactToUpdate = contacts.findIndex((contact) => contact.id === id);
    // if (contactToUpdate === -1) {
    //   return null;
    // }
    // contacts[contactToUpdate] = { ...contacts[contactToUpdate], ...data };
    // await fs.writeFile(contactsPath, JSON.stringify(contacts));

    // return contacts[contactToUpdate];
  } catch (error) {
    console.log(error);
  }
}

async function updateFavoriteStatus(id) {}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactbyId,
  updateFavoriteStatus,
};
