/**
 * 
 * @param {*} str 需要处理的字符串
 * @param {*} num 截断字符串的长度
 * @param {*} top 字符串到顶部的高度
 * @param {*} left 字符串到左边的高度
 * @param {*} color 字符串颜色
 * @param {*} size 字符串大小
 */
function txtBreak(
  str,
  num,
  top = 0,
  left = 0,
  color = '#333',
  size = "16"
) {
  let n = parseInt(str.length / num) + 1;
  let strArr = [];
  let _str = [];
  let _list = {};
  let i = 0;
  for (; i < n; i++) {
    let _str = str.substring(i * num, num * (i + 1));
    strArr.push(_str);
  }
  for (let j = 0; j < strArr.length; j++) {
    _list = {
      method: 'txt',
      x: left,
      y: top + j * 24,
      padding: 0,
      txt: strArr[j],
      fs: size,
      tc: color,
      align: 'left'
    };
    _str.push(_list);
  }
  return _str;
}
export default txtBreak;