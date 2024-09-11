import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../utils/context/authContext';
import { updateUser } from '../utils/data/userData';

const initialState = {
  name: '',
  id: '',
};

export default function UserForm() {
  const [formInput, setFormInput] = useState(initialState);
  const { user } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
    };
    console.log('form input:', formInput);
    updateUser({ ...payload }).then(() => {
      router.push('/user');
    });
  };

  useEffect(() => {
    setFormInput({
      name: user.name,
      id: user.id,
    });
  }, [user]);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={formInput.name} placeholder="Enter user name" name="name" onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
