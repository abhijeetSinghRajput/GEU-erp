import { load } from "cheerio";

export const extractLoginError = (html) => {
  const $ = load(html); // load instead of cheerio.load
  const errorText = $(".validation-summary-errors li").first().text();
  return errorText || "Unknown error occurred during login.";
};
