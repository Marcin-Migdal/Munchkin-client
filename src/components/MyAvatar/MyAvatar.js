import { Avatar, Button , makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { spacing } from "@material-ui/system";
import React, { createRef, useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  large: {
    width: theme.spacing(24),
    height: theme.spacing(24)
  }
}));

const AvatarUpload = () => {
  const classes = useStyles();

  const [image, _setImage] = useState(null);
  const inputFileRef = createRef(null);

  const cleanup = () => {
    URL.revokeObjectURL(image);
    inputFileRef.current.value = null;
  };

  const setImage = (newImage) => {
    if (image) {
      cleanup();
    }
    _setImage(newImage);
  };

  const handleOnChange = (event) => {
    const newImage = event.target?.files?.[0];

    if (newImage) {
      setImage(URL.createObjectURL(newImage));
    }
  };

  const handleClick = (event) => {
    if (image) {
      event.preventDefault();
      setImage(null);
    }
  };

  return (
    <div>
      <Avatar
        className={classes.large}
        alt="Avatar"
        src={image || "/static/img/avatars/default-profile.svg"}
      />
      <input
        ref={inputFileRef}
        accept="image/*"
        hidden
        id="avatar-image-upload"
        type="file"
        onChange={handleOnChange}
      />
      <label htmlFor="avatar-image-upload">
        <Button
          variant="contained"
          color="primary"
          component="span"
          onClick={handleClick}
        >
          {image ? "Limpar" : "Upload"}
        </Button>
      </label>
    </div>
  );
};

export default AvatarUpload;
