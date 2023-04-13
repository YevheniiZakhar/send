export const requiredValidator = (value, controlName) => {
  if (value === "0" || !value) {
    return "Заполните " + controlName;
  }
  return "";
};

export const lengthValidator = (value, controlName) => {
  if (value.length < 15) {
    return controlName + " должен содержать больше символов";
  }
  return "";
};

export const emailValidator = (email) => {
  if (!email) {
    return "Email is required";
  } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
    return "Incorrect email format";
  }
  return "";
};

export const passwordValidator = (password) => {
  if (!password) {
    return "Password is required";
  } else if (password.length < 8) {
    return "Password must have a minimum 8 characters";
  }
  return "";
};

export const confirmPasswordValidator = (confirmPassword, form) => {
  if (!confirmPassword) {
    return "Confirm password is required";
  } else if (confirmPassword.length < 8) {
    return "Confirm password must have a minimum 8 characters";
  } else if (confirmPassword !== form.password) {
    return "Passwords do not match";
  }
  return "";
};

export const NameValidator = (confirmPassword, form) => {
  if (!confirmPassword) {
    return "Confirm password is required";
  } else if (confirmPassword.length < 8) {
    return "Confirm password must have a minimum 8 characters";
  } else if (confirmPassword !== form.password) {
    return "Passwords do not match";
  }
  return "";
};
