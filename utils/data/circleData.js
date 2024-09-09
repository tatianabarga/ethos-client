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

export {
  getAllCircles,
  getCirclesByProfile,
  getCirclesByUser,
  getSingleCircle,
};
