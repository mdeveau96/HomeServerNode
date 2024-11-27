import { File } from "../models/file.js";
import fs from "fs";
import path from "path";

export const postAddUpload = (req, res, next) => {
  const upload = req.file;
  const name = upload.originalname;
  const path = upload.path;
  const size = upload.size;
  const file = new File(name, path, size);
  // console.log(file);
  file.save();
  res.redirect("/");
};

export const getUploads = (req, res, next) => {
  File.fetchAll((fileList) => {
    res.render("index", {
      files: fileList,
      pageTitle: "Home Server",
      path: "/",
      hasFiles: fileList.length > 0,
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
