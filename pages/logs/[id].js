import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
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
        if (scoreData.length > 0) {
          setScore(scoreData[0]);
        } else {
          // Set a default empty object if no score is returned
          setScore({ score: null });
        }
      });
    }
  }, [logDetails]);

  return (
    <>
      <h1 className="view-header">{profile?.name}</h1>
      <h2 className="view-subheader">Current Score: <span className="score">{score?.score !== null ? score.score : "This profile doesn't have a score yet"}</span></h2>
      {/* <Card> */}
      <div className="single-view">
        <div className="header-card">{logDetails?.title}</div>
        <div className="subheader-card">description: </div>
        <div className="body-card">{logDetails?.description}</div>
        <div className="subheader-card">score impact: <span className="score">{logDetails?.score_impact}</span></div>
        <div className="subheader-card">event date: <span className="body-card">{logDetails?.event_date}</span></div>
        <div className="subheader-card">log date: <span className="body-card">{logDetails?.log_date}</span></div>
        <Link href={`/logs/update/${logDetails?.id}`} passHref>
          <Button variant="primary" className="m-2" obj={logDetails}>
            Update Log
          </Button>
        </Link>
      </div>
      {/* </Card> */}
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
