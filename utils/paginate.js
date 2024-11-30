const ITEMS_PER_PAGE = 10;

export const paginate = (page, files) => {
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  return files.slice(startIndex, endIndex);
};
