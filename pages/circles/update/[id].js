import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleCircle } from '../../../utils/data/circleData';
import CircleForm from '../../../components/CircleForm';

export default function UpdateCircle() {
  const [circleDetails, setCircleDetails] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleCircle(id).then(setCircleDetails);
  }, [id]);

  return (
    <div>
      <div className="view-header">Update {circleDetails.name}</div>
      <CircleForm obj={circleDetails} />
    </div>
  );
}
