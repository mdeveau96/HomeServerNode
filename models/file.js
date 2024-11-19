import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const workDir = path.join(__dirname, "uploads");
const filesList = [];

const getFilesFromDir = (callback) => {
  fs.readdir(workDir, (err, files) => {
    if (err) {
      return callback([]);
    }
    files.forEach((file) => {
      filesList.push(file);
    });
    callback(filesList);
  });
};

export class File {
  constructor(name) {
    this.name = name;
  }
  save() {}
  static fetchAll(callback) {
    getFilesFromDir(callback);
  }
}
