import { openDB, DBSchema } from 'idb';

interface MyDB extends DBSchema {
  selected: {
    value: string;
    key: string;
  }
  budgets: {
    value: {
      name: string;
      unit: string;
      period: string;
      rolling: boolean;
      limit: number;
      lines: number[];
      useDecimal: boolean;
    };
    key: string;
    indexes: { 'by-name': string };
  };
}

const dbPromise = openDB<MyDB>('PugeDb', 1, {
  upgrade(db) {
    const budgetstore = db.createObjectStore('budgets', {
      keyPath: 'name',
    });
    budgetstore.createIndex('by-name', 'name');
  },
});

export const idbGet = async (key: string) => {
  return (await dbPromise).get('budgets', key);
}

// export const idbSet = async (val: {
//   name: string;
//   rows: number[]
// }) => {
//   return (await dbPromise).put('budgets', val);
// }

export const idbDel = async (key: string) => {
  return (await dbPromise).delete('budgets', key);
}

export const idbClear = async () => {
  return (await dbPromise).clear('budgets');
}

export const idbKeys = async () => {
  return (await dbPromise).getAllKeys('budgets');
}

export const idbAll = async () => {
  return (await dbPromise).getAll('budgets');
}