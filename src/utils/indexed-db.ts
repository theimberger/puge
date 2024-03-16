import { openDB, DBSchema } from 'idb';

interface MyDB extends DBSchema {
  projects: {
    value: {
      name: string;
      rows: number[]
    };
    key: string;
    indexes: { 'by-name': string };
  };
}

const dbPromise = openDB<MyDB>('RecordNeedlesDb', 2, {
  upgrade(db) {
    const projectStore = db.createObjectStore('projects', {
      keyPath: 'name',
    });
    projectStore.createIndex('by-name', 'name');
  },
});

export const idbGet = async (key: string) => {
  return (await dbPromise).get('projects', key);
}

export const idbSet = async (val: {
  name: string;
  rows: number[]
}) => {
  return (await dbPromise).put('projects', val);
}

export const idbDel = async (key: string) => {
  return (await dbPromise).delete('projects', key);
}

export const idbClear = async () => {
  return (await dbPromise).clear('projects');
}

export const idbKeys = async () => {
  return (await dbPromise).getAllKeys('projects');
}

export const idbAll = async () => {
  return (await dbPromise).getAll('projects');
}