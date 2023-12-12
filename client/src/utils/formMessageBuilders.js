import { toTitleCase } from "./helpers";

// TODO: Refactor this file
export function required(strings, field) {
  const name = strings.at(0) ?? field ?? "Giá trị";
  const titledName = toTitleCase(name);
  const result = `${titledName} không được để trống`;

  return result;
}

export function email() {
  const result = `Email không hợp lệ`;

  return result;
}

export function invalid(strings) {
  const name = strings.at(0) ?? "Giá trị";
  const titledName = toTitleCase(name);
  const result = `${titledName} không hợp lệ`;

  return result;
}

export function minLength(strings, value) {
  const name = strings.at(0) ?? "Giá trị";
  const titledName = toTitleCase(name);
  const result = `${titledName} phải có ít nhất ${value} ký tự`;

  return result;
}

export function maxLength(strings, value) {
  const name = strings.at(0) ?? "Giá trị";
  const titledName = toTitleCase(name);
  const result = `${titledName} không được vượt quá ${value} ký tự`;

  return result;
}

export function min(strings, value) {
  const name = strings.at(0) ?? "Giá trị";
  const titledName = toTitleCase(name);
  const result = `${titledName} phải lớn hơn ${value}`;

  return result;
}

export function max(strings, value) {
  const name = strings.at(0) ?? "Giá trị";
  const titledName = toTitleCase(name);
  const result = `${titledName} phải nhỏ hơn ${value}`;

  return result;
}
