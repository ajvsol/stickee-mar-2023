export function sendPacks(orderSize, packSizes = [5000, 2000, 1000, 500, 250]) {
  const sentPacks = {};

  // Steps for React web app to convert the string packSizes in dropdown to a number[]
  if (typeof packSizes === "string") {
    packSizes = packSizes.split(",").map((el) => Number(el));
  }

  for (let i = 0; i < packSizes.length; i++) {
    // Add 1 of the current pack size if the remaining order size is greater than or equal to pack size
    if (orderSize - packSizes[i] >= 0) {
      // Only do this if the pack size is not already in sentPacks
      if (Object.keys(sentPacks).length <= i) {
        sentPacks[packSizes[i]] = 1;
        orderSize -= packSizes[i];
      }
    }

    // If the remaining order size is greater than or equal to the current pack size, then increase quantity for pack size in sentPacks
    if (orderSize - packSizes[i] >= 0 && Object.keys(sentPacks).length > 0) {
      if (Object.hasOwn(sentPacks, `${packSizes[i]}`)) {
        const count = Math.floor(orderSize / packSizes[i]);
        sentPacks[packSizes[i]] = count + 1;
        orderSize -= count * packSizes[i];
      }
    }
  }

  // If the remaining order size is more than 0 and less than the smallest pack size, then update sentPacks
  if (orderSize > 0 && orderSize < packSizes[packSizes.length - 1]) {
    // If sentPacks is not empty & the smallest pack size is already in sentPacks & the pack size increase would fit the remaining order size
    // Then increase that pack size to the next smallest size
    if (
      Object.keys(sentPacks).length > 0 &&
      Object.hasOwn(sentPacks, `${packSizes[packSizes.length - 1]}`) &&
      // Next smallest size - total of the smallest packs quantity in sentPacks - remaining order size
      packSizes[packSizes.length - 2] -
        packSizes[packSizes.length - 1] -
        orderSize >
        0
    ) {
      // Delete smallest item in sentPacks
      delete sentPacks[Object.keys(sentPacks)[0]];

      // Add a new pack of the second smallest pack size
      if (sentPacks[packSizes[packSizes.length - 2]]) {
        // If the third smallest pack size is less than 2x the second smallest pack size but still greater than the remaining order size
        // Then swap pack size for a new pack of the third smallest pack size
        if (
          packSizes[packSizes.length - 3] <
            packSizes[packSizes.length - 2] * 2 &&
          packSizes[packSizes.length - 3] > orderSize
        ) {
          // Decrement the second smallest pack size by 1, or delete it if it's 1
          if (sentPacks[packSizes[packSizes.length - 2]] > 1) {
            sentPacks[packSizes[packSizes.length - 2]] -= 1;
          } else {
            delete sentPacks[Object.keys(sentPacks)[0]];
          }

          // Add a new pack of the third smallest pack size
          sentPacks[packSizes[packSizes.length - 3]] =
            ++sentPacks[packSizes[packSizes.length - 3]] || 1;
        } else {
          ++sentPacks[packSizes[packSizes.length - 2]];
        }
      } else {
        sentPacks[packSizes[packSizes.length - 2]] = 1;
      }
    } else {
      // otherwise just add a new smallest packSize to sentPacks
      sentPacks[packSizes[packSizes.length - 1]] =
        sentPacks[packSizes[packSizes.length - 1]]++ || 1;
    }
  }

  return sentPacks;
}
