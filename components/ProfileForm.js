import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAllCircles } from '../utils/data/circleData';

function ProfileForm() {
  const [circles, setCircles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault(); // TODO: create submit logic for both update and create
  };

  useEffect(() => {
    getAllCircles().then(setCircles);
  }, []);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter the person/ corporation/ contractor name." />
        </Form.Group>

        <Form.Group className="mb-3" controlId="bio">
          <Form.Label>Bio</Form.Label>
          <Form.Control type="text" placeholder="Who is this person/ corporation/ contractor? How are they involved? How are they related to other relevant profiles? Is there anything else circle members will need to know?" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="initialScore">
          <Form.Label>Initial Score</Form.Label>
          <Form.Control type="text" placeholder="You can give them an initial score here. This is optional." />
        </Form.Group>

        <Form.Label>What circles do you want this profile to be shared with?</Form.Label>
        <Form.Select aria-label="circles">
          {circles.map((circle) => (
            <option value={circle.id}>{circle.name}</option>
          ))}
        </Form.Select>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default ProfileForm;
