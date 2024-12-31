import { File } from "../models/file.js";
import { User } from "../models/user.js";
import { paginate } from "../utils/paginate.js";
import { getNumberOfPages } from "../utils/getNumberOfPages.js";
import bycrypt from "bcryptjs";

export const getAdminUploads = (req, res, next) => {
  const page = req.query.page;
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  File.findAll()
    .then((fileList) => {
      let pagedFileList = paginate(page, fileList);
      res.render("admin/admin", {
        files: pagedFileList,
        pageTitle: "Home Server",
        path: "/admin/home",
        hasFiles: fileList.length > 0,
        numberOfPages: getNumberOfPages(fileList),
        errorMessage: message,
        isAdmin: req.session.user.isAdmin,
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
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAdminSignUp = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("admin/signup", {
    pageTitle: "Sign Up",
    path: "/admin/signup",
    errorMessage: message,
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
          req.flash("error", "Email already in use. Please sign in.");
          return res.redirect("/admin/signup");
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
        req.flash("error", "Failed to sign up user");
        return console.log(err);
      });
  } else {
    req.flash("error", "Passwords do not match");
    return res.redirect("/admin/signup");
  }
};

export const postAdminDeleteFile = (req, res, next) => {
  const file = req.body.fileId;
  File.findByPk(file)
    .then((file) => {
      console.log("Deleting file: " + file.file_name);
      file.destroy();
    })
    .catch((err) => {
      req.flash("error", `Failed to delete file: ${err.message}`);
      return console.log(err);
    });
  res.redirect("/admin/home?page=1");
};
