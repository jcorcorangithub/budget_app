let db;
const request = indexedDB.open("budget", 1);

request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore("store", { autoIncrement:true });
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
    const transaction = db.transaction(["store"], "readonly");
    const store = transaction.objectStore("store");
    const getAll = store.getAll();

    getAll.onsuccess = function () {
        if (getAll.result.length > 0) {
            fetch('/api/transaction/bulk', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then(() => {
                const transaction = db.transaction(["store"], "readwrite");
                const store = transaction.objectStore("store");
                store.clear();
            });
        }
    };
}

window.addEventListener('online', checkDatabase);

