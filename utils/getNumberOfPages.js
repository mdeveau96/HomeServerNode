export const getNumberOfPages = (fileList, ITEMS_PER_PAGE) => {
  return Math.ceil(fileList.length / ITEMS_PER_PAGE);
};
