import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
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
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleToggleUser = (userId) => {
    setSelectedUsers((prevSelectedUsers) => {
      let newUsers = [];
      if (prevSelectedUsers.includes(userId)) {
        newUsers = prevSelectedUsers.filter((id) => id !== userId);
      } else {
        newUsers = [...prevSelectedUsers, userId];
      }
      return newUsers;
    });
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
    if (selectedUsers.includes(user.id)) {
      // do nothing
    } else {
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

  return (
    <div>
      <Form className="subheader-card" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control className="input body-text" type="text" value={formInput.name} placeholder="Name this circle." name="name" onChange={handleChange} />
        </Form.Group>

        <Form.Label>What users do you want this circle to be shared with?</Form.Label>
        <ToggleButtonGroup
          type="checkbox"
          value={selectedUsers}
          className="toggles"
        >
          {users.map((thisUser) => (
            <ToggleButton
              className="toggles"
              key={thisUser.id}
              id={`user-${thisUser.id}`}
              variant="outline-primary"
              value={thisUser.id}
              checked={selectedUsers.includes(thisUser.id)}
              onChange={() => handleToggleUser(thisUser.id)}
            >
              {thisUser.name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

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
