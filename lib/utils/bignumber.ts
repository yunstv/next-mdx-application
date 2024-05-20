import BigNumber from 'bignumber.js';

export const fixedPrice = (
  numStr: string = '',
  precision: number = 3
): string => {
  const bigNum: BigNumber = new BigNumber(numStr);
  let p = bigNum.integerValue().toString().length + precision - 1;
  return new BigNumber(bigNum.toPrecision(p)).toFixed();
};

/**
 * Sums up an array of large numeric strings.
 * @param numbers Array of numeric strings.
 * @returns Sum of the numbers as a string.
 */
export function sumLargeNumbers(numbers: string[]): string {
  // Initialize sum as 0
  const sum = numbers.reduce((acc, num) => {
    // Use BigNumber for precision
    return acc.plus(new BigNumber(num));
  }, new BigNumber(0));

  // Return the string representation of the sum
  return sum.toString();
}

// Usage example
// const largeNumbers = [
//   '123456789012345678901234567890', // 30-digit number
//   '987654321098765432109876543210'  // 30-digit number
// ];
// const result = sumLargeNumbers(largeNumbers);
// console.log(result); // Outputs the sum of large numbers
