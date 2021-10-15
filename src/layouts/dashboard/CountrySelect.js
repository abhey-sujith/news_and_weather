import { useState } from 'react';
// material
import { Box, MenuItem, InputLabel, FormControl, Select } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getNewsDataAsync, setCountry } from '../../features/slice/appSlice';

// ----------------------------------------------------------------------

const COUNTRY = [
  {
    value: 'in',
    label: 'India'
  },
  {
    value: 'gb',
    label: 'United Kingdom'
  },
  {
    value: 'us',
    label: 'United States'
  },
  {
    value: 'de',
    label: 'Germany'
  },
  {
    value: 'fr',
    label: 'France'
  },
  {
    value: 'au',
    label: 'Australia'
  },
  {
    value: 'br',
    label: 'Brazil'
  },
  {
    value: 'ca',
    label: 'Canada'
  },
  {
    value: 'ch',
    label: 'Switzerland'
  },
  {
    value: 'cn',
    label: 'China'
  },
  {
    value: 'eg',
    label: 'Egypt'
  },
  {
    value: 'es',
    label: 'Spain'
  },
  {
    value: 'gr',
    label: 'Greece'
  },
  {
    value: 'hk',
    label: 'Hong Kong'
  },
  {
    value: 'il',
    label: 'Israel'
  },
  {
    value: 'ie',
    label: 'Ireland'
  },
  {
    value: 'it',
    label: 'Italy'
  },
  {
    value: 'jp',
    label: 'Japan'
  },
  {
    value: 'nl',
    label: 'Netherlands'
  },
  {
    value: 'no',
    label: 'Norway'
  },
  {
    value: 'pe',
    label: 'Peru'
  },
  {
    value: 'ph',
    label: 'Philippines'
  },
  {
    value: 'pk',
    label: 'Pakistan'
  },
  {
    value: 'pt',
    label: 'Portugal'
  },
  {
    value: 'ro',
    label: 'Romania'
  },
  {
    value: 'ru',
    label: 'Russian Federation'
  },
  {
    value: 'se',
    label: 'Sweden'
  },
  {
    value: 'sg',
    label: 'Singapore'
  },
  {
    value: 'tw',
    label: 'Taiwan, Province of China'
  },
  {
    value: 'ua',
    label: 'Ukraine'
  }
];

// ----------------------------------------------------------------------

export default function CountrySelect() {
  const [value, setValue] = useState('');

  const dispatch = useDispatch();

  const handleChange = (e) => {
    console.log(e.target);
    setValue(e.target.value);

    dispatch(setCountry({ value: e.target.value }));
    dispatch(getNewsDataAsync());
  };

  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">India</InputLabel>
          <Select
            key={value}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label="Country"
            onChange={handleChange}
          >
            {COUNTRY.map((option) => (
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
