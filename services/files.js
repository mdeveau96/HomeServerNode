import { run } from "../services/db.js";

export const createFile = (fileObj) => {
  const stmt = `INSERT INTO files (file_name, path, size, upload_date) VALUES ('${fileObj.file_name}', '${fileObj.path}', '${fileObj.size}', '${fileObj.uploadDate}');`;
  const result = run(stmt);
  if (!result.changes) {
    return "Error in uploading file";
  }
  return "File uploaded successfully";
};

export const updateFile = (objectId, fileObj) => {
  const stmt = `UPDATE files SET file_name = ${fileObj.name}, path = ${fileObj.path}, size = ${fileObj.size}, upload_date = ${fileObj.uploadDate} WHERE id = ${objectId}`;
};
