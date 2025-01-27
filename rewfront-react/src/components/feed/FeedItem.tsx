import React, { useState } from 'react';
import { RSSFeed } from '../../models/RSSFeed';
import './FeedItem.css';
import { Button } from '@mui/material';

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
          <Button variant="contained" onClick={handleSave}>Save</Button>
          <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
        </form>
      ) : (
        <div>
          <div>{item.id}</div>
        <div>
          <h2>{item.Name}: {item.Title}</h2>
          <p>Description: {item.Description}</p>
          <p>Link: <a href={item.Url}>{item.Url} </a></p>
          <Button variant="contained" onClick={handleEdit}>Edit</Button>
          <Button variant="contained" onClick={handleDelete}>Delete</Button>
        </div>
        </div>
      )}
    </div>
  );
};

export default FeedItem;
