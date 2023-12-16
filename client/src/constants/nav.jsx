import {
  HiOutlineBuildingStorefront,
  HiOutlineCube,
  HiOutlineChartBarSquare,
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlineCog8Tooth,
  HiOutlineUsers,
} from "react-icons/hi2";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { BiFoodMenu } from "react-icons/bi";
import { FaHistory } from "react-icons/fa";
import { objectToArray } from "../utils/helpers";

export const ROUTES = {
  DASHBOARD: {
    path: "/dashboard",
    name: "Trang chủ",
    icon: HiOutlineHome,
  },
  USERS: {
    path: "/users",
    name: "Người dùng",
    icon: HiOutlineUsers,
  },
  DEPOSIT: {
    path: "/deposit",
    name: "Nạp tiền",
    icon: FaMoneyCheckDollar,
  },
  ORDERS: {
    path: "/orders",
    name: "Đơn hàng",
    icon: HiOutlineShoppingBag,
  },
  PRODUCTS: {
    path: "/products",
    name: "Sản phẩm",
    icon: HiOutlineCube,
  },
  INVENTORY: {
    path: "/inventory",
    name: "Kho hàng",
    icon: HiOutlineBuildingStorefront,
  },
  STATS: {
    path: "/stats",
    name: "Thống kê",
    icon: HiOutlineChartBarSquare,
  },
  TODAY_MENU: {
    path: "/today-menu",
    name: "Thực đơn",
    icon: BiFoodMenu,
  },
  MENUS: {
    path: "/menus",
    name: "Lịch sử thực đơn",
    icon: FaHistory,
  },
  SETTINGS: {
    path: "/settings",
    name: "Cài đặt",
    icon: HiOutlineCog8Tooth,
  },
};

export const ADMIN_ROUTES = objectToArray(ROUTES);
export const CUSTOMER_ROUTES = [];
export const PUBLIC_ROUTES = [ROUTES.SETTINGS];
export const STAFF_ROUTES = [
  ROUTES.ORDERS,
  ROUTES.PRODUCTS,
  ROUTES.INVENTORY,
  ROUTES.TODAY_MENU,
  ROUTES.MENUS,
  ROUTES.SETTINGS,
];
export const CASHIER_ROUTES = [
  ROUTES.STATS,
  ROUTES.DEPOSIT,
  ROUTES.ORDERS,
  ROUTES.INVENTORY,
  ROUTES.SETTINGS,
];

export const ROUTES_MAP = {
  admin: ADMIN_ROUTES,
  customer: CUSTOMER_ROUTES,
  staff: STAFF_ROUTES,
  cashier: CASHIER_ROUTES,
  public: PUBLIC_ROUTES,
};
