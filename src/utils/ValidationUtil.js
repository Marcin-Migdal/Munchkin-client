const emailRegexRFC5322Standard = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Valiate {
  roomRequest(roomRequest, setRoomName, setSlots, setRoomPassword, t) {
    if (!roomRequest.roomName) {
      setRoomName({ inputError: true, errorMessage: t('rooms:roomValidation.empty.roomName') });
      return false
    } else if (roomRequest.roomName.trim().length < 3) {
      setRoomName({ inputError: true, errorMessage: t('rooms:roomValidation.tooShort.roomName') });
      return false
    } else if (roomRequest.roomName.trim().length > 30) {
      setRoomName({ inputError: true, errorMessage: t('rooms:roomValidation.tooLong.roomName') });
      return false
    }

    if (!roomRequest.slots) {
      setSlots({ inputError: true, errorMessage: t('rooms:roomValidation.empty.slots') });
      return false
    } else if (roomRequest.slots < 3) {
      setSlots({ inputError: true, errorMessage: t('rooms:roomValidation.tooShort.slots') });
      return false
    } else if (roomRequest.slots > 8) {
      setSlots({ inputError: true, errorMessage: t('rooms:roomValidation.tooLong.slots') });
      return false
    }

    if (!roomRequest.roomPassword) {
      setRoomPassword({ inputError: true, errorMessage: t('rooms:roomValidation.empty.roomPassword') });
      return false
    } else if (roomRequest.roomPassword.length < 4) {
      setRoomPassword({ inputError: true, errorMessage: t('rooms:roomValidation.tooShort.roomPassword') });
      return false
    } else if (roomRequest.roomPassword.length > 24) {
      setRoomPassword({ inputError: true, errorMessage: t('rooms:roomValidation.tooLong.roomPassword') });
      return false
    }
    return true
  }

  editUserRequest(editUserRequest, setUserName, setInGameName, t) {
    if (!editUserRequest.username) {
      setUserName({ inputError: true, errorMessage: t('settings:validation.user.empty.username') });
      return false
    } else if (editUserRequest.username.trim().length < 6) {
      setUserName({ inputError: true, errorMessage: t('settings:validation.user.tooShort.username') });
      return false
    } else if (editUserRequest.username.trim().length > 15) {
      setUserName({ inputError: true, errorMessage: t('settings:validation.user.tooLong.username') });
      return false
    }

    if (!editUserRequest.inGameName) {
      setInGameName({ inputError: true, errorMessage: t('settings:validation.user.empty.inGameName') });
      return false
    } else if (editUserRequest.inGameName.trim().length < 3) {
      setInGameName({ inputError: true, errorMessage: t('settings:validation.user.tooShort.inGameName') });
      return false
    } else if (editUserRequest.inGameName.trim().length > 16) {
      setInGameName({ inputError: true, errorMessage: t('settings:validation.user.tooLong.inGameName') });
      return false
    }
    return true
  }

  editUserPasswordRequest(editUserPasswordRequest, setOldPassword, setNewPassword, setNewRePassword, t) {
    if (!editUserPasswordRequest.oldPassword) {
      setOldPassword({ inputError: true, errorMessage: t('settings:validation.password.empty.oldPassword') });
      return false;
    } else if (editUserPasswordRequest.oldPassword.length < 8) {
      setOldPassword({ inputError: true, errorMessage: t('settings:validation.password.tooShort') });
      return false;
    } else if (editUserPasswordRequest.oldPassword.length > 20) {
      setOldPassword({ inputError: true, errorMessage: t('settings:validation.password.tooLong') });
      return false;
    }

    if (!editUserPasswordRequest.newPassword) {
      setNewPassword({ inputError: true, errorMessage: t('settings:validation.password.empty.newPassword') });
      return false;
    } else if (editUserPasswordRequest.newPassword.length < 8) {
      setNewPassword({ inputError: true, errorMessage: t('settings:validation.password.tooShort') });
      return false;
    } else if (editUserPasswordRequest.newPassword.length > 20) {
      setNewPassword({ inputError: true, errorMessage: t('settings:validation.password.tooLong') });
      return false;
    } else if (!editUserPasswordRequest.newRePassword) {
      setNewRePassword({ inputError: true });
      return false;
    } else if (editUserPasswordRequest.newPassword !== editUserPasswordRequest.newRePassword) {
      setNewPassword(state => ({ ...state, inputError: true, errorMessage: t('settings:validation.password.doNotMatch') }));
      setNewRePassword(state => ({ ...state, inputError: true, errorMessage: t('settings:validation.password.doNotMatch') }));
      return false;
    } else if (editUserPasswordRequest.newPassword === editUserPasswordRequest.oldPassword) {
      setNewPassword(state => ({ ...state, inputError: true, errorMessage: t('settings:validation.password.newPasswordMatchAsOld') }));
      setNewRePassword(state => ({ ...state, inputError: true, errorMessage: t('settings:validation.password.newPasswordMatchAsOld') }));
      return false;
    };

    return true;
  }

  signIn(loginInput, setLogin, passwordInput, setPassword, t) {
    if (!loginInput) {
      setLogin({ inputError: true, errorMessage: t('auth:signIn.usernameInputError') })
      return false;
    }
    if (!passwordInput) {
      setPassword({ inputError: true, errorMessage: t('auth:signIn.passwordInputError') })
      return false;
    }
    return true;
  };

  signUp(inGameName, setInGameName, userName, setUserName, email, setEmail,
    password, setPassword, rePassword, setRePassword, t) {
    if (!inGameName.value) {
      setInGameName({ inputError: true, errorMessage: t('auth:signUp.validationError.empty.inGameName') });
      return false;
    } else if (inGameName.value.trim().length < 3) {
      setInGameName({ inputError: true, errorMessage: t('auth:signUp.validationError.tooShort.inGameName') });
      return false;
    } else if (inGameName.value.trim().length > 16) {
      setInGameName({ inputError: true, errorMessage: t('auth:signUp.validationError.tooLong.inGameName') });
      return false;
    };

    if (!userName.value) {
      setUserName({ inputError: true, errorMessage: t('auth:signUp.validationError.empty.username') });
      return false;
    } else if (userName.value.trim().length < 6) {
      setUserName({ inputError: true, errorMessage: t('auth:signUp.validationError.tooShort.username') });
      return false;
    } else if (userName.value.trim().length > 15) {
      setUserName({ inputError: true, errorMessage: t('auth:signUp.validationError.tooLong.username') });
      return false;
    };

    if (!email.value) {
      setEmail({ inputError: true, errorMessage: t('auth:signUp.validationError.empty.email') });
      return false;
    } else if (!email.value.match(emailRegexRFC5322Standard)) {
      setEmail({ inputError: true, errorMessage: t('auth:signUp.validationError.doNotMatch.email') });
      return false;
    } else if (email.value.trim().length > 40) {
      setEmail({ inputError: true, errorMessage: t('auth:signUp.validationError.tooLong.email') });
      return false;
    };

    if (!password.value) {
      setPassword({ inputError: true, errorMessage: t('auth:signUp.validationError.empty.password') });
      return false;
    } else if (password.value.length < 8) {
      setPassword({ inputError: true, errorMessage: t('auth:signUp.validationError.tooShort.password') });
      return false;
    } else if (password.value.length > 20) {
      setPassword({ inputError: true, errorMessage: t('auth:signUp.validationError.tooLong.password') });
      return false;
    } else if (!rePassword.value) {
      setRePassword({ inputError: true });
      return false;
    } else if (password.value !== rePassword.value) {
      setPassword(state => ({ ...state, inputError: true, errorMessage: t('auth:signUp.validationError.doNotMatch.password') }));
      setRePassword(state => ({ ...state, inputError: true, errorMessage: t('auth:signUp.validationError.doNotMatch.password') }));
      return false;
    };
    return true;
  }
}

const val = new Valiate();
export default val;
