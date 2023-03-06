// Types for ensuring that the pack sizes are valid
type PackSizeType = 5000 | 2000 | 1000 | 500 | 250;

type SentPacksType = {
  [key in PackSizeType]?: number;
}[];

function sendPacks(orderSize: number): SentPacksType {
  const packSizes: PackSizeType[] = [5000, 2000, 1000, 500, 250];
  const sentPacks: SentPacksType = [];

  for (let i = 0; i < packSizes.length; i++) {
    // Add 1 of the type of pack to sentPacks if orderSize is greater than or equal to pack size
    if (orderSize - packSizes[i] >= 0) {
      // Only do this if the pack size is not already in sentPacks
      if (!(packSizes[i] in sentPacks)) {
        sentPacks.push({ [packSizes[i]]: 1 });
        orderSize -= packSizes[i];
      }
    }

    //console.log(`Order size: ${orderSize}`);
    //console.log(`Pack size: ${packSizes[i]}`);
    //console.log(`Sent packs: ${sentPacks}`);

    // If the pack size is already in sentPacks, then increment the count of that pack size by 1
    if (orderSize - packSizes[i] >= 0) {
      if (sentPacks[packSizes[i]]) {
        let packSize = packSizes[i];
        sentPacks[packSize]++;
      }
      sentPacks[packSizes[i]] += 1;
      orderSize -= packSizes[i];
    }
    // If there's still room for more of this pack size, then repeat the loop for this pack size
    if (orderSize - packSizes[i] >= 0) {
      i--;
    }
  }

  //console.log(sentPacks);
  return sentPacks;
}

sendPacks(12000);
