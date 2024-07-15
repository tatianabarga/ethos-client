import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { getPostsByProfile } from '../utils/data/profileData';
import ProfileCard from '../components/ProfileCard';

function Home() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState([]);

  const getProfiles = () => {
    getPostsByProfile(user.id).then(setProfiles);
  };

  useEffect(() => {
    getProfiles();
    // console.log(user);
  }, [user]);

  return (
    <>
      <h1>{user.name}</h1>
      <h2>My Profiles</h2>
      {/* loop through profiles w profile card compenent */}
      {profiles.map((profile) => (
        <ProfileCard key={profile.id} profileObj={profile} onUpdate={getProfiles} />
      ))}
    </>
  );
}

Home.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    uid: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  // onUpdate: PropTypes.func.isRequired,
};

export default Home;
