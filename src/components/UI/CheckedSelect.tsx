import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type Props = {
  name: string;
  value: string[];
  items: { name: string; value: string }[] | undefined;
  onChange: (event: SelectChangeEvent<string[]>) => void;
  placeholder?: string
};

export default function MultipleSelectCheckmarks({ name, value, items, placeholder, onChange }: Props) {
  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="multiple-checkbox-label">Extras</InputLabel>
      <Select
        labelId="multiple-checkbox-label"
        id="multiple-checkbox"
        placeholder={placeholder}
        multiple
        value={value}
        onChange={onChange}
        input={<OutlinedInput label="Extras" />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
        name={name}
      >
        {items?.map((item, index) => (
          <MenuItem key={index} value={item.name}>
            <Checkbox checked={value.indexOf(item.name) > -1} />
            <ListItemText primary={item.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
