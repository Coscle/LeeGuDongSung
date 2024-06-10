export const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('UserDatabase', 1);

    request.onerror = (event) => {
      console.error('Database error:', event.target.error);
      reject('Database error');
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const objectStore = db.createObjectStore('users', { keyPath: 'email' });
      objectStore.createIndex('email', 'email', { unique: true });
      objectStore.createIndex('phoneNumber', 'phoneNumber', { unique: false });
      objectStore.createIndex('nickname', 'nickname', { unique: false });
      objectStore.createIndex('tags', 'tags', { unique: false });
      objectStore.createIndex('snsType', 'snsType', { unique: false });
      objectStore.createIndex('snsAddress', 'snsAddress', { unique: false });
      objectStore.createIndex('profilePicture', 'profilePicture', { unique: false });
      objectStore.createIndex('password', 'password', { unique: false });
    };
  });
};

export const saveUserData = (db, userData) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['users'], 'readwrite');
    const objectStore = transaction.objectStore('users');
    const request = objectStore.put(userData);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      console.error('Save error:', event.target.error);
      reject('Save error');
    };
  });
};

export const getUserData = (db, email) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['users'], 'readonly');
    const objectStore = transaction.objectStore('users');
    const request = objectStore.get(email);

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      console.error('Get error:', event.target.error);
      reject('Get error');
    };
  });
};
