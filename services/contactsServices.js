import { promises as fs } from "fs";
import path from "path";

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  try {
    const readJsonResult = await fs.readFile(contactsPath);
    const arrayOfContacts = JSON.parse(readJsonResult);

    return arrayOfContacts;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const readJsonResult = await fs.readFile(contactsPath);

    const arrayOfContacts = JSON.parse(readJsonResult);

    const contact = arrayOfContacts.find((contact) => contact.id === contactId);
    if (contact) {
      return contact;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );

    if (contactIndex !== -1) {
      const contactToRemove = contacts.splice(contactIndex, 1)[0];

      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

      return contactToRemove;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContactId = Date.now().toString();
    const newContact = { id: newContactId, name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {}
}

export default { listContacts, getContactById, removeContact, addContact };
