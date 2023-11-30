export const DRINKS = [
  {
    name: "Nước suối",
    price: 5000,
    category: "drink",
    unit: "bottle",
  },
  {
    name: "Nước ngọt Pepsi",
    price: 10000,
    category: "drink",
    unit: "bottle",
  },
  {
    name: "Nước cam Twister",
    price: 12000,
    category: "drink",
    unit: "bottle",
  },
  {
    name: "Trà sửa trân châu",
    price: 15000,
    category: "drink",
    unit: "can",
  },
  {
    name: "Trà đào",
    price: 10000,
    category: "drink",
    unit: "can",
  },
  {
    name: "Sâm bổ lượng",
    price: 15000,
    category: "drink",
    unit: "can",
  },
]

export const FOODS = [
  {
    name: "Hủ tiếu",
    price: 25000,
    category: "food",
  },
  {
    name: "Mì gói Hảo Hảo",
    price: 5000,
    category: "food",
  },
  {
    name: "Bánh mì trứng",
    price: 10000,
    category: "food",
  },
  {
    name: "Bún bò Huế",
    price: 25000,
    category: "food",
  },
  {
    name: "Mỳ Ý",
    price: 20000,
    category: "food",
  },
  {
    name: "Mỳ Quảng",
    price: 25000,
    category: "food",
  },
  {
    name: "Cá ngừ kho",
    price: 10000,
    category: "food",
  },
  {
    name: "Thị kho tiêu",
    price: 10000,
    category: "food",
  },
  {
    name: "Cơm",
    price: 10000,
    category: "food",
  },
  {
    name: "Trứng chiên",
    price: 5000,
    category: "food",
  },
  {
    name: "Thịt kho tàu",
    price: 10000,
    category: "food",
  },
  {
    name: "Đậu hủ dồn thịt sốt cà",
    price: 10000,
    category: "food",
  },
  {
    name: "Chả cá",
    price: 5000,
    category: "food",
  },
  {
    name: "Xíu mại",
    price: 10000,
    category: "food",
  },
]

export const OTHERS = [
  {
    name: "Nước tương",
    price: 5000,
    category: "other",
    unit: "can",
  },
  {
    name: "Nước mắm",
    price: 5000,
    category: "other",
    unit: "can",
  },
  {
    name: "Khăn giấy",
    price: 5000,
    category: "other",
    unit: "box",
  },
]

export const SPICES = [
  {
    name: "Muối",
    price: 5000,
    category: "spice",
    unit: "kg",
  },
  {
    name: "Tiêu",
    price: 5000,
    category: "spice",
    unit: "kg",
  },
  {
    name: "Hạt nêm",
    price: 5000,
    category: "spice",
    unit: "kg",
  },
  {
    name: "Bột ngọt",
    price: 5000,
    category: "spice",
    unit: "kg",
  },
  {
    name: "Đường",
    price: 5000,
    category: "spice",
    unit: "kg",
  },
  {
    name: "Sốt ớt",
    price: 5000,
    category: "spice",
    unit: "can",
  },
]

export const INGREDIENTS = [
  {
    name: "Trứng",
    unit: "piece",
    price: 1000,
    category: "ingredient",
  },
  {
    name: "Thịt",
    unit: "kg",
    price: 10000,
    category: "ingredient",
  },
  {
    name: "Cá",
    unit: "kg",
    price: 10000,
    category: "ingredient",
  },
  {
    name: "Đậu hủ",
    unit: "piece",
    price: 10000,
    category: "ingredient",
  },
  {
    name: "Bún",
    unit: "kg",
    price: 10000,
    category: "ingredient",
  },
  {
    name: "Mỳ",
    unit: "kg",
    price: 10000,
    category: "ingredient",
  },
  {
    name: "Gạo",
    unit: "kg",
    price: 10000,
    category: "ingredient",
  },
  {
    name: "Bánh mì",
    unit: "piece",
    price: 10000,
    category: "ingredient",
  },
  {
    name: "Trà",
    unit: "kg",
    price: 1000,
    category: "ingredient",
  },
  {
    name: "Nước ngọt",
    unit: "bottle",
    price: 1000,
    category: "ingredient",
  },
  {
    name: "Nước suối",
    unit: "bottle",
    price: 1000,
    category: "ingredient",
  },
  {
    name: "Nước cam",
    unit: "bottle",
    price: 1000,
    category: "ingredient",
  },
  {
    name: "Sữa",
    unit: "l",
    price: 1000,
    category: "ingredient",
  },
  {
    name: "Cà chua",
    unit: "kg",
    price: 1000,
    category: "ingredient",
  },
  {
    name: "Cà rốt",
    unit: "kg",
    price: 1000,
    category: "ingredient",
  },
  {
    name: "Cải bắp",
    unit: "kg",
    price: 1000,
    category: "ingredient",
  },
  {
    name: "Cải thảo",
    unit: "kg",
    price: 1000,
    category: "ingredient",
  },
  {
    name: "Cải ngọt",
    unit: "kg",
    price: 1000,
    category: "ingredient",
  },
  {
    name: "Cải xoăn",
    unit: "kg",
    price: 1000,
    category: "ingredient",
  },
  {
    name: "Cải thìa",
    unit: "kg",
    price: 1000,
    category: "ingredient",
  },
  {
    name: "Cải bó xôi",
    unit: "kg",
    price: 1000,
    category: "ingredient",
  },
]

export const INVENTORY_ITEMS = [...DRINKS, ...OTHERS, ...SPICES, ...INGREDIENTS]

export const ITEMS = [...DRINKS, ...FOODS]
