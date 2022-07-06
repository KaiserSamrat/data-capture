import { useCallback, useEffect, useRef, useState } from 'react';
import { axiosApi } from '../helpers/api_helper';

const useInfiniteScroll = ({
  method,
  url,
  body,
  token,
  responseCallback,
  errorCallback,
  query,
  setQuery,
  setPage,
  page,
  name,
  reRender,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const observer = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading, hasMore]
  );

  useEffect(() => {
    setData([]);
  }, [query, reRender]);

  const api = () => {
    setError(false);
    setErrorMessage(null);
    // let cancel;
    axiosApi({
      method,
      url,
      data: body,
      headers: { Authorization: `Bearer ${token}` },
      //   cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        const { data } = res;
        setData((prev) => {
          return [...new Set([...prev, ...data?.[name]])];
        });
        setHasMore(data?.[name]?.length === 15);
        setLoading(false);
        responseCallback && responseCallback(res.data);
      })
      .catch((e) => {
        // if (axios.isCancel(e)) return;
        setError(true);
        setErrorMessage(e?.response?.data);
        errorCallback && errorCallback(e?.response);
      });
  };

  useEffect(() => {
    setLoading(true);
    const delayDebounceFn = setTimeout(() => {
      api();
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page, reRender]);

  //   useEffect(() => {
  //     setLoading(true);
  //     setError(false);
  //     let cancel;
  //     axiosApi({
  //       method,
  //       url,
  //       body,
  //       headers: { Authorization: `Bearer ${token}` },
  //       cancelToken: new axios.CancelToken((c) => (cancel = c)),
  //     })
  //       .then((res) => {
  //         const { data } = res;
  //         setData((prev) => {
  //           return [...new Set([...prev, ...data?.[name]])];
  //         });
  //         setHasMore(data?.[name]?.length === 10);
  //         setLoading(false);
  //         responseCallback && responseCallback(res.data);
  //       })
  //       .catch((e) => {
  //         if (axios.isCancel(e)) return;
  //         setError(true);
  //         setErrorMessage(e?.response?.data);
  //         errorCallback && errorCallback(e?.response);
  //       });
  //     return () => cancel();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [query, page, reRender]);

  function handleSearch(e) {
    setQuery(e.target.value);
    setPage(0);
  }

  return {
    loading,
    error,
    data,
    hasMore,
    errorMessage,
    lastElementRef,
    handleSearch,
    setData,
    setHasMore,
    setErrorMessage,
  };
};

export default useInfiniteScroll;

// const { loading, error, data, lastBookElementRef, handleSearch, setHasMore } =
// useInfiniteScroll({
//   method: 'Get',
//   url: `/area?key=${query}${
//     listRegion ? `&regionNames= ${listRegion}` : ''
//   }&page=${page}&limit=10`,
//   body: {},
//   token,
//   name: 'areas',
//   setData,
//   responseCallback: (data) => {
//     console.log('CallBack', data);
//     setData((prevBooks) => {
//       return [...new Set([...prevBooks, ...data?.areas])];
//     });
//     setHasMore(data?.areas.length === 10);
//   },
//   errorCallback: (err) => {
//     console.log('callBack', err);
//   },
//   query,
//   page,
//   setQuery,
//   setPage,
// });
