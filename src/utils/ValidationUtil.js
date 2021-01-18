const emailRegexRFC5322Standard = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Valiate {
  roomRequest(roomRequest, setRoomName, setSlots, setRoomPassword) {
    if (!roomRequest.roomName) {
      setRoomName({ inputError: true, errorMessage: 'Podaj nazwe pokoju' });
      return false
    } else if (roomRequest.roomName.trim().length < 3) {
      setRoomName({ inputError: true, errorMessage: 'Nazwa pokoju jest za krótka' });
      return false
    } else if (roomRequest.roomName.trim().length > 30) {
      setRoomName({ inputError: true, errorMessage: 'Nazwa pokoju jest za długa' });
      return false
    }

    if (!roomRequest.slots) {
      setSlots({ inputError: true, errorMessage: 'Sloty nie mogą być puste' });
      return false
    } else if (roomRequest.slots < 3) {
      setSlots({ inputError: true, errorMessage: 'Slotów musi być minialnie 3' });
      return false
    } else if (roomRequest.slots > 8) {
      setSlots({ inputError: true, errorMessage: 'Slotów musi być maksymalnie 8' });
      return false
    }

    if (!roomRequest.roomPassword) {
      setRoomPassword({ inputError: true, errorMessage: 'Podaj hasło pokoju' });
      return false
    } else if (roomRequest.roomPassword.trim().length < 4) {
      setRoomPassword({ inputError: true, errorMessage: 'Hasło jest za krótkie' });
      return false
    } else if (roomRequest.roomPassword.trim().length > 24) {
      setRoomPassword({ inputError: true, errorMessage: 'Hasło jest za długie' });
      return false
    }
    return true
  }

  editUserRequest(editUserRequest, setUserName, setInGameName) {
    if (!editUserRequest.username) {
      setUserName({ inputError: true, errorMessage: 'Podaj nazwe użytkownika' });
      return false
    } else if (editUserRequest.username.trim().length < 6) {
      setUserName({ inputError: true, errorMessage: 'Nazwa użytkownika jest za krótka' });
      return false
    } else if (editUserRequest.username.trim().length > 15) {
      setUserName({ inputError: true, errorMessage: 'Nazwa użytkownika jest za długa' });
      return false
    }

    if (!editUserRequest.inGameName) {
      setInGameName({ inputError: true, errorMessage: 'Podaj Ksywke' });
      return false
    } else if (editUserRequest.inGameName < 3) {
      setInGameName({ inputError: true, errorMessage: 'Ksywka jest za krótka' });
      return false
    } else if (editUserRequest.inGameName > 16) {
      setInGameName({ inputError: true, errorMessage: 'Ksywka jest za długa' });
      return false
    }
    return true
  }

  editUserPasswordRequest(editUserPasswordRequest, setOldPassword, setNewPassword, setNewRePassword) {
    if (!editUserPasswordRequest.oldPassword) {
      setOldPassword({ inputError: true, errorMessage: 'Podaj stare hasło' });
      return false;
    }

    if (!editUserPasswordRequest.newPassword) {
      setNewPassword({ inputError: true, errorMessage: 'Podaj nowe hasło' });
      return false;
    } else if (editUserPasswordRequest.newPassword.length < 8) {
      setNewPassword({ inputError: true, errorMessage: 'Hasło jest za krótkie' });
      return false;
    } else if (editUserPasswordRequest.newPassword.length > 20) {
      setNewPassword({ inputError: true, errorMessage: 'Hasło jest za długie' });
      return false;
    } else if (!editUserPasswordRequest.newRePassword) {
      setNewRePassword({ inputError: true });
      return false;
    } else if (editUserPasswordRequest.newPassword !== editUserPasswordRequest.newRePassword) {
      setNewPassword(state => ({ ...state, inputError: true, errorMessage: 'Hasła nie są takie same' }));
      setNewRePassword(state => ({ ...state, inputError: true, errorMessage: 'Hasła nie są takie same' }));
      return false;
    } else if (editUserPasswordRequest.newPassword === editUserPasswordRequest.oldPassword) {
      setNewPassword(state => ({ ...state, inputError: true, errorMessage: 'Nowe hasło jest takie same jak stare hasło' }));
      setNewRePassword(state => ({ ...state, inputError: true, errorMessage: 'Nowe hasło jest takie same jak stare hasło' }));
      return false;
    };

    return true;
  }

  signIn(loginInput, setLogin, passwordInput, setPassword) {
    if (!loginInput) {
      setLogin({ inputError: true, errorMessage: 'Podaj login' })
      return false;
    }
    if (!passwordInput) {
      setPassword({ inputError: true, errorMessage: 'Podaj Hasło' })
      return false;
    }
    return true;
  };

  signUp(inGameName, setInGameName, userName, setUserName, email, setEmail,
    password, setPassword, rePassword, setRePassword) {
    if (!inGameName.value) {
      setInGameName({ inputError: true, errorMessage: 'Podaj Ksywke' });
      return false;
    } else if (inGameName.value.trim().length < 3) {
      setInGameName({ inputError: true, errorMessage: 'Ksywka jest za krótka' });
      return false;
    } else if (inGameName.value.trim().length > 16) {
      setInGameName({ inputError: true, errorMessage: 'Ksywka jest za długa' });
      return false;
    };

    if (!userName.value) {
      setUserName({ inputError: true, errorMessage: 'Podaj nazwe użytkownika' });
      return false;
    } else if (userName.value.trim().length < 6) {
      setUserName({ inputError: true, errorMessage: 'Nazwa użytkownika jest za krótka' });
      return false;
    } else if (userName.value.trim().length > 15) {
      setUserName({ inputError: true, errorMessage: 'Nazwa użytkownika jest za długa' });
      return false;
    };

    if (!email.value) {
      setEmail({ inputError: true, errorMessage: 'Podaj email' });
      return false;
    } else if (!email.value.match(emailRegexRFC5322Standard)) {
      setEmail({ inputError: true, errorMessage: 'Wpisz poprawny email' });
      return false;
    } else if (email.value.trim().length > 40) {
      setEmail({ inputError: true, errorMessage: 'Email jest za długi' });
      return false;
    };

    if (!password.value) {
      setPassword({ inputError: true, errorMessage: 'Podaj hasło' });
      return false;
    } else if (password.value.length < 8) {
      setPassword({ inputError: true, errorMessage: 'Hasło jest za krótkie' });
      return false;
    } else if (password.value.length > 20) {
      setPassword({ inputError: true, errorMessage: 'Hasło jest za długie' });
      return false;
    } else if (!rePassword.value) {
      setRePassword({ inputError: true });
      return false;
    } else if (password.value !== rePassword.value) {
      setPassword(state => ({ ...state, inputError: true, errorMessage: 'Hasła nie są takie same' }));
      setRePassword(state => ({ ...state, inputError: true, errorMessage: 'Hasła nie są takie same' }));
      return false;
    };
    return true;
  }
}

const val = new Valiate();
export default val;
