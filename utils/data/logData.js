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

const createLog = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/logs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateLog = (payload) => new Promise((resolve, reject) => {
  if (!payload.id) {
    reject(new Error('Log ID is required for updating a log.'));
    return;
  }

  fetch(`${clientCredentials.databaseURL}/logs/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getLogsByProfile,
  getSingleLog,
  updateLog,
  createLog,
};
