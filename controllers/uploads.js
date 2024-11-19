import { File } from "../models/file.js";

export const postAddUpload = (req, res, next) => {
  const file = new File(req.file);
  file.save();
  console.log(file);
  res.redirect("/");
};

export const getUploads = (req, res, next) => {
  File.fetchAll((fileList) => {
    res.render("index", {
      files: fileList,
      pageTitle: "Home",
      path: "/",
      hasFiles: fileList > 0,
    });
  });
};
