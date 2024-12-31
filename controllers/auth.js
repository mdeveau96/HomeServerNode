import { User } from "../models/user.js";
import bycrypt from "bcryptjs";

export const postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid email and/or password");
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
          req.flash("error", "Invalid email and/or password");
          console.log(err);
          res.redirect("/login");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("index", {
    pageTitle: "Login",
    path: "/login",
    errorMessage: message,
  });
};

export const postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/login");
  });
};

// export const postPWResetRequest = (req, res, next) => {
//   const emailPW = req.body.emailPW;
//   if (checkIfEmailOrPhoneNumber(emailPW) === "email") {
//     //send email
//     console.log("This is an email");
//     res.redirect("request-password-reset");
//   } else if (checkIfEmailOrPhoneNumber(emailPW) === "phone") {
//     // send text
//     console.log("This is an phoneNumber");
//     res.redirect("request-password-reset");
//   } else {
//     res.redirect("/reset-password");
//   }
// };

// export const getPWResetRequest = (req, res, next) => {
//   res.render("index", {
//     pageTitle: "Reset Password",
//     path: "/request-password-reset",
//     isAlert: req.session.isAlert,
//   });
// };

// export const postPWReset = (req, res, next) => {
//   res.redirect("/home?page=1");
// };

// export const getPWReset = (req, res, next) => {
//   res.render("index", {
//     pageTitle: "Reset Password",
//     path: "/reset-password",
//     isAlert: req.session.isAlert,
//   });
// };
