module.exports = (filters = [], query) => {
  filters.map(filter => query.andWhere(filter.column, 'like', `${filter.value}%`));
};
