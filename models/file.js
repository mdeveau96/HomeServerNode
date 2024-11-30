import { query, run } from "../services/db.js";
import { create, update } from "../services/files.js";

const getFilesfromDB = (callback) => {
  let files;
  try {
    files = query("SELECT * FROM file;").all();
  } catch (err) {
    console.error(`Error querying files: ${err}`);
    return callback([]);
  }
  callback(files);
};

export class File {
  constructor(name, path, size, uploadDate) {
    this.file_name = name;
    this.path = path;
    this.size = size;
    this.uploadDate = uploadDate;
  }
  save() {
    getFilesfromDB((files) => {
      for (let file of files) {
        if (file.file_name === this.file_name) {
          try {
            update(file.id, this);
          } catch (err) {
            console.log(err);
          }
        }
      }
      try {
        create(JSON.parse(JSON.stringify(this)));
      } catch (err) {
        console.log(err);
      }
    });
  }
  static fetchAll(callback) {
    getFilesfromDB(callback);
  }
}
