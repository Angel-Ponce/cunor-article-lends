const paginate = (limit: number, page: number, totalRows: number) => {
  return {
    skip: limit > 0 ? (page - 1) * limit : 0,
    take: limit > 0 ? limit : totalRows,
    length: totalRows,
    pages: limit > 0 ? Math.ceil(totalRows / limit) : 1,
  };
};

export { paginate };
