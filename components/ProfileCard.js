import Link from 'next/link';
// import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import getScoreByProfile from '../utils/data/scoreData';

export default function ProfileCard({ profileObj }) {
  const [score, setScore] = useState(null);

  useEffect(() => {
    if (profileObj.id) {
      getScoreByProfile(profileObj.id).then((data) => {
        if (data && data.length > 0 && data[0].score) {
          setScore(data[0].score);
        }
      });
    }
  }, [profileObj]);

  return (
    <div>
      <Card className="text-center">
        <Card.Text className="subheader-card">{profileObj.name}</Card.Text>
        <Card.Text className="score">{score}</Card.Text>
        <Card.Body>

          {/* TODO: create new form functionality */}
          {/* <Link href={`/posts/edit/${id}`} passHref>
            <Button variant="primary" className="m-2">
              Create New
            </Button>
          </Link> */}

          {/* TODO: single profile view functionality */}
          <Link href={`/profiles/${profileObj.id}`} passHref>
            <Button variant="primary" className="m-2">
              View Profile
            </Button>
          </Link>

        </Card.Body>
      </Card>
    </div>
  );
}

ProfileCard.propTypes = {
  profileObj: PropTypes.shape({
    name: PropTypes.string,
    score: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  // onUpdate: PropTypes.func.isRequired,
};
