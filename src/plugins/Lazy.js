/**
 *
 * @author: @DyanGalih <dyan.galih@gmail.com>
 */

/**
 * @param map
 * @param fromObj
 * @param toObj
 * @returns {Promise<void>}
 */
const additionalMap = async (map, fromObj, toObj) => {
  for (let mapKey in map) {
    // eslint-disable-next-line no-prototype-builtins
    if (typeof fromObj[map[mapKey]] !== 'undefined' && toObj.hasOwnProperty(mapKey)) {
      toObj[mapKey] = fromObj[map[mapKey]]
    }
  }
  return toObj
}

/**
 * @author: @DyanGalih <dyan.galih@gmail.com>
 * @param fromObj
 * @param toObj
 * @param map
 * @returns {Promise<*>}
 */

const transform = async (fromObj, toObj, map = null) => {
  for (let toObjKey in toObj) {
    if (typeof fromObj[toObjKey] !== 'undefined') {
      if (toObj[toObjKey] !== null && typeof toObj[toObjKey] === 'function') {
        if (Array.isArray(fromObj[toObjKey])) {
          toObj[toObjKey] = await Promise.all(
            fromObj[toObjKey].map(async (item) => {
              return transform(item, new toObj[toObjKey]())
            }),
          )
        } else {
          toObj[toObjKey] = await transform(fromObj[toObjKey], new toObj[toObjKey](), map)
        }
      } else if (typeof toObj[toObjKey] !== 'undefined') {
        toObj[toObjKey] = fromObj[toObjKey]
      }
    }
  }
  if (map !== null) {
    toObj = additionalMap(map, fromObj, toObj)
  }

  return toObj
}

const transformToComponent = async (fromObj, toObj) => {
  for (let fromObjKey in fromObj) {
    if (typeof toObj[`${fromObjKey}Ref`] !== 'undefined') {
      toObj[`${fromObjKey}Ref`].value = fromObj[`${fromObjKey}`]
    }
  }
  return toObj
}

/**
 *
 * @param fromObj
 * @param toObj
 * @param expectTest
 * @returns {Promise<void>}
 */
const expect = async (fromObj, toObj, expectTest) => {
  for (const toObjKey in toObj) {
    if (typeof fromObj[toObjKey] !== 'undefined') {
      expectTest(fromObj[toObjKey]).to.equal(toObj[toObjKey])
    }
  }
}

/**
 *
 * @param fromObjs
 * @param toObjs
 * @param expectTest
 * @returns {Promise<void>}
 */
const expectBulk = async (fromObjs, toObjs, expectTest) => {
  expectTest(fromObjs.length).to.equal(toObjs.length)
  for (let i = 0; i < toObjs.length; i++) {
    const toObj = toObjs[i]
    const fromObj = fromObjs[i]
    for (const toObjKey in toObj) {
      if (typeof fromObj[toObjKey] !== 'undefined') {
        expectTest(fromObj[toObjKey]).to.equal(toObj[toObjKey])
      }
    }
  }
}

/**
 *
 * @param object
 * @param context
 * @param callback
 */
const set = (object, context, callback) => {
  let value = object.target.value
  let name = object.target.name
  if (typeof context[name] !== 'undefined') {
    context[name] = value
  }
  callback(context)
}

/**
 *
 * @param obj
 * @param struct
 */
const clear = (obj, struct) => {
  for (const objKey in struct) {
    let currentObj = obj[`${objKey}Ref`]
    if (typeof currentObj !== 'undefined') {
      if (typeof currentObj.value !== 'undefined') {
        currentObj.value = null
      }
    }
  }
}

/**
 *
 * @param routes
 * @param routeName
 * @param params
 * @param query
 */
const generateRoute = (routes, routeName, params = {}, query = {}) => {
  const route = routes.getRoutes().find((item) => item.name === routeName)
  const newParams = {}
  if (typeof route !== 'undefined') {
    route.regex.keys.forEach((item) => {
      if (
        query !== null &&
        typeof query[item.name] !== 'undefined' &&
        query[item.name] !== '' &&
        typeof params[item.name] === 'undefined'
      ) {
        newParams[item.name] = query[item.name]
        delete query[item.name]
      } else if (typeof params[item.name] !== 'undefined') {
        newParams[item.name] = params[item.name]
      }
    })

    for (const paramsKey in params) {
      if (
        typeof route.regex.keys.find((item) => item.name === paramsKey) === 'undefined' &&
        typeof query[paramsKey] !== 'undefined'
      ) {
        query[paramsKey] = params[paramsKey]
      }
    }
  }
  return {
    name: routeName,
    params: newParams,
    query: query,
  }
}

/**
 * Remove empty values from an object:
 * - Empty strings ('')
 * - Null values
 * - Undefined values
 * - Empty objects ({})
 * - Empty arrays ([])
 *
 * @example
 * const data = { name: '', age: null, address: {}, tags: [] }
 * const cleaned = removeEmptyValues(data)
 * // Result: {}
 *
 * @param {Object} obj - Object to clean
 * @returns {Object} Cleaned object
 */
function removeEmptyValues(obj) {
  if (Array.isArray(obj)) {
    return obj
      .map(removeEmptyValues)
      .filter(
        (v) =>
          v !== undefined && v !== null && (typeof v !== 'object' || Object.keys(v).length > 0),
      )
  } else if (obj && typeof obj === 'object') {
    Object.keys(obj).forEach((key) => {
      const value = obj[key]
      if (
        value === '' ||
        value === null ||
        value === undefined ||
        (typeof value === 'object' &&
          value !== null &&
          Object.keys(removeEmptyValues(value)).length === 0)
      ) {
        delete obj[key]
      } else if (typeof value === 'object') {
        obj[key] = removeEmptyValues(value)
      }
    })
    return obj
  }
  return obj
}

/**
 * Format values in an object using a formatter function
 * The formatter function should:
 * 1. Check if the field should be formatted (based on key/value)
 * 2. Return formatted value if needed, or original value if no formatting needed
 *
 * @example
 * // Format all date fields
 * const dateFormatter = (key, value) => {
 *   return key.includes('date') ? formatDate(value) : value
 * }
 * const formatted = formatValues(data, dateFormatter)
 *
 * @param {Object} obj - Object to format
 * @param {Function} formatter - Function(key, value) that returns formatted or original value
 * @returns {Object} Formatted object
 */
function formatValues(obj, formatter) {
  if (Array.isArray(obj)) {
    obj.forEach((item) => formatValues(item, formatter))
  } else if (obj && typeof obj === 'object') {
    Object.keys(obj).forEach((key) => {
      const value = obj[key]
      if (typeof value === 'object' && value !== null) {
        formatValues(value, formatter)
      } else {
        obj[key] = formatter(key, value)
      }
    })
  }
  return obj
}

const Lazy = {
  transform,
  expect,
  expectBulk,
  set,
  clear,
  transformToComponent,
  generateRoute,
  removeEmptyValues,
  formatValues,
}

export default Lazy
