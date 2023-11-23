import { faker } from "@faker-js/faker"

export default class UserFactory {
  static USER_ROLES = ["user", "admin", "staff", "cashier"]

  static createRandomUser() {
    const role =
      this.USER_ROLES[Math.floor(Math.random() * this.USER_ROLES.length)]

    return {
      id: faker.number.int(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      phone: faker.helpers.fromRegExp("0[193][0-9]{8}", "g"),
      role: role,
      balance: faker.datatype.number({
        min: 100000,
        max: 1000000,
        precision: 1000,
      }),
      avatar: faker.image.avatar(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    }
  }
}
