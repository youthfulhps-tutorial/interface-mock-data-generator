import { Item } from "../types";

export default class ItemUtils {
  static isAllItemsSoldout(items: Item[]) {
    return items.every((item) => !item.stockQuantity);
  }
}
