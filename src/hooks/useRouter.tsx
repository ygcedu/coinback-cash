import {useHistory} from 'react-router-dom';
import {useEffect, useState} from 'react';

export const useRouter = () => {
  const history = useHistory();
  const [url, setUrl] = useState('/');
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (flag) {
      history.push(url);
    }
  }, [url]);

  const redirect = (url: string) => {
    setUrl(url);
    setFlag(true);
  };

  return {redirect};
};
