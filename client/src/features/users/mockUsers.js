const roles = ["admin", "cashier", "customer", "staff"];
const users = Array.from({ length: 20 }, (_, i) => {
  const id = i + 1;
  const username = `user${id.toString().padStart(3, "0")}`;
  const email = `${username}@gmail.com`;
  const phone = "0123456789";
  const role = roles[Math.floor(Math.random() * roles.length)];
  const balance = Math.floor(Math.random() * 10000000 * i);
  const avatar = "https://i.pravatar.cc/150?u=" + id;

  return {
    id,
    username,
    email,
    phone,
    role,
    balance,
    avatar,
    created_at: "2021-05-01",
    updated_at: "2021-05-01",
  };
});

export default users;
