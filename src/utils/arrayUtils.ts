/**
 * The "getByInfiniteIndex" allow us to cycle trough an array infintely, we can use any positive or negative number as index, and we will always get the correspondent element
 * @param array - The array to index
 * @param index - The index of the array element to get, could be any positive or negative number
 */
export function getByInfiniteIndex<T>(array: Array<T>, index: number): T {
  // Get remainder of the operation
  const remainder = index % array.length

  // If remainder is positive index the array directly
  if (remainder >= 0) {
    return array[remainder]
  }
  // If remainder is negative we sum the array lenght to obtain a positive index
  else {
    return array[remainder + array.length]
  }
}
