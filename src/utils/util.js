export const WIN = {
  width: window.innerWidth,
  height: window.innerHeight
}

export const typeis = (obj) => {
  const type = Object.prototype.toString.call(obj)
  switch (type) {
    case "[object Array]":
      return "array"
    case "[object String]":
      return "string"
    case "[object Object]":
      return "object"
    case "[object Number]":
      return "number"
    case "[object Boolean]":
      return "bool"
    case "[object RegExp]":
      return "regExp"
    case "[object Null]":
      return "null"
    case "[object Undefined]":
      return "undefined"
    default:
      throw new Error("unknow type!")
  }
}

/**
 * 辅助函数
 * @param {*} classNames 样式名称类型可以是Array, String, Object，如果是String不做任何处理
 *
 * CLS([styles.a, styles.b])
 * CLS({a: true, b: false})   true：添加此样式，false 不添加或移除此样式
 */
export const CLS = function (classNames) {
  let res;
  const type = typeis(classNames)
  if (type === "array") {
    res = classNames.join(" ")
  } else if (type === "string") {
    res = classNames
  } else if (type === "object") {
    const keys = []
    for (let key in classNames) {
      if (classNames[key] === true) {
        keys.push(key)
      }
    }
    res = keys.join(" ")
  } else {
    throw new Error("classNames supports one of [Array, String, Object]")
  }
  return res
}
