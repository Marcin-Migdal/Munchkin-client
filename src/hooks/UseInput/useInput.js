import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { classes } from './useInput.styles'

export default function useInput({ inputType, inputLabel, size, color, customClasses }) {
  const [values, setValue] = useState({
    value: '',
    inputError: false,
    errorMessage: ''
  });

  const styles = classes();

  const handleChange = (e) => {
    setValue({
      value: e.target.value,
      inputError: false,
      errorMessage: ''
    });
  }

  const input = (
    <div className={customClasses ? customClasses : styles.input}>
      <TextField
        color={color}
        variant="outlined"
        size={size}
        label={inputLabel}
        type={inputType}
        InputProps={{ inputProps: { min: 3, max: 8 } }}
        error={values.inputError}
        helperText={values.errorMessage}
        onChange={handleChange}
      />
    </div>
  );

  return [input, values, setValue];
}