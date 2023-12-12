import { format, parseISO } from "date-fns";

/**
 * Returns the current date as an ISO string.
 * @param {Object} options - Optional parameters.
 * @param {boolean} options.end - If true, sets the time to the end of the day.
 * @returns {string} The current date as an ISO string.
 */
export function getToday(options = {}) {
  const today = new Date();

  if (options && options.end) {
    today.setUTCHours(23, 59, 59, 999);
  } else {
    today.setUTCHours(0, 0, 0, 0);
  }

  return today.toISOString();
}

/**
 * Pads a string with a specified character to a specified length.
 * @param {string|number} str - The string to pad.
 * @param {number} length - The desired length of the padded string.
 * @param {string} [char="0"] - The character used for padding. Defaults to "0".
 * @returns {string} The padded string.
 */
export function padNumber(str, length, char = "0") {
  return str.toString().padStart(length, char);
}

/**
 * Formats a Vietnamese phone number by adding spaces between digits.
 * If the phoneNumber is falsy, it returns a string with three sets of three underscores.
 * @param {number|string} phoneNumber - The phone number to be formatted.
 * @returns {string} The formatted phone number.
 */
export function formatVietnamesePhoneNumber(phoneNumber) {
  if (!phoneNumber) {
    return "___ ___ ___";
  }

  const phone = phoneNumber.toString();
  const formattedPhone = phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
  return formattedPhone;
}

/**
 * Formats a number as Vietnamese currency.
 * @param {number} value - The value to be formatted.
 * @returns {string} The formatted currency value.
 */
export function formatVietnameseCurrency(value) {
  if (value !== 0 && !value) {
    return "___ ___ ___";
  }

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
}

/**
 * Formats a date and time string into a specific format.
 * @param {string} dateStr - The date and time string to format.
 * @returns {string} The formatted date and time string.
 */
export function formatDateTime(dateStr) {
  return format(parseISO(dateStr), "MMM d, yyyy h:mm a");
}

/**
 * Formats a date string into the format "MMM d, yyyy".
 * @param {string} dateStr - The date string to be formatted.
 * @returns {string} The formatted date string.
 */
export function formatDate(dateStr) {
  return format(parseISO(dateStr), "MMM d, yyyy");
}

/**
 * Converts a string to title case.
 *
 * @param {string} value - The string to be converted.
 * @returns {string} - The converted string in title case.
 */
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

/**
 * Generates a password from the given email.
 *
 * @param {string} email - The email address.
 * @returns {string} - The generated password.
 */
export function generatePasswordFromEmail(email) {
  const emailParts = email.split("@");
  const generatedPassword = emailParts[0];
  return generatedPassword;
}

/**
 * Returns the complete image URL by concatenating the base URL with the provided path.
 * @param {string} path - The path of the image.
 * @returns {string} - The complete image URL.
 */
export function getImageUrl(path) {
  return import.meta.env.IMAGE_BASE_URL + path;
}

/**
 * Converts an object to an array by mapping its values.
 *
 * @param {Object} obj - The object to be converted.
 * @returns {Array} - The array containing the values of the object.
 */
export function objectToArray(obj) {
  const cloned = structuredClone(obj);
  const keys = Object.keys(cloned);
  const arr = keys.map((key) => cloned[key]);

  return arr;
}

/**
 * Builds options array from an object.
 * @param {Object} object - The input object.
 * @returns {Array} - The options array.
 */
export function buildOptions(object) {
  return objectToArray(object).map((o) => {
    return { value: o.en, label: o.vi };
  });
}
