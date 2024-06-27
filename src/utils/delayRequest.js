export const delayedRequest = (data, time=800) => {
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