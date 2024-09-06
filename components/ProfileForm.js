import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getCirclesByUser } from '../utils/data/circleData';
import { createProfile } from '../utils/data/profileData';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  name: '',
  bio: '',
  initial_score: 0,
  circles: '',
  creator: '',
};

function ProfileForm() {
  const [circles, setCircles] = useState([]);
  const [formInput, setFormInput] = useState([initialState]);
  const router = useRouter();
  const { user } = useAuth();

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
    createProfile(payload).then(() => {
      router.push('/user');
    });
  };

  useEffect(() => {
    getCirclesByUser(user.id).then(setCircles);
  }, []);

  useEffect(() => {
    setFormInput((prevState) => ({
      ...prevState,
      creator: user.id,
    }));
  }, [user]);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter the person/ corporation/ contractor name." name="name" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="bio">
          <Form.Label>Bio</Form.Label>
          <Form.Control type="text" placeholder="Who is this person/ corporation/ contractor? How are they involved? How are they related to other relevant profiles? Is there anything else circle members will need to know?" name="bio" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="initialScore">
          <Form.Label>Initial Score</Form.Label>
          <Form.Control type="text" placeholder="You can give them an initial score here. This is optional." name="initial_score" onChange={handleChange} />
        </Form.Group>

        <Form.Label>What circles do you want this profile to be shared with?</Form.Label>
        <Form.Select aria-label="circles" name="circles" onChange={handleChange}>
          {circles.map((circle) => (
            <option value={circle.id} key={circle.id}>{circle.name}</option>
          ))}
        </Form.Select> {/* change this to be check feild to incorporate multiple */}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default ProfileForm;
