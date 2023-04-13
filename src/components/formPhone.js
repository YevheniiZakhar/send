import { Controller, useFormContext } from 'react-hook-form';
import { FormControl, FormHelperText } from '@mui/material';
import PhoneInput from 'react-phone-input-2';
import { useEffect } from 'react';

const FormPhone = () => {

  useEffect(() => {
    const result = document.getElementById('test-check').getElementsByClassName('special-label');
    console.log(result[0]);
    result[0].style.display = 'block';
    result[0].innerHTML = 'Телефон';
  }, []);

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
      <Controller control={control} name={'phone'} defaultvalue="" render={({ field })=> (
        <FormControl fullWidth error={!!errors['phone']}>
          <div id='test-check'>
            <PhoneInput
              {...field}
              country={'ua'}
              onlyCountries={['ua']}
              onChange={field.onChange}
              placeholder="+380"
              searchPlaceholder="2"
              searchNotFound="3"
              isValid={!errors['phone']}
            />
          </div>
          <FormHelperText>{errors['phone'] ? errors['phone'].message : ''}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FormPhone;