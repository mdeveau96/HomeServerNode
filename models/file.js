import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { query, run } from "../services/db.js";
import { create, update } from "../services/files.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const workDir = path.join(__dirname, "..", "uploads");
const dbFile = path.join(__dirname, "..", "data", "files.json");
const filesList = [];

const getFilesFromDir = (callback) => {
  fs.readdir(workDir, (err, uploadedFiles) => {
    if (err) {
      return callback([]);
    }
    callback(uploadedFiles);
  });
};
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

const getFilesfromDBFile = (callback) => {
  fs.readFile(dbFile, (err, fileNames) => {
    if (err) {
      return callback([]);
    }
    callback(JSON.parse(fileNames));
  });
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
      console.log(files);
      for (let file of files) {
        console.log(file.id);
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
