import { clientCredentials } from '../client';

const getLogsByProfile = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/logs?profile=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleLog = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/logs/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getLogsByProfile,
  getSingleLog,
};
