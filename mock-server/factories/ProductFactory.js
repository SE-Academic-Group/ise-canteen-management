import { faker } from "@faker-js/faker"

import { ITEMS } from "../constants.js"

export default class ProductFactory {
  static createProducts() {
    const products = ITEMS.map((item) => {
      return {
        id: faker.number.int(),
        image: faker.image.food(200, 128, true),
        description: faker.commerce.productDescription(),
        ratingAverage: faker.datatype.float({ min: 3, max: 5, precision: 0.1 }),
        name: item.name,
        price: item.price,
        category: item.category,
      }
    })

    return products
  }
}
