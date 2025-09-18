import axios from "axios";
import qs from "qs"; // make sure this is installed: npm i qs

export const fetchGEU = async (endpoint, req, options = {}) => {
  const sessionId = req.cookies["ASP.NET_SessionId"];
  const token = req.cookies["__RequestVerificationToken"];
  const BASE_URL = req.BASE_URL;

  if (!sessionId || !token) {
    throw new Error("Credentials are missing");
  }
  const {
    method = "get",
    data = {},
    customHeaders = {},
    referer = BASE_URL,
    responseType = "json",
  } = options;

  const url = `${BASE_URL}${endpoint.startsWith('/') ? endpoint.slice(1) : endpoint}`;

  const isFormEncoded =
    customHeaders["Content-Type"] === "application/x-www-form-urlencoded";

  const defaultHeaders = {
    "Content-Type": isFormEncoded
      ? "application/x-www-form-urlencoded"
      : "application/json",
    "X-Requested-With": "XMLHttpRequest",
    Origin: BASE_URL,
    Referer: referer,
    Cookie: req.headers.cookie || `ASP.NET_SessionId=${sessionId}; __RequestVerificationToken=${token}`,
    ...customHeaders,
  };

  try {
    const res = await axios({
      method,
      url,
      headers: defaultHeaders,
      data:
        method === "post" && data
          ? isFormEncoded
            ? qs.stringify(data)
            : data
          : undefined,
      responseType,
    });

    // Check for unexpected login redirect
    if (
      typeof res.data === "string" &&
      res.data.includes("<title>Graphic Era")
    ) {
      throw new Error("❌ Invalid session or redirected to login page.");
    }

    return res.data;
  } catch (error) {
    console.error(`❌ Error fetching from ${endpoint}:`, error);
    throw error;
  }
};
