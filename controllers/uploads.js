import { File } from "../models/file.js";
import fs from "fs";
import path from "path";
import { paginate } from "../utils/paginate.js";
import { getNumberOfPages } from "../utils/getNumberOfPages.js";
import { sizeConversion } from "../utils/sizeConversion.js";

export const postAddUpload = (req, res, next) => {
  if (req.file == undefined) {
    const page = req.query.page;
    File.findAll()
      .then((fileList) => {
        let pagedFileList = paginate(page, fileList);
        res.render("index", {
          files: pagedFileList,
          pageTitle: "Home Server",
          path: "/home?page=1",
          hasFiles: fileList.length > 0,
          isAlert: true,
          numberOfPages: getNumberOfPages(fileList),
          isAuthenticated: req.session.isLoggedIn,
        });
      })
      .catch((err) => console.log(err));
  } else {
    const upload = req.file;
    const name = upload.originalname;
    const path = upload.path;
    const size = sizeConversion(upload.size);
    const uploadDate = new Date().toLocaleString();
    File.create({
      file_name: name,
      path: path,
      size: size,
      upload_date: uploadDate,
    })
      .then((result) => {
        console.log("Uploaded File");
        res.redirect("/home?page=1");
      })
      .catch((err) => console.log(err));
  }
};

export const getUploads = (req, res, next) => {
  console.log(req.user);
  const page = req.query.page;
  File.findAll()
    .then((fileList) => {
      let pagedFileList = paginate(page, fileList);
      res.render("index", {
        files: pagedFileList,
        pageTitle: "Home Server",
        path: "/home",
        hasFiles: fileList.length > 0,
        isAlert: false,
        numberOfPages: getNumberOfPages(fileList),
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.log(err));
};

export const getHome = (req, res, next) => {
  res.redirect("/home?page=1");
};

export const getFile = (req, res, next) => {
  const file = req.params.fileName;
  console.log(file);
  const filePath = path.join("uploads", file);
  if (file.includes(".pdf")) {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        return next(err);
      }
      res.setHeader("Content-Type", "application/pdf");
      res.send(data);
    });
  } else {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        return next(err);
      }
      res.send(data);
    });
  }
};
