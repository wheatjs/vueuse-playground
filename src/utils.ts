export function stringify(obj: any) {
  return typeof obj === 'object' ? `${JSON.stringify(obj)}` : obj.toString()
}

export function prettyPrint(obj: any) {
  return JSON.stringify(obj, null, 2)
}

export function stringifyObjs(objs: any[]) {
  const obj = objs.length > 1 ? objs.map(stringify).join(' ') : objs[0]
  return typeof obj === 'object' ? `${prettyPrint(obj)}` : obj.toString()
}
