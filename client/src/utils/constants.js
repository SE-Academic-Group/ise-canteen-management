export const PAGE_SIZE = 10;

export const QUERY_KEYS = {
  USERS: "users",
  ORDERS: "orders",
  ORDER: "order",
  PRODUCTS: "products",
};

export const REGEX_PATTERNS = {
  VIETNAMESE_PHONE_NUMBER: /((09|03|07|08|05)+([0-9]{8})\b)/g,
  VIETNAMESE_NAME: /^[a-zA-ZÀ-ỹ\s]{1,50}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

// TODO: Add more rules from existing form (e.g. login, register, etc.)
export const FORM_RULES = {};

export const USER_ROLES = ["admin", "customer", "staff", "cashier"];

export const BACKEND_URL = "http://localhost:3001";

export const PRODUCT_CATEGORIES = ["food", "drink", "other"];
