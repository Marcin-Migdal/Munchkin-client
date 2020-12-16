import { useEffect, useState } from 'react';
import roomsService from '../api/rooms.api';

export default function useFetchPagebale({ query, errorFlag, incrementPage }) {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState();
  const [lastPage, setLastPage] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (!query) return;
    const fetchData = async () => {
      if (mounted) setStatus('fetching');
      await roomsService.getPageableRoom(query)
        .then((response) => {
          if (mounted) {
            if (!data) {
              setData(response.body.content)
            } else {
              setData([...data, ...response.body.content])
            }
            incrementPage()
            setLastPage(response.body.last)
            setStatus('fetched')
          }
        })
        .catch((e) => { if (mounted) setStatus('error') })
    };
    fetchData();

    return function cleanUp() {
      mounted = false;
    }
  }, [query, errorFlag]);

  return { status, data, lastPage };
};
