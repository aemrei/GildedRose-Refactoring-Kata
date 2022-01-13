import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {

  it("should act standard for normal items", () => {
    const gildedRose = new GildedRose([
      new Item("foo", 3, 3),
      new Item("bar", 0, 5),
    ]);
    let items = gildedRose.updateQuality()
    expect(items[0].quality).toEqual(2);
    expect(items[1].quality).toEqual(3);
  })

  it("Quality should increase for Aged Brie", () => {
    const gildedRose = new GildedRose([
      new Item("Aged Brie", 3, 3),
    ]);
    let items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(4);
  })

  it("Sulfuras should stay the same", () => {
    const gildedRose = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 8, 8),
      new Item("Sulfuras, Hand of Ragnaros", 80, 80),
    ]);

    gildedRose.updateQuality();
    gildedRose.updateQuality();
    gildedRose.updateQuality();
    let items = gildedRose.updateQuality();
    expect(items[0].quality).toEqual(8);
    expect(items[1].quality).toEqual(80);
  })

  // I don't enogh time to write more tests
});
