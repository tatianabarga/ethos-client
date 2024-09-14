import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getCirclesByUser } from '../../utils/data/circleData';

export default function Circles() {
  const { user } = useAuth();
  const [circles, setCircles] = useState([]);

  useEffect(() => {
    getCirclesByUser(user.id).then(setCircles);
  }, [user]);

  return (
    <div>
      <h2 className="view-header">Your Circles:</h2>
      {/* loop through circles */}
      <div>
        {circles?.map((circle) => (
          <Link href={`/circles/${circle.id}`} passHref>
            <h3 className="subheader-card circle-card user-card card" id={`circle-${circle.id}`}>{circle.name}</h3>
          </Link>
        ))}
      </div>
      <Link href="/circles/new" passHref>
        <Button>Create A Circle</Button>
      </Link>
    </div>
  );
}
