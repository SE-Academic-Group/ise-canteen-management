import * as DICTIONARY from "../constants/dictionary";

/**
 * @typedef {('vi'|'en')} TranslatorLang
 */

/**
 * Translates a given value based on the specified key and language.
 * @param {import('../constants/dictionary').DictionaryKey} key - The key to determine the translation map.
 * @param {string} value - The value to be translated.
 * @param {TranslatorLang} [lang="vi"] - The language to translate the value into. Default is "vi".
 * @returns {string} - The translated value in the specified language.
 */
export function translator(key, value, lang = "vi") {
  value = value.toUpperCase();
  key = key.toUpperCase();

  const result = DICTIONARY[key][value] || value.replace(/[_-]/g, " ");
  const translated = result[lang];

  return translated;
}
