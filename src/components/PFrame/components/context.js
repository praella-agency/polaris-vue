export function getWidth(value = {}, defaultWidth = 0, key = 'width') {
  const width = typeof value === 'number' ? value : pluckDeep(value, key);
  return width ? `${width}px` : `${defaultWidth}px`;
}

export function pluckDeep(obj, key) {
  if (!obj) {
    return null;
  }

  const keys = Object.keys(obj);
  for (const currKey of keys) {
    if (currKey === key) {
      return obj[key];
    }

    if (isObject(obj[currKey])) {
      const plucked = pluckDeep(obj[currKey], key);
      if (plucked) {
        return plucked;
      }
    }
  }

  return null;
}

export function isObject(value) {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}
