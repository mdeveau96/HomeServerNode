export const sizeConversion = (fileSizeBytes) => {
  if (fileSizeBytes / 1024 ** 3 >= 1) {
    const convertedSize = fileSizeBytes / 1024 ** 3;
    return convertedSize.toFixed(1) + " GB";
  } else if (fileSizeBytes / (1024 * 1024) >= 1) {
    const convertedSize = fileSizeBytes / (1024 * 1024);
    return convertedSize.toFixed(1) + " MB";
  } else if (fileSizeBytes / 1024 >= 1) {
    const convertedSize = fileSizeBytes / 1024;
    return convertedSize.toFixed(1) + " KB";
  } else {
    return fileSizeBytes.toString() + " B";
  }
};
