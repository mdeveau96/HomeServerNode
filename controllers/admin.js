import { File } from "../models/file.js";
import fs from "fs";
import path from "path";
import { paginate } from "../utils/paginate.js";
import { getNumberOfPages } from "../utils/getNumberOfPages.js";
import { sizeConversion } from "../utils/sizeConversion.js";

export const getAdminUploads = (req, res, next) => {
  const page = req.query.page;
  File.fetchAll((fileList) => {
    let pagedFileList = paginate(page, fileList);
    res.render("admin/admin", {
      files: pagedFileList,
      pageTitle: "Home Server",
      path: "/admin/home",
      hasFiles: fileList.length > 0,
      isAlert: false,
      numberOfPages: getNumberOfPages(fileList),
      isAuthenticated: req.isLoggedIn,
      isAdmin: req.isAdmin,
    });
  });
};

export const getAdminHome = (req, res, next) => {
  res.redirect("/admin/home?page=1");
};

export const getAdminUsers = (req, res, next) => {
  //fetch all users
  res.render("admin/users", {
    pageTitle: "Users",
    path: "/admin/users",
    isAlert: false,
    isAuthenticated: req.isLoggedIn,
    isAdmin: req.isAdmin,
  });
};

export const getAdminSignUp = (req, res, next) => {
  res.render("admin/signup", {
    pageTitle: "Sign Up",
    path: "/admin/signup",
    isAlert: false,
    isAuthenticated: req.isLoggedIn,
    isAdmin: req.isAdmin,
  });
};
