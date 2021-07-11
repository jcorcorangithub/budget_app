let db;
const request = indexedDB.open("budget", 1);

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    const store = await db.createObjectStore("store", { autoIncrement:true });
  };

request.onsuccess = event => {
    db = event.target.result;

    if (navigator.onLine) {
        checkDatabase();
    }
};

request.onerror = event => {
    console.error(event);
};

function saveRecord(record) {
    const transaction = db.transaction(["store"], "readwrite");
    const store = transaction.objectStore("store");
  
    store.add(record);
}

function checkDatabase() {
    
}