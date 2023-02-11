import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = fileURLToPath(new URL(".", import.meta.url));

const contactsPath = path.join(__dirname, "db/contacts.json");

export const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const next = JSON.parse(data);
  console.table(next);
};

export const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const next = JSON.parse(data);
  const user = next.filter(({ id }) => id === contactId);
  console.table(user);
};

export const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const next = JSON.parse(data);
  const newContacts = next.filter(({ id }) => id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));

  listContacts();
};

export const addContact = async (name, email, phone) => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const next = JSON.parse(data);

  next.push({ name, email, phone, id: uuidv4() });

  await fs.writeFile(contactsPath, JSON.stringify(next));
  listContacts();
};
