const arr = [1, 2, 3, 4];

const occurence = arr.findIndex((p) => p === 3);

console.log([3].concat(
  arr.slice(0, occurence)
  .concat(arr.slice(occurence + 1))
));