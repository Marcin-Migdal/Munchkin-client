import { useEffect, useState } from 'react';
import roomsService from '../api/rooms.api';

export default function useFetchGetPageable({ query, errorFlag }) {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState();
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (!query) return;
    const fetchData = async () => {
      if (mounted) setStatus('fetching');
      console.log(query)
      await roomsService.getPageableRooms(query)
        .then((response) => {
          if (mounted) {
            if (!data) {
              setData(response.body.content)
            } else {
              setData([...data, ...response.body.content])
            }
            setPage(prevState => prevState + 1)
            setLastPage(response.body.last)
            setStatus('fetched')
          }
        })
        .catch((e) => {
          if (mounted) {
            console.log(e)
            setStatus('error')
            if(e.response) setStatus('notFound')     
          }
        })
    };
    fetchData();

    return function cleanUp() {
      mounted = false;
    }
  }, [query, errorFlag]);

  
  const restart = () => {
    setStatus('idle')
    setData()
    setPage(0)
    setLastPage(false)
  }

  return [status, data, page, lastPage, restart];
};
