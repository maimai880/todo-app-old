export const myFetch = (url, myInit = {}) => {
  let init = {
    credentials: 'include',
    method     : myInit.method
  };

  if (myInit.body) {
    init.headers = {'Content-Type': 'application/json'};
    init.body = JSON.stringify(myInit.body);
  }

  return fetch(url, init)
    .then(res => res.json());
};
