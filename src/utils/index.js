export const camelCaseToTitle = (camelCaseString) => {
  const stringWithSpaces = camelCaseString
    .replace(/([A-Z])/g, (letter) => ` ${letter}`)
    .toLowerCase()
    .replace(/^./, (letter) => letter.toUpperCase());
  return stringWithSpaces;
};
