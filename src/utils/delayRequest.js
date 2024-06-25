export const delayedRequest = (data, time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data) {
        resolve(data);
      } else {
        reject(new Error("Request failed"));
      }
    }, time);
  });
};