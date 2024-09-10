import { clientCredentials } from '../client';

const getAllCircles = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/circles`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getCirclesByProfile = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/circles?profile=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getCirclesByUser = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/circles?user=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleCircle = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/circles/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createCircle = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/circles`, {
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

const updateCircle = (payload) => new Promise((resolve, reject) => {
  if (!payload.id) {
    reject(new Error('Circle ID is required for updating a circle.'));
    return;
  }

  fetch(`${clientCredentials.databaseURL}/circles/${payload.id}`, {
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
  getAllCircles,
  getCirclesByProfile,
  getCirclesByUser,
  getSingleCircle,
  createCircle,
  updateCircle,
};
