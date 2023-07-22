import { openDB } from "idb";
import { v4 as uuidv4 } from "uuid";

const initdb = async () => {
  const jateDb = await openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { autoIncrement: true });
      console.log("jate database created");
    },
  });
};

export const putDb = async (content) => {
  const id = uuidv4(); // Generate a new UUID as the key
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  await store.put({ id, jate: content });
  await tx.done;
  console.log("🚀 - data saved to the database");
};

export const getDb = async () => {
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const data = await store.getAll();
  console.log("data", data);
  return data;
};

initdb();
