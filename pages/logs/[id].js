import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { getSingleLog } from '../../utils/data/logData';
import { getSingleProfile } from '../../utils/data/profileData';
import getScoreByProfile from '../../utils/data/scoreData';

function ViewLog() {
  const [logDetails, setLogDetails] = useState(null);
  const [score, setScore] = useState({});
  const [profile, setProfile] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getSingleLog(id).then((data) => {
        setLogDetails(data);
        console.log('logDetails:', data);
      });
    }
  }, [id]);

  useEffect(() => {
    if (logDetails?.profile) {
      getSingleProfile(logDetails.profile).then((data) => {
        setProfile(data);
        console.log('profile:', data);
      });
      getScoreByProfile(logDetails.profile).then((scoreData) => {
        setScore(scoreData[0]);
      });
    }
  }, [logDetails]);

  return (
    <>
      <h1>{profile?.name}</h1>
      <h2>Current Score: {score.score || "This profile doesn't have a score yet"}</h2>
      <Card>
        <div>{logDetails?.title}</div>
        <div>description: </div>
        <div>{logDetails?.description}</div>
        <div>score impact: </div>
        <div>{logDetails?.score_impact}</div>
        <div>event date: </div>
        <div>{logDetails?.event_date}</div>
        <div>log date: </div>
        <div>{logDetails?.log_date}</div>
        <Link href={`/logs/update/${logDetails?.id}`} passHref>
          <Button variant="primary" className="m-2" obj={logDetails}>
            Update Log
          </Button>
        </Link>
      </Card>
    </>
  );
}

ViewLog.propTypes = {
  logDetails: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    score_impact: PropTypes.number,
    log_date: PropTypes.number,
    event_date: PropTypes.number,
    profile: PropTypes.number,
  }).isRequired,
  profileDetails: PropTypes.shape({
    name: PropTypes.string,
    bio: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  // onUpdate: PropTypes.func.isRequired,
};

export default ViewLog;
