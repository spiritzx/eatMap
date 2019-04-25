function createRandomArr(min, max) {
  let arr = [],
  res = [];

  let _min = parseInt(min),
    _max = parseInt(max),
    i = _min;
  if (_min === _max) return arr;
  if (_min < _max) {
    [_min, _max] = [_max, _min];
  }
  for (; i < _max; i++) {
    arr.push(i);
  }
  res = arr.sort(function () {
    return 0.5 - Math.random();
  })
  res.length = arr.length;
  return res;
}
function compare(property) {
  return function (a, b) {
    var value1 = a[property];
    var value2 = b[property];
    return value1 - value2;
  }
}
export default {
  createRandomArr: createRandomArr,
  compare: compare
};