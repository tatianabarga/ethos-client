import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getProfilesByUser } from '../utils/data/profileData';
import ProfileCard from '../components/ProfileCard';

function Home() {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState([]);

  const getProfiles = () => {
    getProfilesByUser(user?.id).then(setProfiles);
  };

  useEffect(() => {
    if (user.id) {
      getProfiles();
      console.log(user);
    }
  }, [user]);

  return (
    <>
      <h1 className="view-header">Hey {user.name}!</h1>
      <Link href="/editUser" passHref>
        <Button variant="primary" className="m-2">
          Edit User Name
        </Button>
      </Link>
      <h2 className="view-subheader">Your Profiles:</h2>
      {/* loop through profiles w profile card compenent */}
      <div className="lists">
        {profiles.map((profile) => (
          <div className="subheader-card">
            <ProfileCard key={profile.id} profileObj={profile} onUpdate={getProfiles} />
          </div>
        ))}
      </div>
      <Link href="/profiles/new" passHref>
        <Button variant="primary" className="m-2">
          Create New Profile
        </Button>
      </Link>
    </>
  );
}

export default Home;
