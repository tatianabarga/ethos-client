import { clientCredentials } from '../client';

const getLogsByProfile = (id, profileId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/profiles?"profile_id"="${profileId}"`, {
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

const getSinglePost = (id) => new Promise((resolve, reject) => {
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

export {
  getLogsByProfile,
  getSinglePost,
};
