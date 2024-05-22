const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    console.table(contacts);
  } catch (err) {
    console.error(err);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId);
    if (contact) console.table([contact]);
    else console.log("Contact not found!");
  } catch (err) {
    console.error(err);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    console.log(
      `Contact with the id ${contactId} has been removed successfully!`
    );
    listContacts();
  } catch (err) {
    console.error(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const newContact = {
      id: (contacts.length + 1).toString(),
      name,
      email,
      phone,
    };
    const updatedContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    console.log("Contact added successfully");
    listContacts();
  } catch (err) {
    console.error(err);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
