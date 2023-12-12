import {
  max,
  min,
  email,
  invalid,
  maxLength,
  minLength,
  required,
} from "../utils/formMessageBuilders";
import { REGEX_PATTERNS } from "./regex";

export const FORM_RULES = {
  REQUIRED: (field) => {
    return { required: required`${field}` };
  },
  EMAIL: {
    required: required`email`,
    pattern: {
      value: REGEX_PATTERNS.EMAIL,
      message: email``,
    },
  },
  FULL_NAME: {
    required: required`tên`,
    minLength: {
      value: 3,
      message: minLength`tên ${3}`,
    },
    pattern: {
      value: REGEX_PATTERNS.VIETNAMESE_NAME,
      message: invalid`tên`,
    },
  },
  PHONE: {
    pattern: {
      value: REGEX_PATTERNS.VIETNAMESE_PHONE_NUMBER,
      message: invalid`số điện thoại`,
    },
    maxLength: {
      value: 10,
      message: maxLength`số điện thoại ${10}`,
    },
  },
  PASSWORD: {
    required: required`mật khẩu`,
    min: {
      value: 6,
      message: minLength`mật khẩu ${6}`,
    },
  },
  PRODUCT_NAME: {
    required: required`Tên sản phẩm`,
    pattern: {
      value: REGEX_PATTERNS.VIETNAMESE_NAME,
      message: invalid`Tên sản phẩm`,
    },
    minLength: {
      value: 3,
      message: minLength`Tên sản phẩm ${3}`,
    },
    maxLength: {
      value: 50,
      message: maxLength`Tên sản phẩm ${50}`,
    },
  },
  PRICE: {
    required: required`Giá`,
    min: {
      value: 1000,
      message: min`Giá ${1000}`,
    },
    max: {
      value: 100000000,
      message: max`Giá ${100000000}`,
    },
  },
  DESCRIPTION: {
    minLength: {
      value: 10,
      message: minLength`Mô tả ${10}`,
    },
    maxLength: {
      value: 256,
      message: maxLength`Mô tả ${256}`,
    },
  },
  STOCK_AMOUNT: {
    min: {
      value: 0,
      message: min`Số lượng ${0}`,
    },
    required: required`Số lượng`,
  },
};
