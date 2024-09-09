import { clientCredentials } from '../client';

const getProfilesByUser = (id, creatorId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/profiles?"creator_id"="${creatorId}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `${id}`, TODO: do i need this?? if not remove id prop
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleProfile = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/profiles/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createProfile = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/profiles`, {
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

const updateProfile = (payload) => new Promise((resolve, reject) => {
  if (!payload.id) {
    reject(new Error('Profile ID is required for updating a profile.'));
    return;
  }

  fetch(`${clientCredentials.databaseURL}/profiles/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const getProfilesByCircle = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/profiles?circle=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getProfilesByUser,
  getSingleProfile,
  createProfile,
  updateProfile,
  getProfilesByCircle,
};
