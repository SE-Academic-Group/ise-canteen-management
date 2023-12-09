export const CATEGORY = {
  FOOD: {
    en: "food",
    vi: "Đồ ăn",
  },
  BEVERAGE: {
    en: "beverage",
    vi: "Nước uống",
  },
  INGREDIENT: {
    en: "ingredient",
    vi: "Nguyên liệu",
  },
  SPICE: {
    en: "spice",
    vi: "Gia vị",
  },
  OTHER: {
    en: "other",
    vi: "Khác",
  },
};

export const ROLE = {
  ADMIN: {
    en: "admin",
    vi: "Quản trị viên",
  },
  STAFF: {
    en: "staff",
    vi: "Nhân viên",
  },
  CASHIER: {
    en: "cashier",
    vi: "Thu ngân",
  },
  CUSTOMER: {
    en: "customer",
    vi: "Khách hàng",
  },
};

export const UNIT = {
  BOTTLE: {
    en: "bottle",
    vi: "Chai",
  },
  CAN: {
    en: "can",
    vi: "Lon",
  },
  BOX: {
    en: "box",
    vi: "Thùng",
  },
  PIECE: {
    en: "piece",
    vi: "Cái",
  },
  KG: {
    en: "kg",
    vi: "Kg",
  },
  G: {
    en: "g",
    vi: "G",
  },
  L: {
    en: "l",
    vi: "L",
  },
  ML: {
    en: "ml",
    vi: "Ml",
  },
};

export const ORDER_STATUS = {
  COMPLETED: {
    en: "completed",
    vi: "Đã hoàn thành",
  },
  CANCELLED: {
    en: "cancelled",
    vi: "Đã hủy",
  },
  PREPARING: {
    en: "preparing",
    vi: "Đang chuẩn bị",
  },
  PENDING: {
    en: "pending",
    vi: "Đang chờ",
  },
};

export const TRANSLATOR_KEYS = {
  CATEGORY: "category",
  ROLE: "role",
  UNIT: "unit",
  STATUS: "order_status",
};

export function translator(key, value, lang = "vi") {
  value = value.toUpperCase();

  const translatorMap = {
    [TRANSLATOR_KEYS.CATEGORY]: (value) => CATEGORY[value],
    [TRANSLATOR_KEYS.ROLE]: (value) => ROLE[value],
    [TRANSLATOR_KEYS.UNIT]: (value) => UNIT[value],
    [TRANSLATOR_KEYS.STATUS]: (value) => ORDER_STATUS[value],
  };
  const result = translatorMap[key](value) || value.replace(/[_-]/g, " ");

  return result[lang];
}

export function categoryToVietnamese(category) {
  const categoryMap = {
    food: "Đồ ăn",
    beverage: "Nước uống",
    ingredient: "Nguyên liệu",
    spice: "Gia vị",
    other: "Khác",
  };
  const result = (categoryMap[category] || category).replace(/[_-]/g, " ");

  return result;
}
