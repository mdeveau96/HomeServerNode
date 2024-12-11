import { Sequelize } from "sequelize";
import { sequelize } from "../services/db";

export const File = sequelize.define("file", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  file_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  path: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  size: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  uploadDate: {
    type: Sequelize.DATETIME,
    allowNull: false,
  },
});

// import { query, run } from "../services/db.js";
// import { createFile, updateFile } from "../services/files.js";

// const getFilesfromDB = (callback) => {
//   let files;
//   try {
//     files = query("SELECT * FROM files;");
//   } catch (err) {
//     console.error(`Error querying files: ${err}`);
//     return callback([]);
//   }
//   callback(files);
// };

// export class File {
//   constructor(name, path, size, uploadDate) {
//     this.file_name = name;
//     this.path = path;
//     this.size = size;
//     this.uploadDate = uploadDate;
//   }
//   save() {
//     getFilesfromDB((files) => {
//       const file = files.find((f) => f.file_name === this.file_name);
//       if (file) {
//         try {
//           updateFile(file.id, this);
//         } catch (err) {
//           console.log(err);
//         }
//       } else {
//         try {
//           createFile(JSON.parse(JSON.stringify(this)));
//         } catch (err) {
//           console.log(err);
//         }
//       }
//     });
//   }
//   static fetchAll(callback) {
//     getFilesfromDB(callback);
//   }
// }
