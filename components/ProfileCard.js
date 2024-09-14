import Link from 'next/link';
// import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function ProfileCard({ profileObj }) {
  return (
    <div>
      <Card className="text-center">
        <Card.Text className="subheader-card">{profileObj.name}</Card.Text>
        <Card.Text>{profileObj.score}</Card.Text>
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
