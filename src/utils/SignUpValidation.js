const emailRegexRFC5322Standard = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function SignUpValidation(inGameName, userName, email, password, rePassword) {
  if (!inGameName.value) {
    inGameName.setInputError(true);
    inGameName.setErrorMessage('Podaj Ksywke');
    return false;
  } else if (inGameName.value.trim().length < 3) {
    inGameName.setInputError(true);
    inGameName.setErrorMessage('Ksywka jest za krótka');
    return false;
  } else if (inGameName.value.trim().length > 24) {
    inGameName.setInputError(true);
    inGameName.setErrorMessage('Ksywka jest za długa');
    return false;
  };

  if (!userName.value) {
    userName.setInputError(true);
    userName.setErrorMessage('Podaj login');
    return false;
  } else if (userName.value.trim().length < 6) {
    userName.setInputError(true);
    userName.setErrorMessage('Login jest za krótki');
    return false;
  } else if (userName.value.trim().length > 15) {
    userName.setInputError(true);
    userName.setErrorMessage('Login jest za długi');
    return false;
  };

  if (!email.value) {
    email.setInputError(true);
    email.setErrorMessage('Podaj email');
    return false;
  } else if (!email.value.match(emailRegexRFC5322Standard)) {
    email.setInputError(true);
    email.setErrorMessage('Wpisz poprawny email');
    return false;
  } else if (email.value.trim().length > 40) {
    email.setInputError(true);
    email.setErrorMessage('Email jest za długi');
    return false;
  };

  if (!password.value) {
    password.setInputError(true);
    password.setErrorMessage('Podaj hasło');
    return false;
  } else if (password.value.length < 8) {
    password.setInputError(true);
    password.setErrorMessage('Hasło jest za krótkie');
    return false;
  } else if (password.value.length > 20) {
    password.setInputError(true);
    password.setErrorMessage('Hasło jest za długie');
    return false;
  } else if (!rePassword.value) {
    rePassword.setInputError(true);
    return false;
  } else if (password.value !== rePassword.value) {
    password.setInputError(true);
    rePassword.setInputError(true);
    password.setErrorMessage('Hasła nie są takie same');
    rePassword.setErrorMessage('Hasła nie są takie same');
    return false;
  };
  return true;
}