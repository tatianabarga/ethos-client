import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LogForm from '../../components/LogForm';
import { getSingleProfile } from '../../utils/data/profileData';

export default function NewLog() {
  const router = useRouter();
  const { profileId } = router.query;
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    console.log('profileId from page:', profileId);
    getSingleProfile(profileId).then(setProfile);
  }, [profileId]);

  if (!profileId) {
    return <div>Loading...</div>; // Render a loading state while profileId is being fetched
  }

  return (
    <div>
      <div className="view-header">New Log for {profile?.name}</div>
      <LogForm profileId={profileId} />
    </div>
  );
}
