export const checkIfEmailOrPhoneNumber = (string) => {
  const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const rePN = /\d{3}\d{3}\d{4}/;
  if (reEmail.test(string)) {
    return "email";
  } else if (rePN.test(string)) {
    return "phone";
  } else {
    return false;
  }
};
