const TYPE_SULFURAS = "Sulfuras, Hand of Ragnaros";
const TYPE_CONJURED = "Conjured Mana Cake";
const TYPE_BACKSTAGE = "Backstage passes to a TAFKAL80ETC concert";
const TYPE_AGED_BRIE = "Aged Brie";

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach(GildedRose.updateItem);
    return this.items;
  }

  private static updateItem(item: Item) {
    const diffSellIn = GildedRose.diffSellIn(item);
    item.sellIn -= diffSellIn;

    const diffQuality = GildedRose.diffQuality(item);
    item.quality -= diffQuality;

    if (diffQuality) {
      // adjust quality limits
      if (item.quality > 50) {
        item.quality = 50;
      } else if (item.quality < 0) {
        item.quality = 0;
      }
    }
  }

  // get amount of degregation depending on its type
  private static diffQuality(item: Item): number {
    switch (item.name) {
      case TYPE_AGED_BRIE:
        return GildedRose.diffQualityForAgedBrie(item);

      case TYPE_BACKSTAGE:
        return GildedRose.diffQualityForBackstage(item);

      case TYPE_SULFURAS:
        return GildedRose.diffQualityForSulfuras(item);

      case TYPE_CONJURED:
        return GildedRose.diffQualityForConjured(item);

      default:
        return GildedRose.diffQualityForNormalItem(item);
    }
  }

  private static diffSellIn(item: Item): number {
    return item.name === TYPE_SULFURAS ? 0 : 1;
  }

  private static diffQualityForNormalItem(item: Item): number {
    // Once the sell by date has passed, Quality degrades twice as fast
    return item.sellIn < 0 ? 2 : 1;
  }

  private static diffQualityForAgedBrie(item: Item): number {
    // "Aged Brie" actually increases in Quality the older it gets
    return item.sellIn < 0 ? -2 : -1;
  }

  private static diffQualityForSulfuras(_: Item): number {
    // "Sulfuras" never has to be sold or decreases in Quality
    return 0;
  }

  private static diffQualityForBackstage(item: Item): number {
    if (item.sellIn < 0) {
      // Quality drops to 0 after the concert
      // extract it from itself to get zero
      return item.quality;
    } else if (item.sellIn < 5) {
      return -3;
    } else if (item.sellIn < 10) {
      return -2;
    } else {
      return -1;
    }
  }

  private static diffQualityForConjured(item: Item): number {
    // "Conjured" items degrade in Quality twice as fast as normal items
    return GildedRose.diffQualityForNormalItem(item) * 2;
  }
}
