import { run } from "../services/db.js";

export const create = (fileObj) => {
  console.log(fileObj);
  const stmt = `INSERT INTO file (file_name, path, size, upload_date) VALUES ('${fileObj.file_name}', '${fileObj.path}', '${fileObj.size}', '${fileObj.uploadDate}');`;
  console.log(stmt);
  const result = run(stmt);
  if (!result.changes) {
    return "Error in uploading file";
  }
  return "File uploaded successfully";
};

export const update = (objectId, fileObj) => {
  const stmt = `UPDATE file SET file_name = ${fileObj.name}, path = ${fileObj.path}, size = ${fileObj.size}, upload_date = ${fileObj.uploadDate} WHERE id = ${objectId}`;
};