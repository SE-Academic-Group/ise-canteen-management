const STATUS = ["pending", "completed", "cancelled"];
const ITEMS = [
  {
    name: "Lavie",
    price: "10000",
    quantity: 2,
  },
  {
    name: "Lavie",
    price: "10000",
    quantity: 2,
  },
  {
    name: "Com chien trung",
    price: "20000",
    quantity: 1,
  },
  {
    name: "Bun bo",
    price: "30000",
    quantity: 1,
  },
  {
    name: "Hu tieu",
    price: "30000",
    quantity: 1,
  },
];

const orders = Array.from({ length: 20 }, (_, index) => {
  const id = index + 1;
  const username = `user${id.toString().padStart(3, "0")}`;
  const items = ITEMS.slice(0, Math.floor(Math.random() * ITEMS.length));
  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  return {
    id,
    username,
    items,
    total,
    status: STATUS[Math.floor(Math.random() * STATUS.length)],
    createdAt: "2021-05-01",
  };
});

export default orders;
