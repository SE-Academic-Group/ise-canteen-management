import * as REGEX_PATTERNS from "./regex";
import { toTitleCase } from "../utils/helpers";

function required(field) {
  field = toTitleCase(field);
  return `${field} không được để trống`;
}

function invalid(field) {
  field = toTitleCase(field);
  return `${field} không hợp lệ`;
}

function minLength(field, length) {
  field = toTitleCase(field);
  return `${field} phải có ít nhất ${length} ký tự`;
}

function maxLength(field, length) {
  field = toTitleCase(field);
  return `${field} không được quá ${length} ký tự`;
}

function minValue(field, value) {
  field = toTitleCase(field);
  return `${field} phải lớn hơn ${value}`;
}

function maxValue(field, value) {
  field = toTitleCase(field);
  return `${field} phải nhỏ hơn ${value}`;
}

export const LENGTH = {
  PHONE: 10,
};

export const MIN_LENGTH = {
  FULL_NAME: 3,
  PRODUCT_NAME: 3,
  PASSWORD: 8,
  DESCRIPTION: 10,
};

export const MAX_LENGTH = {
  FULL_NAME: 50,
  PRODUCT_NAME: 56,
  DESCRIPTION: 256,
};

export const MIN_VALUE = {
  PRICE: 1000,
  STOCK_AMOUNT: 0,
};

export const MAX_VALUE = {
  PRICE: 10000000,
  STOCK_AMOUNT: 1000,
};

export const FORM_LABELS = {
  EMAIL: "Email",
  FULL_NAME: "Tên",
  PHONE: "Số điện thoại",
  PASSWORD: "Mật khẩu",
  PRODUCT_NAME: "Tên sản phẩm",
  PRICE: "Giá",
  DESCRIPTION: "Mô tả",
  STOCK_AMOUNT: "Số lượng",
  AMOUNT: "Số lượng",
};

export const FORM_RULES = {
  REQUIRED: (field) => {
    return { required: required(field) };
  },
  EMAIL: {
    required: required(FORM_LABELS.EMAIL),
    pattern: {
      value: REGEX_PATTERNS.EMAIL,
      message: invalid(FORM_LABELS.EMAIL),
    },
  },
  FULL_NAME: {
    required: required(FORM_LABELS.FULL_NAME),
    minLength: {
      value: MIN_LENGTH.FULL_NAME,
      message: minLength(FORM_LABELS.FULL_NAME, MIN_LENGTH.FULL_NAME),
    },
    pattern: {
      value: REGEX_PATTERNS.VIETNAMESE_NAME,
      message: invalid(FORM_LABELS.FULL_NAME),
    },
  },
  PHONE: {
    pattern: {
      value: REGEX_PATTERNS.VIETNAMESE_PHONE_NUMBER,
      message: invalid(FORM_LABELS.PHONE),
    },
  },
  PASSWORD: {
    required: required(FORM_LABELS.PASSWORD),
    min: {
      value: MIN_LENGTH.PASSWORD,
      message: minLength(FORM_LABELS.PASSWORD, MIN_LENGTH.PASSWORD),
    },
  },
  PRODUCT_NAME: {
    required: required(FORM_LABELS.PRODUCT_NAME),
    minLength: {
      value: MIN_LENGTH.FULL_NAME,
      message: minLength(FORM_LABELS.PRODUCT_NAME, MIN_LENGTH.PRODUCT_NAME),
    },
    maxLength: {
      value: MAX_LENGTH.FULL_NAME,
      message: maxLength(FORM_LABELS.PRODUCT_NAME, MAX_LENGTH.PRODUCT_NAME),
    },
  },
  PRICE: {
    required: required(FORM_LABELS.PRICE),
    min: {
      value: MIN_VALUE.PRICE,
      message: minValue(FORM_LABELS.PRICE, MIN_VALUE.PRICE),
    },
    max: {
      value: MAX_VALUE.PRICE,
      message: maxValue(FORM_LABELS.PRICE, MAX_VALUE.PRICE),
    },
    valueAsNumber: true,
  },
  DESCRIPTION: {
    minLength: {
      value: MIN_LENGTH.DESCRIPTION,
      message: minLength(FORM_LABELS.DESCRIPTION, MIN_LENGTH.DESCRIPTION),
    },
    maxLength: {
      value: MAX_LENGTH.DESCRIPTION,
      message: maxLength(FORM_LABELS.DESCRIPTION, MAX_LENGTH.DESCRIPTION),
    },
  },
  STOCK_AMOUNT: {
    required: required(FORM_LABELS.STOCK_AMOUNT),
    min: {
      value: MIN_VALUE.STOCK_AMOUNT,
      message: minValue(FORM_LABELS.STOCK_AMOUNT, MIN_VALUE.STOCK_AMOUNT),
    },
    max: {
      value: MAX_VALUE.STOCK_AMOUNT,
      message: maxValue(FORM_LABELS.STOCK_AMOUNT, MAX_VALUE.STOCK_AMOUNT),
    },
    valueAsNumber: true,
  },
  AMOUNT: {
    required: required(FORM_LABELS.AMOUNT),
    min: {
      value: MIN_VALUE.STOCK_AMOUNT,
      message: minValue(FORM_LABELS.AMOUNT, MIN_VALUE.STOCK_AMOUNT),
    },
    max: {
      value: MAX_VALUE.STOCK_AMOUNT,
      message: maxValue(FORM_LABELS.AMOUNT, MAX_VALUE.STOCK_AMOUNT),
    },
    valueAsNumber: true,
  },
};
