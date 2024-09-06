import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { getCirclesByUser } from '../utils/data/circleData';
import { createProfile } from '../utils/data/profileData';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  name: '',
  bio: '',
  initial_score: 0,
  circles: [],
  creator: '',
};

function ProfileForm() {
  const [circles, setCircles] = useState([]);
  const [formInput, setFormInput] = useState([initialState]);
  const [selectedCircles, setSelectedCircles] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleToggleCircle = (circleId) => {
    setSelectedCircles((prevSelectedCircles) => {
      let newCircles = [];
      if (prevSelectedCircles.includes(circleId)) {
        newCircles = prevSelectedCircles.filter((id) => id !== circleId);
      } else {
        newCircles = [...prevSelectedCircles, circleId];
      }
      return newCircles;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
      circles: selectedCircles,
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
        <ToggleButtonGroup type="checkbox" className="mb-2">
          {circles.map((circle) => (
            <ToggleButton
              key={circle.id}
              id={`circle-${circle.id}`}
              type="checkbox"
              variant="outline-primary"
              value={circle.id}
              checked={selectedCircles.includes(circle.id)}
              onClick={() => handleToggleCircle(circle.id)}
            >
              {circle.name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        {/* <Form.Select aria-label="circles" name="circles" onChange={handleChange}> */}
        {/* </Form.Select> change this to be check feild to incorporate multiple */}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default ProfileForm;
