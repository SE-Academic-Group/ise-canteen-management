import { JSONPreset } from "lowdb/node"
import UserFactory from "./factories/UserFactory.js"

const defaultData = { users: [], orders: [], products: [] }
const db = await JSONPreset("db.json", defaultData)

db.data.users = Array.from({ length: 100 }, () =>
  UserFactory.createRandomUser()
)

await db.write()
