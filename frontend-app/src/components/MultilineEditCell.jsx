import React from 'react';
import { TextField } from '@mui/material';

function MultilineEditCell(props) {
  const { id, value, api, field } = props;

  const handleChange = (event) => {
    api.setEditCellValue({ id, field, value: event.target.value });
  };

  return (
    <TextField
        multiline
        fullWidth
        value={value}
        onChange={handleChange}
        variant="standard"
        slotProps={{ input: {disableUnderline: true} }}
    />
  );
}

export default MultilineEditCell;
