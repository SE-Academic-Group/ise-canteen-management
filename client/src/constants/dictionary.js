//! When you add a new dictionary key,
//! you must add it to the DictionaryKey type and the dictionary object below.
/**
 * @typedef {('category'|'role'|'unit'|'order_status'|'charge_status')} DictionaryKey
 */

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
  SEASONING: {
    en: "seasoning",
    vi: "Gia vị",
  },
  CONDIMENT: {
    en: "condiment",
    vi: "Đi kèm",
  },
  HERB: {
    en: "herb",
    vi: "Rau nêm",
  },
  SPICE: {
    en: "spice",
    vi: "Hương liệu",
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

export const USER_ACCOUNT_STATE = {
  ACTIVE: {
    en: "active",
    vi: "Hoạt động",
  },
  INACTIVE: {
    en: "inactive",
    vi: "Tạm khóa",
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
  SUCCESS: {
    en: "success",
    vi: "Chưa xử lý",
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

export const CHARGE_STATUS = {
  SUCCESS: {
    en: "success",
    vi: "Thành công",
  },
  PENDING: {
    en: "pending",
    vi: "Đang chờ",
  },
  FAILED: {
    en: "failed",
    vi: "Thất bại",
  },
};
