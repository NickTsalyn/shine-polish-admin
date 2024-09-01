import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { styledOutlinedInput} from '@/styles/overrides';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
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
    <FormControl sx={{ width: "100%" }}>
      <InputLabel id="multiple-checkbox-label" sx={{color: "#E6BA95", "&.Mui-focused": {color: "#E6BA95"}}}>Extras</InputLabel>
      <Select
        labelId="multiple-checkbox-label"
        id="multiple-checkbox"
        placeholder={placeholder}
        multiple
        value={value}
        onChange={onChange}
        input={<OutlinedInput  label="Extras" sx={{ ...styledOutlinedInput}}/>}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
        name={name}
      >
        {items?.map((item, index) => (
          <MenuItem key={index} value={item.name}   sx={{
            '&.Mui-selected': {
              backgroundColor: '#fff',
              color: '#E6BA95',
            },
            '&.Mui-selected:focus': {
              backgroundColor: '#E6BA95',
            },
          }}>
            <Checkbox checked={value.indexOf(item.name) > -1} sx={{
          color: '#006778', // не активний
          '&.Mui-checked': {
          color: '#780032', // активний
           
          },
        }}/>
            <ListItemText primary={item.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
