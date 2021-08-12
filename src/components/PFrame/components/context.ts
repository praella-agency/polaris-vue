export function getWidth(
  value: { [key: string]: any } | number | null | undefined = {},
  defaultWidth: number | null = 0,
  key = 'width',
) {
  const width = typeof value === 'number' ? value : pluckDeep(value, key);
  return width ? `${width}px` : `${defaultWidth}px`;
}

export function pluckDeep(obj: { [key: string]: any } | null, key: string): any {
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

export function isObject(value: any) {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}
