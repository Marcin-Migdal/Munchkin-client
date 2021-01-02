import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { classes } from './useInput.styles'

export default function useInput({ inputType, inputLabel, size }) {
  const [values, setValue] = useState({
    value: '',
    inputError: false,
    errorMessage: ''
  });

  const styles = classes();

  const input = (
    <div className={styles.root}>
      <TextField
        color='secondary'
        variant="outlined"
        size={size ? size : 'medium'}
        label={inputLabel}
        type={inputType}
        InputProps={{ inputProps: { min: 3, max: 8 } }}
        error={values.inputError}
        helperText={values.errorMessage}
        onChange={(e) => {
          setValue({
            value: e.target.value,
            inputError: false,
            errorMessage: ''
          });
        }}
      />
    </div>
  );

  return [input, values, setValue];
}