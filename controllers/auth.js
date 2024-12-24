import { User } from "../models/user.js";
import bycrypt from "bcryptjs";

export const postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        return res.redirect("/login");
      }
      return bycrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/home?page=1");
            });
          }
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getLogin = (req, res, next) => {
  res.render("index", {
    pageTitle: "Login",
    path: "/login",
    isAlert: false,
    isAuthenticated: false,
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
