import { Grid, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import React from 'react';

const Input = ({
  name,
  type,
  handleChange,
  handleShowPassword,
  autoFocus,
  label,
  haft,
}) => {
  return (
    <Grid xs={12} sm={haft ? 6 : 12} item>
      <TextField
        name={name}
        onChange={handleChange}
        autoFocus={autoFocus}
        label={label}
        type={type}
        variant='outlined'
        required
        fullWidth
        InputProps={
          name === 'password'
            ? {
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={handleShowPassword}>
                      {type === 'password' ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default Input;
