import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

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
const getFilesfromDBFile = (callback) => {
  fs.readFile(dbFile, (err, fileNames) => {
    if (err) {
      return callback([]);
    }
    callback(JSON.parse(fileNames));
  });
};

export class File {
  constructor(name, path, size) {
    this.name = name;
    this.path = path;
    this.size = size;
  }
  save() {
    getFilesfromDBFile((files) => {
      files.push(this);
      fs.writeFile(dbFile, JSON.stringify(files), (err) => {
        console.log(err);
      });
    });
  }
  static fetchAll(callback) {
    getFilesfromDBFile(callback);
  }
}
