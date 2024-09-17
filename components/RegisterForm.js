import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth';
import { getAllUsers } from '../utils/data/userData';

function RegisterForm({ user, updateUser }) {
  const [existingUsers, setExistingUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    uid: user.uid,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // check if user with name input already exists
    const nameExists = existingUsers.some((existingUser) => existingUser.name.toLowerCase() === formData.name.toLowerCase());

    if (nameExists) {
      alert('A user with this name already exists!');
      return; // Prevent form submission
    }

    registerUser(formData).then(() => updateUser(user.uid));
  };

  useEffect(() => {
    getAllUsers().then((data) => { setExistingUsers(data); });
  });

  return (
    <Form className="subheader-card" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="subheader-card">Your Name</Form.Label>
        <Form.Control className="subheader-card" as="textarea" name="name" required placeholder="Enter your Name" onChange={({ target }) => setFormData((prev) => ({ ...prev, [target.name]: target.value }))} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
