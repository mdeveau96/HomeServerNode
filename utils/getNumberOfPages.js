const ITEMS_PER_PAGE = 10;

export const getNumberOfPages = (fileList) => {
  return Math.ceil(fileList.length / ITEMS_PER_PAGE);
};
