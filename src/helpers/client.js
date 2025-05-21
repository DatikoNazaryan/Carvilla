import storage from "./storage";

function fakeFetch(key) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      const result = JSON.parse(storage.getString(key));

      if (!result) {
        storage.setString(key, '[]');
        resolve([]);
      }

      resolve(result);

    }, 2000);
  })
}

export default fakeFetch;
