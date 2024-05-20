'use client';
/**
Storing a Single Value
// Setting a value
LocalStorageUtil.set<number>('count', 10);

// Getting a value
const count = LocalStorageUtil.get<number>('count');
console.log(count); // Output: 10

// Updating a value
LocalStorageUtil.update<number>('count', (oldCount) => oldCount ? oldCount + 1 : 1);

// Removing a value
LocalStorageUtil.remove('count');

------------

Storing an Object

interface User {
  id: string;
  name: string;
  age: number;
}

// Setting a value
LocalStorageUtil.set<User>('user', { id: '1', name: 'John', age: 30 });

// Getting a value
const user = LocalStorageUtil.get<User>('user');
console.log(user); // Output: { id: '1', name: 'John', age: 30 }

// Updating a value
LocalStorageUtil.update<User>('user', (oldUser) => oldUser ? { ...oldUser, age: oldUser.age + 1 } : null);

// Removing a value
LocalStorageUtil.remove('user');

------------

Storing an Array
// Setting a value
LocalStorageUtil.set<User[]>('users', [{ id: '1', name: 'John', age: 30 }, { id: '2', name: 'Jane', age: 25 }]);

// Getting a value
const users = LocalStorageUtil.get<User[]>('users');
console.log(users); // Output: [{ id: '1', name: 'John', age: 30 }, { id: '2', name: 'Jane', age: 25 }]

// Updating a specific item in the array
LocalStorageUtil.updateArrayItem<User>('users', '1', (oldUser) => ({ ...oldUser, age: oldUser.age + 1 }));

// Removing a specific item from the array
LocalStorageUtil.removeArrayItem<User>('users', '1');
 */

export class LocalStorageUtil {
  /**
   * Get the stored value.
   * @param key The key name.
   * @returns The value associated with the key or null.
   */
  static get<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (!item) return null;
    try {
      return JSON.parse(item) as T;
    } catch {
      return null;
    }
  }

  /**
   * Set the value in storage.
   * @param key The key name.
   * @param value The value to store.
   */
  static set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Update the stored value.
   * @param key The key name.
   * @param updater A function that takes the old value and returns a new value.
   */
  static update<T>(key: string, updater: (oldValue: T | null) => T): void {
    const oldValue = LocalStorageUtil.get<T>(key);
    const newValue = updater(oldValue);
    LocalStorageUtil.set<T>(key, newValue);
  }

  /**
   * Remove the stored value.
   * @param key The key name.
   */
  static remove(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Update a specific item in a stored array object.
   * @param key The key name.
   * @param indexOrKey The index or the key of the item in the array.
   * @param updater A function that takes the old item and returns a new item.
   */
  static updateArrayItem<T extends Record<string, unknown>>(
    key: string,
    indexOrKey: number | string,
    updater: (oldItem: T) => T
  ): boolean {
    const items: T[] | null = LocalStorageUtil.get<T[]>(key) || [];
    let updated = false;
    if (items && Array.isArray(items)) {
      if (typeof indexOrKey === 'number' && indexOrKey < items.length) {
        items[indexOrKey] = updater(items[indexOrKey]);
        updated = true;
      } else if (typeof indexOrKey === 'string') {
        const index = items.findIndex(
          item => item.hasOwnProperty('id') && item['id'] === indexOrKey
        );
        if (index !== -1) {
          items[index] = updater(items[index]);
          updated = true;
        }
      }

      if (updated) {
        LocalStorageUtil.set<T[]>(key, items);
      }
    }
    return updated;
  }

  /**
   * Remove a specific item from a stored array object.
   * @param key The key name.
   * @param indexOrKeyToDelete The index or the key of the item to delete.
   */
  static removeArrayItem<T extends Record<string, unknown>>(
    key: string,
    indexOrKeyToDelete: number | string
  ): void {
    const items: T[] | null = LocalStorageUtil.get<T[]>(key);
    if (items && Array.isArray(items)) {
      let updated = false;

      if (
        typeof indexOrKeyToDelete === 'number' &&
        indexOrKeyToDelete < items.length
      ) {
        items.splice(indexOrKeyToDelete, 1);
        updated = true;
      } else if (typeof indexOrKeyToDelete === 'string') {
        const index = items.findIndex(
          item => item.hasOwnProperty('id') && item['id'] === indexOrKeyToDelete
        );
        if (index !== -1) {
          items.splice(index, 1);
          updated = true;
        }
      }

      if (updated) {
        LocalStorageUtil.set<T[]>(key, items);
      }
    }
  }
}

export const storageKey = {
  shoppingCart: `SHOPPINGCART`,
};

export type ReturnTypeStorage<T = unknown> = {
  value: () => T[];
  add: (value: T | T[], id?: string) => ReturnType<typeof LocalStorageUtil.set>;
  adds: (value: T[]) => T[] | void;
  remove: () => ReturnType<typeof LocalStorageUtil.remove>;
  removeItem: (indexOrKeyToDelete: number | string) => void;
};

export const shoppingCartStorage = <T = any>(
  address: string
): ReturnTypeStorage<T> => {
  const key = `${address}_${storageKey['shoppingCart']}`;
  const updater = (oldItem: any) => {
    return {
      ...oldItem,
      isCart: true,
    };
  };
  const api: ReturnTypeStorage<T> = {
    value: () => LocalStorageUtil.get<T[]>(key) as T[],
    add: (value, id) => {
      if (!id || Array.isArray(value)) {
        const _value = (Array.isArray(value) ? value : []) as any[];

        const nextValue = _value
          .filter(i => i.owner !== address)
          .map(item => updater(item));

        LocalStorageUtil.set<T>(key, nextValue as T);
        return;
      }
      const isUpdate = LocalStorageUtil.updateArrayItem(key, id, updater);
      if (!isUpdate) {
        const values = api.value();
        values.push(value);
        api.add(values);
      }
    },
    adds: values => {
      const list = () => api.value() || [];
      if (list().length === 0) {
        api.add(values);
        return list();
      }
      const newList = values.filter(item => {
        const _item = item as any;
        const isUpdate = LocalStorageUtil.updateArrayItem(
          key,
          _item.id,
          updater
        );
        return !isUpdate;
      });
      if (newList.length > 0) {
        const nextList = [...list(), ...newList] as T[];
        api.add(nextList);
        return nextList as T[];
      }
      return list();
    },
    remove: () => LocalStorageUtil.remove(key),
    removeItem: id => LocalStorageUtil.removeArrayItem(key, id),
  };
  return api;
};
