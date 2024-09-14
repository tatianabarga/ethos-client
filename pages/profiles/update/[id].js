import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ProfileForm from '../../../components/ProfileForm';
import { getSingleProfile } from '../../../utils/data/profileData';

export default function UpdateProfile() {
  const [profileDetails, setProfileDetails] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleProfile(id).then(setProfileDetails);
  }, [id]);

  return (
    <div>
      <div className="view-header">Update {profileDetails.name}</div>
      <div className="subheader-card">
        <ProfileForm obj={profileDetails} />
      </div>
    </div>
  );
}
