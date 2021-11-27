// const Falsy = boolean | undefined | null | 0;

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function variationName(name, value) {
  return `${name}${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}
