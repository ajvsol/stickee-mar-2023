// Types for ensuring that the pack sizes are valid
type PackSizeType = 5000 | 2000 | 1000 | 500 | 250;

// Type for the return value of sendPacks
type SentPacksType = {
  [key in PackSizeType]?: number;
}[];

function sendPacks(orderSize: number): SentPacksType {
  const packSizes: PackSizeType[] = [5000, 2000, 1000, 500, 250];
  const sentPacks: SentPacksType = [];

  let remainingOrderSize = orderSize;

  for (let i = 0; i < packSizes.length; i++) {
    console.log(`loop number: ${i}`);

    // Add 1 of the type of pack to sentPacks if orderSize is greater than or equal to pack size
    if (remainingOrderSize - packSizes[i] >= 0) {
      console.log(`add`);
      // Only do this if the pack size is not already in sentPacks
      if (sentPacks.length <= i) {
        sentPacks.push({ [packSizes[i]]: 1 });
        remainingOrderSize -= packSizes[i];
      }
    }

    //console.log(`Order size: ${remainingOrderSize}`);
    //console.log(`Pack size: ${packSizes[i]}`);
    //console.log(`Sent packs:`, sentPacks);

    // If the pack size is already in sentPacks, then increment the count of that pack size by 1
    if (remainingOrderSize - packSizes[i] >= 0) {
      if (`${packSizes[i]}` in sentPacks[i]) {
        if (sentPacks[i][packSizes[i]]) {
          //let currentPack: any = sentPacks[i][packSizes[i]];
          //console.log(`Current pack: ${currentPack}`);
          //console.log(`Sent packs:`, sentPacks);
          //currentPack++;

          //console.log(`updated Current pack: ${currentPack}`);
          //console.log(`updated Sent packs:`, sentPacks);

          console.log(`Current pack: ${sentPacks[i][packSizes[i]]}`);
          console.log(`Sent packs:`, sentPacks);
          sentPacks[i][packSizes[i]]++;

          console.log(`updated Current pack: ${sentPacks[i][packSizes[i]]}`);
          console.log(`updated Sent packs:`, sentPacks);
        }
      }
      //if (`${packSizes[i]}` in sentPacks[i]) {
      remainingOrderSize -= packSizes[i];
    }

    // If there's still room for more of this pack size, then repeat the loop for this pack size
    if (remainingOrderSize - packSizes[i] >= 0) {
      console.log(`lower`);
      i--;
    }
    console.log(`Order size: ${remainingOrderSize}`);
  }

  //console.log(sentPacks);
  return sentPacks;
}

sendPacks(12000);
