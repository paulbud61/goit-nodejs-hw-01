const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const yargs = require("yargs");

const argv = yargs
  .command("list", "List all contacts")
  .command("get", "Get contact by id", {
    id: {
      describe: "Contact ID",
      demandOption: true,
      type: "string",
    },
  })
  .command("add", "Add a new contact", {
    name: {
      describe: "Contact name",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "Contact email",
      demandOption: true,
      type: "string",
    },
    phone: {
      describe: "Contact phone",
      demandOption: true,
      type: "string",
    },
  })
  .command("remove", "Remove a contact by id", {
    id: {
      describe: "Contact ID",
      demandOption: true,
      type: "string",
    },
  })
  .help().argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      await listContacts();
      break;
    case "get":
      await getContactById(id);
      break;
    case "add":
      await addContact(name, email, phone);
      break;
    case "remove":
      await removeContact(id);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
