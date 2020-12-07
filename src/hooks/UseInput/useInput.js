import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { classes } from './useInput.styles'

export default function useInput({ inputType, inputLabel }) {
  const styles = classes();
  const [value, setValue] = useState('');
  const [inputError, setInputError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const input = (
    <div className={styles.root}>
      <TextField
        color='secondary'
        label={inputLabel}
        variant="outlined"
        type={inputType}
        error={inputError}
        helperText={errorMessage}
        onChange={(e) => {
          setValue(e.target.value);
          setInputError(false)
          setErrorMessage('')
        }}
      />
    </div>
  );

  const inputComponent = {
    value: value,
    setInputError: setInputError,
    setErrorMessage: setErrorMessage
  }

  return [input, inputComponent];
}