import { format, formatDistance, parseISO } from "date-fns";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

export const getToday = function (options = {}) {
  const today = new Date();

  if (options?.end) today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);

  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

export const padString = (str, length, char = "0") =>
  str.toString().padStart(length, char);

export const formatVietnamesePhoneNumber = (phoneNumber) => {
  const phone = phoneNumber.toString();
  const formattedPhone = phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1-$2-$3");
  return formattedPhone;
};

export const formatVietnameseCurrency = (value) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    value ?? 0
  );

export const formatDateTime = (dateStr) =>
  format(parseISO(dateStr), "MMM d, yyyy");
