import axios from "axios";
import { CookieJar } from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";
import { extractLoginError } from "../utils/errors.js";
import { load } from "cheerio";
import { fetchGEU } from "../utils/geuApi.js";
import { errorMap } from "../constants/error.js";

const DEEMED_BASE_URL = "https://student.geu.ac.in/";
const HILL_BASE_URL = "https://student.gehu.ac.in/";
export const getCaptcha = async (req, res) => {
  try {
    const campus = req.cookies["campus"] || "deemed";
    const BASE_URL = campus === "hill" ? HILL_BASE_URL : DEEMED_BASE_URL;
    const jar = new CookieJar();
    const client = wrapper(
      axios.create({
        jar,
        withCredentials: true,
      })
    );
    // Step 1: Get initial page to establish session and get tokens
    const initialResponse = await client.get(BASE_URL);

    // Parse the HTML to get the form's verification token
    const $ = load(initialResponse.data);
    const formToken = $('input[name="__RequestVerificationToken"]').val();

    // Step 2: Get captcha as JSON array
    const captchaUrl = $("#imgPhoto").attr("src");
    if (!captchaUrl) {
      return res.status(error.status || 500).json({ message: "Captcha image not found" });
    }

    // Step 6: Set cookies for frontend
    const cookies = await jar.getCookies(BASE_URL);
    cookies.forEach(({ key, value }) => {
      res.cookie(key, value, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
    });

    // Also send the form token to the frontend
    res.status(200).json({
      image: captchaUrl,
      formToken, // Send this to frontend to include in login
    });
  } catch (error) {
    // console.log(error);
    res
      .status(error.status || 500)
      .json({ message: errorMap[error.code] || "Something went wrong" });
  }
};

export const login = async (req, res) => {
  try {
    // Extract user input and cookies from the request
    const { studentId, password, captcha, formToken } = req.body;
    const sessionId = req.cookies["ASP.NET_SessionId"];
    const cookieToken = req.cookies["__RequestVerificationToken"];

    // Validate input presence
    if (
      !studentId ||
      !password ||
      !captcha ||
      !sessionId ||
      !cookieToken ||
      !formToken
    ) {
      return res.status(400).json({ message: "Missing credentials or tokens" });
    }

    const formData = new URLSearchParams();
    formData.append("hdnMsg", "GEU");
    formData.append("checkOnline", "0");
    formData.append("__RequestVerificationToken", formToken); // Use form token here
    formData.append("UserName", studentId);
    formData.append("Password", password);
    formData.append("clientIP", "");
    formData.append("captcha", captcha);

    const jar = new CookieJar();
    const client = wrapper(
      axios.create({
        jar,
        withCredentials: true,
      })
    );

    const campus = req.cookies["campus"] || "deemed";
    const BASE_URL = campus === "hill" ? HILL_BASE_URL : DEEMED_BASE_URL;
    // Use the same client instance that maintains cookies
    const response = await client.post(
      BASE_URL,
      formData,
      {
        maxRedirects: 0,
        validateStatus: (status) => status >= 200 && status < 400,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Referer: BASE_URL,
          Origin: BASE_URL,
          Cookie: `ASP.NET_SessionId=${sessionId}; __RequestVerificationToken=${cookieToken}`,
        },
      }
    );

    // Login is successful if server redirects to student dashboard
    const isSuccess =
      response.status === 302 &&
      response.headers.location === "/Account/Cyborg_StudentMenu";

    if (!isSuccess) {
      return res.status(401).json({
        message: extractLoginError(response.data),
      });
    }

    // Set Cookies
    const setCookies = response.headers["set-cookie"];
    if (setCookies) {
      setCookies.forEach((cookie) => {
        const parts = cookie.split(";")[0].split("=");
        const key = parts[0];
        const value = parts[1];

        // Set each cookie in client with secure attributes
        res.cookie(key, value, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
        });
      });

      return res.status(200).json({
        message: "✅ Login successful",
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(error.status || 500).json({
      message: errorMap[error.code] || "Something went wrong during login",
    });
  }
};

export const logout = async (req, res) => {
  try {
    await fetchGEU("/Account/LogOff", req, {
      method: "post",
      data: {},
    });

    res.clearCookie("ASP.NET_SessionId");
    res.clearCookie("__RequestVerificationToken");

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res
      .status(error.status || 500)
      .json({ message: errorMap[error.code] || "Failed to logout" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const sessionId = req.cookies["ASP.NET_SessionId"];
    const token = req.cookies["__RequestVerificationToken"];
    const campus = req.cookies["campus"] || "deemed";
    const BASE_URL = campus === "hill" ? HILL_BASE_URL : DEEMED_BASE_URL;

    if (!sessionId || !token) {
      return res.status(401).json({ message: "Session or token missing" });
    }

    const response = await axios.get(
      `${BASE_URL}account/Cyborg_StudentMenu`,
      {
        headers: {
          Cookie: `ASP.NET_SessionId=${sessionId}; __RequestVerificationToken=${token}`,
        },
        maxRedirects: 0, // Don't follow redirect
        validateStatus: (status) => status === 200 || status === 302, // Accept both
      }
    );

    if (response.status === 200) {
      // ✅ Authenticated
      return res.status(200).json({ authenticated: true });
    } else if (response.status === 302) {
      // ❌ Unauthenticated
      return res.status(401).json({ authenticated: false });
    }

    return res
      .status(error.status || 500)
      .json({ message: "Unexpected status" });
  } catch (error) {
    console.error("❌ Error checking auth:", error.message);
    return res
      .status(error.status || 500)
      .json({ message: errorMap[error.code] || "Internal error" });
  }
};
