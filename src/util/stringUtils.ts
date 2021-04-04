/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const uppercaseWords = (str: string) =>
  str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase());
