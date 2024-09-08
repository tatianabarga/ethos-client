import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { getSingleProfile } from '../utils/data/profileData';
import { updateLog, createLog } from '../utils/data/logData';
import { useAuth } from '../utils/context/authContext';
import getScoreByProfile from '../utils/data/scoreData';

const initialState = {
  title: '',
  description: '',
  score_impact: 0,
  profile: '',
  creator: '',
  event_date: '',
};

function LogForm({ obj, profileId }) {
  const [profile, setProfile] = useState([]);
  const [score, setScore] = useState([]);
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
    if (obj.id) {
      updateLog({ ...payload, id: obj.id }).then(() => {
        router.push(`/logs/${obj.id}`);
      });
    } else {
      createLog(payload).then(() => {
        router.push(`/profiles/${profileId}`);
      });
    }
  };

  useEffect(() => {
    if (obj.id) {
      setFormInput({
        title: obj.title || '',
        description: obj.description || '',
        score_impact: obj.score_impact || 0,
        profile: obj.profile || '',
        creator: obj.creator || '',
        event_date: obj.event_date || '',
      });
    }
  }, [obj]);

  useEffect(() => {
    getSingleProfile(profileId).then(setProfile);
  }, [profileId]);

  useEffect(() => {
    setProfile(obj.profile);
  }, [obj.profile]);

  useEffect(() => {
    setFormInput((prevState) => ({
      ...prevState,
      profile,
      creator: user.id,
    }));
  }, [profile, user, obj]);

  useEffect(() => {
    getScoreByProfile(profile).then((scoreData) => {
      setScore(scoreData[0]);
    });
  }, [profile]);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={formInput.title} placeholder="Enter log title" name="title" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" value={formInput.description} placeholder="What happened?" name="description" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="event_date">
          <Form.Label>Event Date</Form.Label>
          <Form.Control type="text" value={formInput.event_date} placeholder="When did this happen?" name="event_date" onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="score_impact">
          <Form.Label>Impact on Ethos Score</Form.Label>
          <div>Current Score: </div>
          { /* eslint-disable-next-line react/no-unescaped-entities */ }
          {score?.score || <div>This profile does not have a score. Your input here will create this profile's score.</div>}
          <Form.Control type="text" value={formInput.score_impact} placeholder="Enter a positive or negative number" name="score_impact" onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

LogForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    score_impact: PropTypes.string,
    event_date: PropTypes.string,
    profile: PropTypes.number,
    creator: PropTypes.number,
  }),
  profileId: PropTypes.number,
};

LogForm.defaultProps = {
  obj: initialState,
  profileId: 0,
};

export default LogForm;
