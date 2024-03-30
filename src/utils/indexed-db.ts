import { openDB, DBSchema } from 'idb';
import BudgetType from '../types/BudgetType';
import { getDateString } from '../screens/CurrentBudget/utils';

interface LineType {
  change: number;
  date: string;
}

interface MyDB extends DBSchema {
  selected: {
    value: string;
    key: string;
  }
  budgets: {
    value: {
      name: string;
      unit: string;
      unitPlacement: string;
      theme: string;
      period: string;
      rolling: boolean;
      limit: number;
      current: number;
      lines: LineType[];
      decimalType: string;
      lastInterval: string;
    };
    key: string;
    indexes: { 'by-name': string };
  };
}

const dbPromise = openDB<MyDB>('PugeDb', 4, {
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

export const addBudgetRecord = async (val: BudgetType) => {
  const newBudget = {
    name: val.name,
    unit: val.unit,
    unitPlacement: val.unitPlacement,
    theme: val.theme,
    period: val.period,
    rolling: val.rolling,
    limit: val.decimalType === "none" ? val.limit : val.limit * 100,
    current: val.decimalType === "none" ? val.limit : val.limit * 100,
    lines: val.lines || [],
    decimalType: val.decimalType,
    lastInterval: getDateString(),
  };

  return (await dbPromise).put('budgets', newBudget);
}

export const addBudgetLine = async (key: string, line: LineType) => {
  const budget = await idbGet(key);
  if (budget) {
    budget.lines.push(line);
    budget.current += line.change;
    (await dbPromise).put('budgets', budget);
    return budget;
  }
}

export const updateBudgetInterval = async (key: string, interval: string) => {
  const budget = await idbGet(key);
  if (budget) {
    budget.lastInterval = interval;
    (await dbPromise).put('budgets', budget);
    return budget;
  }
}

export const setCurrentBudgetValue = async (key: string, value: number) => {
  const budget = await idbGet(key);
  if (budget) {
    budget.current = value;
    (await dbPromise).put('budgets', budget);
    return budget;
  }
}

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