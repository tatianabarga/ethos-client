import Link from 'next/link';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function LogCard({ logObj }) {
  console.log('logObj:', logObj);
  return (
    <div className="card" id="log-card">
      <Card className="text-center" id="inner-card">
        <Card.Text className="subheader-card">{logObj.title}</Card.Text>
        <Card.Text className="score">{logObj.score_impact}</Card.Text>
        <Card.Text className="small-text">Event: {logObj.event_date}</Card.Text>
        <Card.Text className="small-text">Logged: {logObj.log_date}</Card.Text>
        <Card.Body>

          {/* TODO: create new form functionality */}
          {/* <Link href={`/logs/new`} passHref>
            <Button variant="primary" className="m-2">
              Create New
            </Button>
          </Link> */}

          {/* TODO: single log view functionality */}
          <Link href={`/logs/${logObj.id}`} passHref>
            <Button variant="primary" className="m-2">
              View Log
            </Button>
          </Link>

        </Card.Body>
      </Card>
    </div>
  );
}

LogCard.propTypes = {
  logObj: PropTypes.shape({
    id: PropTypes.number,
    score_impact: PropTypes.string,
    creator_id: PropTypes.number,
    event_date: PropTypes.string,
    log_date: PropTypes.string,
    profile_id: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  // onUpdate: PropTypes.func.isRequired,
};
