import React, { useState } from 'react';
import { RSSFeed } from '../../models/RSSFeed';
import './FeedItem.css';


type Props = {
  item: RSSFeed;
  onEdit: (item: RSSFeed) => void;
  onDelete: (item: RSSFeed) => void;
}

const FeedItem = ({ item, onEdit, onDelete }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [editedItem, setEditedItem] = useState<RSSFeed>(item);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    onEdit(editedItem);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleDelete = () => {
    onDelete(item);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedItem({
      ...editedItem,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className={editMode ? 'feed-item edit-mode' : 'feed-item'}>
      {editMode ? (
        <form>
          <input type="text" name="Title" value={editedItem.Title} onChange={handleChange} />
          <input type="text" name="Url" value={editedItem.Url} onChange={handleChange} />
          <input type="textarea" name="Description" value={editedItem.Description} onChange={handleChange} />
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      ) : (
        <div>
          <div>{item.id}</div>
        <div>
          <h2>{item.Name}: {item.Title}</h2>
          <p>Description: {item.Description}</p>
          <p>Link: <a href={item.Url}>{item.Url} </a></p>
          <button type="button" onClick={handleEdit}>Edit</button>
          <button type="button" onClick={handleDelete}>Delete</button>
        </div>
        </div>
      )}
    </div>
  );
};

export default FeedItem;
