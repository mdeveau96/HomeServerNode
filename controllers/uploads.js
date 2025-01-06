import { File } from "../models/file.js";
import fs from "fs";
import path from "path";
import { paginate } from "../utils/paginate.js";
import { sizeConversion } from "../utils/sizeConversion.js";

const ITEMS_PER_PAGE = 10;

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
  const page = +req.query.page || 1;
  console.log(req.session.user.isAdmin);
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  let totalFiles;
  File.count()
    .then((numFiles) => {
      totalFiles = numFiles;
      return File.findAll({
        offset: (page - 1) * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
      });
    })
    .then((fileList) => {
      res.render("index", {
        files: fileList,
        pageTitle: "Home Server",
        path: "/home",
        hasFiles: fileList.length > 0,
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalFiles,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalFiles / ITEMS_PER_PAGE),
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
