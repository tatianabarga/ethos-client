import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getProfilesByCircle } from '../../utils/data/profileData';
import ProfileCard from '../../components/ProfileCard';
import { deleteCircle, getSingleCircle } from '../../utils/data/circleData';
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

  const deleteThisCircle = () => {
    if (window.confirm(`Delete ${circleDetails.name}?`)) {
      deleteCircle(circleDetails.id).then(router.push('/circles/circles'));
    }
  };

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
      <h1 className="view-header">{circleDetails?.name}</h1>
      {/* provide edit circle access only if the current user is the circle's creator */}
      {isCreator ? (
        <div>
          <Link href={`/circles/update/${circleDetails?.id}`} passHref>
            <Button variant="primary" className="m-2">
              Edit Circle
            </Button>
          </Link>
          <Button
            onClick={() => {
              deleteThisCircle();
            }}
          >
            Delete this Circle
          </Button>
        </div>
      ) : null}
      <h2 className="view-subheader">Creator:</h2>
      <div>
        <div className="user-card card">{creator.name}</div>
      </div>
      {/* loop through users */}
      <h2 className="view-subheader">Users in this circle:</h2>
      <div className="lists">
        {users.map((thisUser) => (
          <div className="user-card card">
            <div>{thisUser.name}</div>
          </div>
        ))}
      </div>
      {/* loop through profiles */}
      <h2 className="view-subheader">Profiles in this circle:</h2>
      <div className="lists">
        {profiles.map((profile) => (
          <div className="user-card">
            <ProfileCard profileObj={profile} key={profile.id} />
          </div>
        ))}
      </div>
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
