import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);

  const fetchData = () =>
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data));

  useEffect(() => {
    fetchData();
  }, [data]);

  return [data, fetchData];
};

export default useFetch;
