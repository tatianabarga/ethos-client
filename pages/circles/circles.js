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
      <h2>Your Circles:</h2>
      {/* loop through circles */}
      {circles?.map((circle) => (
        <Link href={`/circles/${circle.id}`} passHref>
          <h3>{circle.name}</h3>
        </Link>
      ))}
      <Link href="/circles/new.js" passHref>
        <Button>Create A Circle</Button>
      </Link>
    </div>
  );
}
