let db;
const request = indexedDB.open("budget", 1);

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    const store = await db.createObjectStore("store", { autoIncrement:true });
  };

request.onsuccess = function(event) {
    db = event.target.result;

    if (navigator.onLine) {
        checkDatabase();
    }
};

