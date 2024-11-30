export const postLogin = (req, res, next) => {
  // Login user in
  res.redirect("/home?page=1");
};

export const getLogin = (req, res, next) => {
  res.render("index", {
    pageTitle: "Login",
    path: "/login",
    isAlert: false,
  });
};

export const postPWResetRequest = (req, res, next) => {
  res.redirect("/reset-password");
};

export const getPWResetRequest = (req, res, next) => {
  res.render("index", {
    pageTitle: "Reset Password",
    path: "/request-password-reset",
    isAlert: false,
  });
};

export const postPWReset = (req, res, next) => {
  res.redirect("/home?page=1");
};

export const getPWReset = (req, res, next) => {
  res.render("index", {
    pageTitle: "Reset Password",
    path: "/reset-password",
    isAlert: false,
  });
};
