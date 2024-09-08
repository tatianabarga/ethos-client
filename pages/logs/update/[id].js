import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleLog } from '../../../utils/data/logData';
import LogForm from '../../../components/LogForm';

export default function UpdateLog() {
  const [logDetails, setLogDetails] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleLog(id).then(setLogDetails);
  }, [id]);

  return (
    <div>
      <h2>Update {logDetails?.title} Log</h2>
      <LogForm obj={logDetails} />
    </div>
  );
}
