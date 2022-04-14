
export const isEqual = <T>(object1: T, object2: T): boolean => {
  const props1 = Object.getOwnPropertyNames(object1) as Array<keyof T>
  const props2 = Object.getOwnPropertyNames(object2) as Array<keyof T>

  if (props1.length !== props2.length)
    return false

  for (let i = 0; i < props1.length; i++) {
    const prop = props1[i]
    const bothAreObjects = typeof object1[prop] === 'object' && typeof object2[prop] === 'object'

    if ((!bothAreObjects && (object1[prop] !== object2[prop]))
      || (bothAreObjects && !isEqual(object1[prop], object2[prop]))) {
      return false
    }
  }

  return true
}