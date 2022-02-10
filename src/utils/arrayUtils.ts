/**
 * The "adaptInfiniteIndex" allow us to "transfor" an infinite index to an index of an limited array, we can use any positive or negative number as index, and we will always get a valid index
 * @param array - The array to index
 * @param length - The array lenght
 */
export function adaptInfiniteIndex(index: number, length: number): number {
  // Get remainder of the operation
  const remainder = index % length

  // If remainder is positive return the remainder
  if (remainder >= 0) {
    return remainder
  }
  // If remainder is negative we sum the array lenght to obtain a positive index
  else {
    return remainder + length
  }
}
