import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getProfilesByCircle } from '../../utils/data/profileData';
import ProfileCard from '../../components/ProfileCard';
import { getSingleCircle } from '../../utils/data/circleData';
import { getSingleUser, getUsersByCircle } from '../../utils/data/userData';
import { useAuth } from '../../utils/context/authContext';

export default function ViewProfile() {
  const [circleDetails, setCircleDetails] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [creator, setCreator] = useState([]);
  const [isCreator, setIsCreator] = useState(false);
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is mounted

    if (id) {
      // Fetch circle details
      getSingleCircle(id).then((circleData) => {
        if (isMounted) {
          setCircleDetails(circleData);
        }
      });

      // Fetch users
      getUsersByCircle(id).then((userData) => {
        if (isMounted) {
          setUsers(userData);
        }
      });

      getProfilesByCircle(id).then(setProfiles);
    }

    // Cleanup function to set isMounted to false when component unmounts
    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    if (circleDetails) {
      if (user.id === circleDetails.creator) {
        setIsCreator(true);
      }

      getSingleUser(circleDetails.creator).then(setCreator);
    }
  }, [user, circleDetails]);

  return (
    <>
      <h1>{circleDetails?.name}</h1>
      <h2>Creator:</h2>
      <h3>{creator.name}</h3>
      {/* loop through users */}
      <h2>Users in this circle:</h2>
      {users.map((thisUser) => (
        <h3>{thisUser.name}</h3>
      ))}
      {/* loop through profiles */}
      <h2>Profiles in this circle:</h2>
      {profiles.map((profile) => (
        <ProfileCard profileObj={profile} key={profile.id} />
      ))}
      {/* provide edit circle access only if the current user is the circle's creator */}
      {isCreator ? (
        <Link href={`/circles/update/${circleDetails?.id}`} passHref>
          <Button variant="primary" className="m-2">
            Edit Circle
          </Button>
        </Link>
      ) : null}
    </>
  );
}

ViewProfile.propTypes = {
  circleDetails: PropTypes.shape({
    name: PropTypes.string,
    creator: PropTypes.string,
  }).isRequired,
  // onUpdate: PropTypes.func.isRequired,
};
