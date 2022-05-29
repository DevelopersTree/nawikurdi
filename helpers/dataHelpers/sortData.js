module.exports = (sortArray = [], query) => {
  sortArray.map(sort => query.orderBy(sort.column, sort.value));
};
