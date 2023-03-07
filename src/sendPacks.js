export function sendPacks(orderSize) {
  const packSizes = [5000, 2000, 1000, 500, 250];
  const sentPacks = [];

  let remainingOrderSize = orderSize;

  for (let i = 0; i < packSizes.length; i++) {
    // Add 1 of the current pack size if the remaining order size is greater than or equal to pack size
    if (remainingOrderSize - packSizes[i] >= 0) {
      // Only do this if the pack size is not already in sentPacks
      if (sentPacks.length <= i) {
        sentPacks.push({ [packSizes[i]]: 1 });
        remainingOrderSize -= packSizes[i];
      }
    }

    // If the remaining order size is greater than or equal to the current pack size, then update sentPacks
    if (remainingOrderSize - packSizes[i] >= 0) {
      if (`${packSizes[i]}` in sentPacks[i]) {
        const count = Math.floor(remainingOrderSize / packSizes[i]);
        sentPacks[i][packSizes[i]] = count + 1;
        remainingOrderSize -= count * packSizes[i];
      }
    }
  }

  // If the remaining order size is more than 0 and less than the smallest pack size, then update sentPacks
  if (
    remainingOrderSize > 0 &&
    remainingOrderSize < packSizes[packSizes.length - 1]
  ) {
    // if sentPacks is not empty & the smallest pack size is already in sentPacks
    if (
      sentPacks.length > 0 &&
      parseInt(Object.keys(sentPacks[sentPacks.length - 1])[0]) ===
        packSizes[packSizes.length - 1]
    ) {
      // then increase that pack size to the next smallest size
      sentPacks.length = sentPacks.length - 1;
      sentPacks.push({ [packSizes[packSizes.length - 2]]: 1 });
    } else {
      // otherwise just add a new smallest packSize to sentPacks
      sentPacks.push({ [packSizes[packSizes.length - 1]]: 1 });
    }
  }
  console.dir(`Result:`, sentPacks);

  return sentPacks;
}
