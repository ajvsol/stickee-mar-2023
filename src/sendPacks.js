export function sendPacks(orderSize, packSizes = [5000, 2000, 1000, 500, 250]) {
  const sentPacks = {};
  let remainingOrderSize = orderSize;

  // Steps for React web app to convert the string packSizes in dropdown to a number[]
  if (typeof packSizes === "string") {
    packSizes = packSizes.split(",").map((el) => Number(el));
  }

  for (let i = 0; i < packSizes.length; i++) {
    // Add 1 of the current pack size if the remaining order size is greater than or equal to pack size

    if (remainingOrderSize - packSizes[i] >= 0) {
      // Only do this if the pack size is not already in sentPacks
      if (Object.keys(sentPacks).length <= i) {
        sentPacks[packSizes[i]] = 1;
        remainingOrderSize -= packSizes[i];
      }
    }

    // If the remaining order size is greater than or equal to the current pack size, then increase quantity for pack size in sentPacks
    if (
      remainingOrderSize - packSizes[i] >= 0 &&
      Object.keys(sentPacks).length > 0
    ) {
      if (Object.hasOwn(sentPacks, `${packSizes[i]}`)) {
        const count = Math.floor(remainingOrderSize / packSizes[i]);
        sentPacks[packSizes[i]] = count + 1;
        remainingOrderSize -= count * packSizes[i];
      }
    }
  }

  // If the remaining order size is more than 0 and less than the smallest pack size, then update sentPacks
  if (
    remainingOrderSize > 0 &&
    remainingOrderSize < packSizes[packSizes.length - 1]
  ) {
    // If sentPacks is not empty & the smallest pack size is already in sentPacks & the pack size increase would fit the remaining order size
    // Then increase that pack size to the next smallest size
    if (
      Object.keys(sentPacks).length > 0 &&
      Object.hasOwn(sentPacks, `${packSizes[packSizes.length - 1]}`) &&
      // Next smallest size - total of the smallest packs quantity in sentPacks - remaining order size
      packSizes[packSizes.length - 2] -
        packSizes[packSizes.length - 1] -
        remainingOrderSize >
        0
    ) {
      // Delete smallest item in sentPacks
      delete sentPacks[Object.keys(sentPacks)[0]];

      sentPacks[packSizes[packSizes.length - 2]] =
        sentPacks[packSizes[packSizes.length - 2]]++ || 1;
    } else {
      // otherwise just add a new smallest packSize to sentPacks
      sentPacks[packSizes[packSizes.length - 1]] =
        sentPacks[packSizes[packSizes.length - 1]]++ || 1;
    }
  }
  //console.log(`Result`, Object.entries(sentPacks));

  return sentPacks;
}
