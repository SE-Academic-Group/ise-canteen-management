import { JSONPreset } from "lowdb/node"
import UserFactory from "./factories/UserFactory.js"
import OrderFactory from "./factories/OrderFactory.js"
import ProductFactory from "./factories/ProductFactory.js"

const defaultData = { users: [], orders: [], products: [] }
const db = await JSONPreset("db.json", defaultData)

db.data.users = Array.from({ length: 25 }, () => UserFactory.createRandomUser())
db.data.orders = Array.from({ length: 50 }, () =>
  OrderFactory.createRandomOrder()
)
db.data.products = ProductFactory.createProducts()

await db.write()
