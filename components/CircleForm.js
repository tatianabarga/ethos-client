import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { getAllUsers, getUsersByCircle } from '../utils/data/userData';
import { createCircle, updateCircle } from '../utils/data/circleData';

const initialState = {
  name: '',
  users: [],
  creator: '',
};

function CircleForm({ obj }) {
  const [users, setUsers] = useState([]);
  const [formInput, setFormInput] = useState(initialState);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUserDetails, setSelectedUserDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers((prevSelectedUsers) => (
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter((id) => id !== userId)
        : [...prevSelectedUsers, userId]
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
      users: selectedUsers,
    };
    if (obj.id) {
      updateCircle({ ...payload, id: obj.id }).then(() => {
        router.push(`/circles/${obj.id}`);
      });
    } else {
      createCircle(payload).then(() => {
        router.push('/circles/circles');
      });
    }
  };

  useEffect(() => {
    getAllUsers().then(setUsers);
    if (!selectedUsers.includes(user.id)) {
      selectedUsers.push(user.id);
    }
  }, [selectedUsers, user]);

  useEffect(() => {
    if (obj.id) {
      getUsersByCircle(obj.id).then((data) => {
        const newUsers = [];
        data.map((thisUser) => (
          newUsers.push(thisUser.id)
        ));
        setSelectedUsers(newUsers);
        console.log(selectedUsers);
      });
      setFormInput((prevState) => ({
        ...prevState,
        ...obj,
      }));
    }
  }, [obj]);

  useEffect(() => {
    setFormInput((prevState) => ({
      ...prevState,
      creator: user.id,
    }));
  }, [user]);

  useEffect(() => {
    setSelectedUserDetails(users.filter((includedUser) => selectedUsers.includes(includedUser.id)));
  }, [selectedUsers, users]);

  const filteredUsers = users.filter(
    (thisUser) => thisUser.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div>
      <Form className="subheader-card" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control className="input body-text" type="text" value={formInput.name} placeholder="Name this circle." name="name" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="search">
          <Form.Label className="sm-margin">What users do you want this circle to be shared with?</Form.Label>
          <div className="body-card sm-margin">Search for users</div>
          <Form.Control
            className="input body-text"
            type="text"
            placeholder="Search users by name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Form.Group>

        <ul className="list-group">
          {searchQuery !== '' ? filteredUsers.map((thisUser) => (
            <li key={thisUser.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <span>{thisUser.name}</span>
                <Button
                  variant={selectedUsers.includes(thisUser.id) ? 'danger' : 'primary'}
                  onClick={() => handleSelectUser(thisUser.id)}
                >
                  {selectedUsers.includes(thisUser.id) ? 'Remove' : 'Add'}
                </Button>
              </div>
            </li>
          ))
            : null}
        </ul>

        <div className="abv-margin sm-margin subheader-card">Users in this Circle</div>
        <ul className="list-group">
          {selectedUserDetails.map((thisUser) => (
            <li key={thisUser.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <span>{thisUser.name}</span>
                <Button
                  variant={selectedUsers.includes(thisUser.id) ? 'danger' : 'primary'}
                  onClick={() => handleSelectUser(thisUser.id)}
                >
                  {selectedUsers.includes(thisUser.id) ? 'Remove' : 'Add'}
                </Button>
              </div>
            </li>
          ))}
        </ul>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

CircleForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    creator: PropTypes.number,
  }),
};

CircleForm.defaultProps = {
  obj: initialState,
};

export default CircleForm;
