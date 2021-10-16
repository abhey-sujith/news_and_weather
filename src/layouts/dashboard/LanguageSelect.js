import { useState } from 'react';
// material
import { Box, MenuItem, InputLabel, FormControl, Select } from '@mui/material';

import { useDispatch } from 'react-redux';
// components
import { getNewsDataAsync, setLanguage } from '../../features/slice/appSlice';

// ----------------------------------------------------------------------

const LANG = [
  {
    value: 'en',
    label: 'English'
  },
  {
    value: 'ar',
    label: 'Arabic'
  },
  {
    value: 'de',
    label: 'German'
  },
  {
    value: 'el',
    label: 'Greek'
  },
  {
    value: 'es',
    label: 'Spanish'
  },
  {
    value: 'fr',
    label: 'French'
  },
  {
    value: 'he',
    label: 'Hebrew'
  },
  {
    value: 'hi',
    label: 'Hindi'
  },
  {
    value: 'it',
    label: 'Italian'
  },
  {
    value: 'ja',
    label: 'Japanese'
  },
  {
    value: 'ml',
    label: 'Malayalam'
  },
  {
    value: 'mr',
    label: 'Marathi'
  },
  {
    value: 'nl',
    label: 'Dutch'
  },
  {
    value: 'no',
    label: 'Norwegian'
  },
  {
    value: 'pt',
    label: 'Portuguese'
  },
  {
    value: 'ro',
    label: 'Romanian'
  },
  {
    value: 'ru',
    label: 'Russian'
  },
  {
    value: 'sv',
    label: 'Swedish'
  },
  {
    value: 'ta',
    label: 'Tamil'
  },
  {
    value: 'te',
    label: 'Telugu'
  },
  {
    value: 'uk',
    label: 'Ukrainian'
  },
  {
    value: 'zh',
    label: 'Chinese'
  }
];

// ----------------------------------------------------------------------

export default function LanguageSelect() {
  const [value, setValue] = useState('');

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValue(e.target.value);

    dispatch(setLanguage({ value: e.target.value }));
    dispatch(getNewsDataAsync());
  };

  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">English</InputLabel>
          <Select
            key={value}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label="Language"
            onChange={handleChange}
          >
            {LANG.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
}
