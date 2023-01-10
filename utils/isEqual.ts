export const isEqual = (object1, object2) => {
  return isObject(object1) && isObject(object2)
    ? object1.constructor === object2.constructor &&
        Object.keys(object1).length === Object.keys(object2).length &&
        Object.keys(object1).every((key) => isEqual(object1[key], object2[key]))
    : object1 === object2
}

const isObject = (object) => object instanceof Object
