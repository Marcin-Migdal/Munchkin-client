import { useEffect, useState } from 'react';
import api from '../api/api';

export default function useFetchPagebale({ url, errorFlag, incrementPage }) {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [lastPage, setLastPage] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (!url) return;
    const fetchData = async () => {
      setStatus('fetching');
      await api.httpGET(url)
        .then((response) => {
          if (mounted) {
            if (!data) {
              setData(response.body.content)
            } else {
              setData([...data, ...response.body.content])
            }
            incrementPage()
            if(response.body.last) setLastPage(response.body.last)
            if(error) setError(false)
          }
        })
        .catch((e) => {if (mounted) setError(true)})

      if (mounted) setStatus('fetched')
    };
    fetchData();

    return function cleanUp() {
      mounted = false;
    }
  }, [url, errorFlag]);

  return { status, data, error, lastPage };
};
