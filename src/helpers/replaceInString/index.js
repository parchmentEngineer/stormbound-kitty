const isString = value => typeof value === 'string'
const isRegExp = re => re instanceof RegExp

const escapeRegExp = string => {
  const reRegExpChar = /[\\^$.*+?()[\]{}|]/g
  const reHasRegExpChar = new RegExp(reRegExpChar.source)

  return string && reHasRegExpChar.test(string)
    ? string.replace(reRegExpChar, '\\$&')
    : string
}

const flatten = function (array) {
  let newArray = []

  array.forEach(function (item) {
    if (Array.isArray(item)) {
      newArray = newArray.concat(item)
    } else {
      newArray.push(item)
    }
  })

  return newArray
}

/**
 * Given a string, replace every substring that is matched by the `match` regex
 * with the result of calling `fn` on matched substring. The result will be an
 * array with all odd indexed elements containing the replacements. The primary
 * use case is similar to using String.prototype.replace except for React.
 *
 * React will happily render an array as children of a react element, which
 * makes this approach very useful for tasks like surrounding certain text
 * within a string with react elements.
 *
 * Example:
 * matchReplace(
 *   'Emphasize all phone numbers like 884-555-4443.',
 *   /([\d|-]+)/g,
 *   (number, i) => <strong key={i}>{number}</strong>
 * );
 * // => ['Emphasize all phone numbers like ', <strong>884-555-4443</strong>, '.'
 *
 * @param {string} str
 * @param {regexp|str} match Must contain a matching group
 * @param {function} fn
 * @return {array}
 */
function replaceString(str, match, fn) {
  let curCharStart = 0
  let curCharLen = 0

  if (str === '') {
    return str
  } else if (!str || !isString(str)) {
    throw new TypeError(
      'First argument to react-string-replace#replaceString must be a string'
    )
  }

  let re = match

  if (!isRegExp(re)) {
    re = new RegExp('(' + escapeRegExp(re) + ')', 'gi')
  }

  var result = str.split(re)

  // Apply fn to all odd elements
  for (let i = 1, length = result.length; i < length; i += 2) {
    curCharLen = result[i].length
    curCharStart += result[i - 1].length
    result[i] = fn(result[i], i, curCharStart)
    curCharStart += curCharLen
  }

  return result
}

function reactStringReplace(source, match, fn) {
  if (!Array.isArray(source)) source = [source]

  return flatten(
    source.map(x => (isString(x) ? replaceString(x, match, fn) : x))
  )
}

export default reactStringReplace
