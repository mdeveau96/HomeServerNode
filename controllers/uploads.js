import { File } from "../models/file.js";
import fs from "fs";
import path from "path";
import { paginate } from "../utils/paginate.js";
import { getNumberOfPages } from "../utils/getNumberOfPages.js";
import { sizeConversion } from "../utils/sizeConversion.js";

export const postAddUpload = (req, res, next) => {
  if (req.file == undefined) {
    req.flash(
      "error",
      "File upload failed. Please ensure you have added a file before submitting"
    );
    res.redirect("/home?page=1");
  } else {
    const upload = req.file;
    const name = upload.originalname;
    const path = upload.path;
    const size = sizeConversion(upload.size);
    const uploadDate = new Date().toLocaleString();
    return File.create({
      file_name: name,
      path: path,
      size: size,
      upload_date: uploadDate,
    })
      .then((result) => {
        req.session.isAlert = false;
        console.log("Uploaded File");
        res.redirect("/home?page=1");
      })
      .catch((err) => console.log(err));
  }
};

export const getUploads = (req, res, next) => {
  const page = req.query.page;
  console.log(req.session.user.isAdmin);
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  File.findAll()
    .then((fileList) => {
      let pagedFileList = paginate(page, fileList);
      res.render("index", {
        files: pagedFileList,
        pageTitle: "Home Server",
        path: "/home",
        hasFiles: fileList.length > 0,
        isAlert: req.session.isAlert,
        numberOfPages: getNumberOfPages(fileList),
        errorMessage: message,
        isAdmin: req.session.user.isAdmin,
      });
    })
    .catch((err) => console.log(err));
};

export const getHome = (req, res, next) => {
  res.redirect("/home?page=1");
};

export const getFile = (req, res, next) => {
  const file = req.params.fileName;
  const filePath = path.join("uploads", file);
  if (file.includes(".pdf")) {
    // fs.readFile(filePath, (err, data) => {
    //   if (err) {
    //     return next(err);
    //   }
    //   res.setHeader("Content-Type", "application/pdf");
    //   res.send(data);
    // });
    const data = fs.createReadStream(filePath);
    res.setHeader("Content-Type", "application/pdf");
    data.pipe(res);
  } else {
    // fs.readFile(filePath, (err, data) => {
    //   if (err) {
    //     return next(err);
    //   }
    //   res.send(data);
    // });
    const data = fs.createReadStream(filePath);
    data.pipe(res);
  }
};
