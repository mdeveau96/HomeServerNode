import { File } from "../models/file.js";
import { User } from "../models/user.js";
import { paginate } from "../utils/paginate.js";
import { getNumberOfPages } from "../utils/getNumberOfPages.js";
import { sizeConversion } from "../utils/sizeConversion.js";
import bycrypt from "bcryptjs";

export const getAdminUploads = (req, res, next) => {
  const page = req.query.page;
  File.findAll()
    .then((fileList) => {
      let pagedFileList = paginate(page, fileList);
      res.render("admin/admin", {
        files: pagedFileList,
        pageTitle: "Home Server",
        path: "/admin/home",
        hasFiles: fileList.length > 0,
        isAlert: false,
        numberOfPages: getNumberOfPages(fileList),
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAdminHome = (req, res, next) => {
  res.redirect("/admin/home?page=1");
};

export const getAdminUsers = (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.render("admin/users", {
        users: users,
        pageTitle: "Users",
        path: "/admin/users",
        isAlert: false,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAdminSignUp = (req, res, next) => {
  res.render("admin/signup", {
    pageTitle: "Sign Up",
    path: "/admin/signup",
    isAuthenticated: req.session.isLoggedIn,
  });
};

export const postAdminSignup = (req, res, next) => {
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;
  const password = req.body.password1;
  const confirmPassword = req.body.password2;
  if (password === confirmPassword) {
    User.findOne({ where: { email: email } })
      .then((userDoc) => {
        if (userDoc) {
          return res.redirect("/signup");
        }
        return bycrypt
          .hash(password, 12)
          .then((hashedPassword) => {
            const user = new User({
              email: email,
              phoneNumber: phoneNumber,
              password: hashedPassword,
            });
            return user.save();
          })
          .then((result) => {
            return res.redirect("/login");
          });
      })
      .catch((err) => {
        return console.log(err);
      });
  }
  return res.redirect("/signup");
};
