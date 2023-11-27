import { faker } from "@faker-js/faker"
import { fullName } from "full-name-generator"

import { randomItem } from "../utils.js"
import { ITEMS } from "../constants.js"

export default class OrderFactory {
  // static STATUSES = ["pending", "completed", "cancelled"]
  static STATUSES = ["pending"]

  static createRandomOrder() {
    const randomSeed = Math.floor(Math.random() * 5) + 1
    let total = 0

    const orderItems = Array.from({ length: randomSeed }, () => {
      const item = randomItem(ITEMS)
      const quantity = Math.floor(Math.random() * 5) + 1

      total += item.price * quantity

      return {
        ...item,
        quantity,
      }
    })

    return {
      id: faker.number.int(),
      user: {
        name: fullName("VN", 0),
        email: faker.internet.email(),
      },
      orderItems,
      orderStatus: randomItem(this.STATUSES),
      orderDate: faker.date.recent(),
      totalPrice: total,
    }
  }
}
