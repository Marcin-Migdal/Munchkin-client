import { useEffect, useState } from 'react';
import api from '../api/api';

export default function useFetchGet({ url, reloadFlag }) {
  const [data, setData] = useState();
  
  useEffect(() => {
    let mounted = true;
    if(!url) return
    const fetchData = async () => {
      await api.httpGET(url)
        .then((response) => {
          if (mounted) {
            setData(response.body)
          }
        })
        .catch((e) => { console.log(e) })
    };
    fetchData();
    return function cleanUp() {
      mounted = false;
    }
  }, [url, reloadFlag]);

  return [data, setData] ;
};
