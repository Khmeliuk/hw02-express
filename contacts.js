const fs = require("fs").promises;
const path = require("path");
const getID = require("uniqid");

const contactsPath = path.resolve("db/contacts.json");

async function takeAllContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(contacts);
  } catch (err) {
    console.error(err);
  }
}

async function listContacts() {
  try {
    console.table(await takeAllContacts());
  } catch (err) {
    console.error(err);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await takeAllContacts();
    const result = contacts.find(
      (contact) => contact.id.toString() === contactId.toString()
    );
    console.table(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await takeAllContacts();
    const result = contacts.filter(
      (contact) => contact.id.toString() !== contactId.toString()
    );
    fs.writeFile(contactsPath, JSON.stringify(result));
    console.log(`Contact with id ${contactId} is deleted`);
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await takeAllContacts();
    const newContact = { id: getID(), name, email, phone };
    const newContactList = [...contacts, newContact];
    fs.writeFile(contactsPath, JSON.stringify(newContactList));
    console.log("Contact added", newContact);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
