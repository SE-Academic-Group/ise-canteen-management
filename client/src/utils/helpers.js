import { format, parseISO } from "date-fns";

export function getToday(options = {}) {
  const today = new Date();

  if (options && options.end) {
    today.setUTCHours(23, 59, 59, 999);
  } else {
    today.setUTCHours(0, 0, 0, 0);
  }

  return today.toISOString();
}

export function padString(str, length, char = "0") {
  return str.toString().padStart(length, char);
}

export function formatVietnamesePhoneNumber(phoneNumber) {
  const phone = phoneNumber.toString();
  const formattedPhone = phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
  return formattedPhone;
}

export function formatVietnameseCurrency(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value ?? 0);
}

export function formatDateTime(dateStr) {
  return format(parseISO(dateStr), "MMM d, yyyy h:mm a");
}

export function toTitleCase(value) {
  var i, j, str, lowers, uppers;
  str = value.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

  // Certain minor words should be left lowercase unless
  // they are the first or last words in the string
  lowers = [
    "A",
    "An",
    "The",
    "And",
    "But",
    "Or",
    "For",
    "Nor",
    "As",
    "At",
    "By",
    "For",
    "From",
    "In",
    "Into",
    "Near",
    "Of",
    "On",
    "Onto",
    "To",
    "With",
  ];
  for (i = 0, j = lowers.length; i < j; i++)
    str = str.replace(
      new RegExp("\\s" + lowers[i] + "\\s", "g"),
      function (txt) {
        return txt.toLowerCase();
      }
    );

  // Certain words such as initialisms or acronyms should be left uppercase
  uppers = ["Id", "Tv"];
  for (i = 0, j = uppers.length; i < j; i++)
    str = str.replace(
      new RegExp("\\b" + uppers[i] + "\\b", "g"),
      uppers[i].toUpperCase()
    );

  return str;
}
