import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getLogsByProfile } from '../../utils/data/logData';
import LogCard from '../../components/LogCard';
import { deleteProfile, getSingleProfile } from '../../utils/data/profileData';
import getScoreByProfile from '../../utils/data/scoreData';
import { getCirclesByProfile } from '../../utils/data/circleData';
import { useAuth } from '../../utils/context/authContext';
import { getSingleUser } from '../../utils/data/userData';

export default function ViewProfile() {
  const [profileDetails, setProfileDetails] = useState(null);
  const [creator, setCreator] = useState([]);
  const [isCreator, setIsCreator] = useState(false);
  const [logs, setLogs] = useState([]);
  const [circles, setCircles] = useState([]);
  const [score, setScore] = useState({});
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  const deleteThisPofile = () => {
    if (window.confirm(`Delete ${profileDetails.name}?`)) {
      deleteProfile(profileDetails.id).then(router.push('/'));
    }
  };

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is mounted

    if (id) {
      // Fetch profile details
      getSingleProfile(id).then((profileData) => {
        if (isMounted) {
          setProfileDetails(profileData);
        }
      });

      // Fetch logs
      getLogsByProfile(id).then((logsData) => {
        if (isMounted) {
          setLogs(logsData);
        }
      });

      // Fetch score
      getScoreByProfile(id).then((scoreData) => {
        setScore(scoreData[0]);
      });

      getCirclesByProfile(id).then(setCircles);
    }

    // Cleanup function to set isMounted to false when component unmounts
    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    if (profileDetails) {
      if (user.id === profileDetails.creator) {
        setIsCreator(true);
      }

      getSingleUser(profileDetails.creator).then(setCreator);
    }
  }, [user, profileDetails]);

  return (
    <div className="component">
      <h1 className="view-header">{profileDetails?.name}</h1>
      {/* provide edit circle access only if the current user is the circle's creator */}
      {isCreator ? (
        <div>
          <Link href={`/profiles/update/${profileDetails?.id}`} passHref>
            <Button variant="primary" className="m-2">
              Update Profile
            </Button>
          </Link>
          <Button
            variant="danger"
            onClick={() => {
              deleteThisPofile();
            }}
          >
            Delete this Profile
          </Button>
        </div>
      ) : null}
      <h2 className="view-subheader sm-margin">Created by: <span>{creator?.name}</span></h2>
      <h2 className="view-subheader sm-margin">Ethos Score: <span className="score">{score?.score || "This profile doesn't have a score yet"}</span></h2>
      <h2 className="view-subheader sm-margin">bio:</h2>
      <div className="view-body">{profileDetails?.bio}</div>
      {/* loop through circles */}
      <h2 className="view-subheader sm-margin">Circles this profile is shared with:</h2>
      {circles.map((circle) => (
        <div key={circle.id} className="view-body">{circle.name}</div>
      ))}
      {/* loop through logs with log card compenent */}
      <div className="subheader-card sm-margin">Logs:</div>
      <Link href={`/logs/new?profileId=${profileDetails?.id}`} passHref>
        <Button variant="primary" className="m-2">
          Add a Log
        </Button>
      </Link>
      <div className="lists">
        {logs.map((log) => (
          <LogCard key={log.id} logObj={log} />
        ))}
      </div>
    </div>
  );
}

ViewProfile.propTypes = {
  profileDetails: PropTypes.shape({
    name: PropTypes.string,
    bio: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  // onUpdate: PropTypes.func.isRequired,
};
