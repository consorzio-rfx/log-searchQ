import React, { useState, useEffect } from "react";

const DataFetcher = ({ url, renderData, renderLoading, renderError }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Funzione per recuperare i dati
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Errore nella richiesta: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  // Gestione degli stati
  if (loading) return renderLoading ? renderLoading() : <p>Caricamento...</p>;
  if (error) return renderError ? renderError(error) : <p>Errore: {error}</p>;
  if (data) return renderData(data);

  return null; // Fallback in caso di assenza di dati
};

export default DataFetcher;
