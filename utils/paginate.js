export const paginate = (page, files, ITEMS_PER_PAGE) => {
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  return files.slice(startIndex, endIndex);
};
