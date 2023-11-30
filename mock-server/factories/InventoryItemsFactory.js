import { faker } from "@faker-js/faker"
import { INVENTORY_ITEMS } from "../constants.js"

export default class InventoryItemFactory {
  static CATEGORIES = ["drink", "food", "other"]
  static UNIT = ["bottle", "can", "box", "piece", "kg", "g", "l", "ml"]

  static createRandomItems() {
    const items = INVENTORY_ITEMS.map((item) => {
      return {
        id: faker.number.int(),
        name: item.name,
        description: faker.commerce.productDescription(),
        price: item.price,
        category: item.category,
        unit: item.unit,
        stockAmount: faker.datatype.number({ min: 0, max: 100 }),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      }
    })

    return items
  }
}
