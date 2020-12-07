import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

export default function ButtonComponent({ url, text, btnStyle, variantStyle, paletteColor, action }) {
  return url ?
    (<Button component={Link} to={url} className={btnStyle} variant={variantStyle} color={paletteColor} onClick={action} >
      {text}
    </Button>) : (
      <Button className={btnStyle} variant={variantStyle} color={paletteColor} onClick={action} >
        {text}
      </Button>
    )
}
