import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

export default function ButtonComponent({ to, text, btnStyle, variantStyle, paletteColor, action }) {
  return (
    <>
      {to ?
        <Link to={to} style={{ textDecoration: 'none' }}>
          <Button className={btnStyle} variant={variantStyle} color={paletteColor} >
            {text}
          </Button>
        </Link> :
        <Button className={btnStyle} variant={variantStyle} color={paletteColor} onClick={action} >
          {text}
        </Button>
        }
    </>
  )
}
