import { File } from "../models/file.js";
import fs from "fs";
import path from "path";
import { paginate } from "../utils/paginate.js";
import { getNumberOfPages } from "../utils/getNumberOfPages.js";
import { sizeConversion } from "../utils/sizeConversion.js";

export const postAddUpload = (req, res, next) => {
  if (req.file == undefined) {
    File.fetchAll((fileList) => {
      res.render("index", {
        files: fileList,
        pageTitle: "Home Server",
        path: "/",
        hasFiles: fileList.length > 0,
        isAlert: true,
      });
    });
  } else {
    const upload = req.file;
    const name = upload.originalname;
    const path = upload.path;
    const size = sizeConversion(upload.size);
    const uploadDate = new Date().toLocaleString();
    const file = new File(name, path, size, uploadDate);
    file.save();
    res.redirect("/?page=1");
  }
};

export const getUploads = (req, res, next) => {
  const page = req.query.page;
  File.fetchAll((fileList) => {
    let pagedFileList = paginate(page, fileList);
    res.render("index", {
      files: pagedFileList,
      pageTitle: "Home Server",
      path: "/",
      hasFiles: fileList.length > 0,
      isAlert: false,
      numberOfPages: getNumberOfPages(fileList),
    });
  });
};

export const getFile = (req, res, next) => {
  const file = req.params.fileName;
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
