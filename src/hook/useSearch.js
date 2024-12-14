import { useState } from "react";

export default function useSearch(url) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const search = async (params, token) => {
    setLoading(true);
    setError(null);
    setResult(null);

    // Construct the query string from the params object
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    const fullUrl = `${url}${queryString}`;

    try {
      const response = await fetch(fullUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }
      setResult(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, result, search };
}
