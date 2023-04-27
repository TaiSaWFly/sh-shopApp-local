export const definedLengthArray = <T>(
  data: T[],
  arrayLength: number = 4
): T[] => {
  return data.filter((_, index) => index < arrayLength);
};
