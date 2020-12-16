import { useEffect, useState } from 'react';

export default function useFetch({ endpoint }) {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState();

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      setStatus('fetching');
      await endpoint
        .then((response) => {
          if (mounted) {
            setData(response.body.content)
            setStatus('fetched')
          }
        })
        .catch((e) => {
          if (mounted) setStatus('error')
          console.log(e)
        })
    };

    fetchData();
    return function cleanUp() {
      mounted = false;
    }
  }, []);

  return { status, data, error };
};
