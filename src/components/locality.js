import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import axios from "axios";
import TextField from '@mui/material/TextField';

export default function Locality({ localityChanged, field }) {
  const [lOptions, setLOptions] = useState([]);

  const onAutocompleteChange = async (event, value) => {
      if (value.length > 1 && event.type !== "click") {
        const res = await axios.get(process.env.REACT_APP_SERVER_URL+`ad/locality?str=${value}`);
        if (res.status === 200) {
          setLOptions(res.data);
        }
      } else {
        setLOptions([]);
      }
    }

  const onLChange = (e, v) => {
      if (v !== null)
          localityChanged(v.id);
      else 
          localityChanged(0);
  }

  return (
    <Autocomplete
      {...field}
      openOnFocus={true}
      loading={true}
      getOptionLabel={(o) => o.locality}
      loadingText="Введіть назву міста або села українською мовою"
      options={lOptions}
      sx={{ width: '100%' }}
      onInputChange={onAutocompleteChange}
      onChange={onLChange}
      renderOption={(props, option) => {
        return (
            <li {...props} key={option.id}>
            {option.locality}
            </li>
        );
      }}
      renderInput={(params) => <TextField {...params} label="Місцезнаходження" />}
    />
  )
}