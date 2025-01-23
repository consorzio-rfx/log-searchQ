import React from "react";
import DataFetcher from "./DataFetcher";

const FeedUrl = "http://10.1.1.127:8080/";

const FeedFetch = () => {
  return (
    <div>
      <h1>Lista di utenti</h1>
      <DataFetcher
        url={FeedUrl + "guitar-store/guitar"}
        renderData={(data) => (
          <ul>
            {data.map((guitar) => (
              <li key={guitar.id}>
                {guitar.brand} - {guitar.model}
              </li>
            ))}
          </ul>
        )}
        renderLoading={() => <p>Caricamento in corso...</p>}
        renderError={(error) => <p>Errore nel caricamento: {error}</p>}
      />
    </div>
  );
};

export default FeedFetch;
