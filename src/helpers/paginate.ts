const paginate = (limit: number, page: number, totalRows: number) => {
  return {
    skip: (page - 1) * limit,
    take: limit,
    length: totalRows,
    pages: Math.ceil(totalRows / limit),
  };
};

export { paginate };
