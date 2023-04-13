import { TextField } from '@mui/material';
// import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';


const FormInput = ({ name, mt, ...otherProps }) => { //: FC<iforminputprops>

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
        <Controller control={control} name={name} defaultvalue="" render={({ field })=> (
          <TextField
            {...otherProps}
            {...field}
            error={!!errors[name]}
            helperText={errors[name] ? errors[name].message : ''}
            sx={{ mb: '1rem', mt: mt ? mt : '' }}
          />
        )}/>
      
  );
};
// TODO optimaze files on front and send less less vesion (zip version) of the files
export default FormInput;