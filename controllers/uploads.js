import { File } from "../models/file.js";

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
