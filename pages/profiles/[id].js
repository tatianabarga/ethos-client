import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getLogsByProfile } from '../../utils/data/logData';
import LogCard from '../../components/LogCard';
import { getSingleProfile } from '../../utils/data/profileData';
import getScoreByProfile from '../../utils/data/scoreData';
import { getCirclesByProfile } from '../../utils/data/circleData';

export default function ViewProfile() {
  const [profileDetails, setProfileDetails] = useState(null);
  const [logs, setLogs] = useState([]);
  const [circles, setCircles] = useState([]);
  const [score, setScore] = useState({});
  const router = useRouter();
  const { id } = router.query;

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

  return (
    <>
      <h1>{profileDetails?.name}</h1>
      <h2>Current Score: {score?.score || "This profile doesn't have a score yet"}</h2>
      <h2>bio:</h2>
      <>{profileDetails?.bio}</>
      {/* loop through circles */}
      <h2>Circles this profile is shared with:</h2>
      {circles.map((circle) => (
        <div>{circle.name}</div>
      ))}
      {/* loop through logs with log card compenent */}
      {logs.map((log) => (
        <LogCard key={log.id} logObj={log} />
      ))}
      <Link href={`/profiles/update/${profileDetails?.id}`} passHref>
        <Button variant="primary" className="m-2">
          Update Profile
        </Button>
      </Link>
      <Link href={`/logs/new?profileId=${profileDetails?.id}`} passHref>
        <Button variant="primary" className="m-2">
          Add a Log
        </Button>
      </Link>
    </>
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
