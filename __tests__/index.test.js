import { expect } from "chai";
import { describe, it } from "mocha";
import { sendPacks } from "../src/sendPacks.js";

describe("sendPacks basic tests", () => {
  it("should return an object", () => {
    const result = sendPacks(1);
    expect(result).to.be.an("object");
  });

  it("should return the correct number of packs for 1 widgets ordered", () => {
    const result = sendPacks(1);
    expect(result).to.deep.equal({ 250: 1 });
  });

  it("should return the correct number of packs for 250 widgets ordered", () => {
    const result = sendPacks(250);
    expect(result).to.deep.equal({ 250: 1 });
  });

  it("should return the correct number of packs for 251 widgets ordered", () => {
    const result = sendPacks(251);
    expect(result).to.deep.equal({ 500: 1 });
  });

  it("should return the correct number of packs for 501 widgets ordered", () => {
    const result = sendPacks(501);
    expect(result).to.deep.equal({ 500: 1, 250: 1 });
  });

  it("should return the correct number of packs for 12001 widgets ordered", () => {
    const result = sendPacks(12001);
    expect(result).to.deep.equal({ 5000: 2, 2000: 1, 250: 1 });
  });
});

describe("sendPacks extended tests", () => {
  it("should return the correct number of packs for 124 widgets ordered", () => {
    const result = sendPacks(124);
    expect(result).to.deep.equal({ 250: 1 });
  });

  it("should return the correct number of packs for 376 widgets ordered", () => {
    const result = sendPacks(376);
    expect(result).to.deep.equal({ 500: 1 });
  });

  it("should return the correct number of packs for 740 widgets ordered", () => {
    const result = sendPacks(740);
    expect(result).to.deep.equal({ 500: 1, 250: 1 });
  });

  it("should return the correct number of packs for 1441 widgets ordered", () => {
    const result = sendPacks(1441);
    expect(result).to.deep.equal({ 1000: 1, 500: 1 });
  });

  it("should return the correct number of packs for 2300 widgets ordered", () => {
    const result = sendPacks(2300);
    expect(result).to.deep.equal({ 2000: 1, 500: 1 });
  });

  it("should return the correct number of packs for 3141 widgets ordered", () => {
    const result = sendPacks(3141);
    expect(result).to.deep.equal({ 2000: 1, 1000: 1, 250: 1 });
  });

  it("should return the correct number of packs for 5141 widgets ordered", () => {
    const result = sendPacks(5141);
    expect(result).to.deep.equal({ 5000: 1, 250: 1 });
  });

  it("should return the correct number of packs for 11141 widgets ordered", () => {
    const result = sendPacks(11141);
    expect(result).to.deep.equal({ 5000: 2, 1000: 1, 250: 1 });
  });

  it("should return the correct number of packs for 21441 widgets ordered", () => {
    const result = sendPacks(21441);
    expect(result).to.deep.equal({ 5000: 4, 1000: 1, 500: 1 });
  });

  it("should return the correct number of packs for 31441 widgets ordered", () => {
    const result = sendPacks(31441);
    expect(result).to.deep.equal({ 5000: 6, 1000: 1, 500: 1 });
  });
});

describe("sendPacks with different pack configuration", () => {
  const altPackSizes = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

  it("should return an object", () => {
    const result = sendPacks(1, altPackSizes);
    expect(result).to.be.an("object");
  });

  it("should return the correct number of packs for 1 widgets ordered", () => {
    const result = sendPacks(1, altPackSizes);
    expect(result).to.deep.equal({ 100: 1 });
  });

  it("should return the correct number of packs for 250 widgets ordered", () => {
    const result = sendPacks(250, altPackSizes);
    expect(result).to.deep.equal({ 100: 1, 200: 1 });
  });

  it("should return the correct number of packs for 251 widgets ordered", () => {
    const result = sendPacks(251, altPackSizes);
    expect(result).to.deep.equal({ 100: 1, 200: 1 });
  });

  it("should return the correct number of packs for 501 widgets ordered", () => {
    const result = sendPacks(501, altPackSizes);
    expect(result).to.deep.equal({ 100: 1, 500: 1 });
  });

  it("should return the correct number of packs for 12001 widgets ordered", () => {
    const result = sendPacks(12001, altPackSizes);
    expect(result).to.deep.equal({ 100: 1, 1000: 12 });
  });
});
