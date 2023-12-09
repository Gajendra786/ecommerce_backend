const emailValidate = (email) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return regex.test(email);
};

export { emailValidate };