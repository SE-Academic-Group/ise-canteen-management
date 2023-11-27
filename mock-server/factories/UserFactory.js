import { faker } from "@faker-js/faker"
import { fullName } from "full-name-generator"

import { randomItem } from "../utils.js"

export default class UserFactory {
  static USER_ROLES = ["customer", "admin", "staff", "cashier"]

  static createRandomUser() {
    const role = randomItem(this.USER_ROLES)

    return {
      id: faker.number.int(),
      name: fullName("VN", 0),
      email: faker.internet.email(),
      phone: faker.helpers.fromRegExp("0[193][0-9]{8}", "g"),
      role: role,
      balance: faker.datatype.number({
        min: 100000,
        max: 1000000,
        precision: 1000,
      }),
      password: faker.internet.password(),
      avatar: faker.image.avatar(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    }
  }
}
