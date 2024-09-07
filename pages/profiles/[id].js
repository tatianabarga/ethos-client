import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getLogsByProfile } from '../../utils/data/logData';
import LogCard from '../../components/LogCard';
import { getSingleProfile } from '../../utils/data/profileData';

export default function ViewProfile() {
  const [profileDetails, setProfileDetails] = useState(null);
  const [logs, setLogs] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleProfile(id).then(setProfileDetails);
  }, [id]);

  const getLogs = () => {
    getLogsByProfile(id).then(setLogs);
  };

  useEffect(() => {
    console.log('profileDetails here:', profileDetails);
  }, [profileDetails]);

  useEffect(() => {
    getLogs();
    console.log('logs here:', logs);
  }, [id]);

  return (
    <>
      <h1>{profileDetails?.name}</h1>
      <h2>bio:</h2>
      <>{profileDetails?.bio}</>
      {/* loop through logs with log card compenent */}
      {logs.map((log) => (
        <LogCard key={log.id} logObj={log} onUpdate={getLogs} />
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
