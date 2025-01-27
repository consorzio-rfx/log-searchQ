
import React from "react";
import { useEffect, useState } from "react";

import { RSSFeed } from "../../models/RSSFeed";
import FeedItem from "./FeedItem";

const FeedList = () => {
  const [entries, setEntries] = useState<RSSFeed[]>([]);


  
  const deleteItem = async (item: RSSFeed) => {
    const res = await fetch(`/rss/${item.id}`, { method: 'DELETE' });
    if (res.ok) {
      setEntries(entries.filter(entry => entry.id !== item.id));
    }
  };

  const editItem = async (item: RSSFeed) => {
    const res = await fetch(`/rss/${item.id}`, { method: 'PUT', body: JSON.stringify(item) });
    if (res.ok) {
      setEntries(entries.map(entry => entry.id === item.id ? item : entry));
    }
  };

  const createItem = async (item: RSSFeed) => {
    const res = await fetch('/rss', { method: 'POST', body: JSON.stringify(item) });
    if (res.ok) {
      const jsonRes = await res.json();
      item.id = jsonRes.id;
      setEntries([...entries, item]);
    }
  };

  useEffect(() => {
    const fetchEntries = async () => {
      const res = await fetch('/rss');
      const data = await res.json();
      if( Array.isArray(data) ) {
        setEntries(data);
      } else {
        setEntries([data]);
      }
    };
    fetchEntries();
  }, []);

  return (
    <> 
    <div className="feed-list">
      {entries.map((entry) => (
        <FeedItem key={entry.id} item={entry} onEdit={(item) => editItem(item)} onDelete={(item) => deleteItem(item)} />
      ))}
    </div>
    <button onClick={() => createItem({ id: 0, Name: "", Title: "", Url: "", Description: "" })}>
      Add New Item
    </button>

    </>
  );
};


export default FeedList;