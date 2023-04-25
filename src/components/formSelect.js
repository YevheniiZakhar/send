import { useState } from 'react';
import { Select, InputLabel, FormControl, MenuItem, FormHelperText } from '@mui/material';
// import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const FormSelect = ({ name, label, options, ...otherProps }) => { //: FC<iforminputprops>
  const {
    control,
    formState: { errors },
  } = useFormContext();
 
  return (
    <Controller control={control} name={name} render={({ field })=> (
        <FormControl fullWidth error={!!errors[name]}>
          <InputLabel>{label}</InputLabel>
          <Select
            {...otherProps}
            {...field}
            error={!!errors[name]}
            required
            label={label}
            onChange={field.onChange}
          >
            {options && options.map((i, index) => <MenuItem key={index} value={i.id}>{i.name}</MenuItem>)}
          </Select>
          <FormHelperText>{errors[name] ? errors[name].message : ''}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FormSelect;