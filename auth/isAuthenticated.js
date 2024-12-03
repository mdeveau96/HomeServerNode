export const isAuthenticated = (req, res, next) => {
  const isLoggedIn = req.session.isLoggedIn;
  if (isLoggedIn === "true") {
    return next();
  }
  res.redirect("/login");
};
