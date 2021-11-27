// Ref: https://github.com/yoksel/url-encoder/

const symbols = /[\r\n%#()<>?\[\\\]^`{|}]/g;

export function encode(data) {
  // Use single quotes instead of double to avoid encoding.
  data = data.replace(/"/g, '\'');
  data = data.replace(/>\s{1,}</g, '><');
  data = data.replace(/\s{2,}/g, ' ');

  return data.replace(symbols, encodeURIComponent);
}
