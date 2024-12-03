export const postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  res.redirect("/home?page=1");
};

export const getLogin = (req, res, next) => {
  // const isLoggedIn = req.get("Cookie").split(";")[0].trim().split("=")[1];
  // const isAdmin = req.get("Cookie").split(";")[1].trim().split("=")[1];
  res.render("index", {
    pageTitle: "Login",
    path: "/login",
    isAlert: false,
    // isAuthenticated: isLoggedIn,
    // isAdmin: isAdmin,
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
    // isAuthenticated: req.isLoggedIn,
    // isAdmin: req.isAdmin,
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
    // isAuthenticated: req.isLoggedIn,
    // isAdmin: req.isAdmin,
  });
};
