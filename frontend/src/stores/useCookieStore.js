import { create } from "zustand";
import Cookies from "js-cookie";

const BASE_URLS = {
  deemed: "https://student.geu.ac.in",
  hill: "https://student.gehu.ac.in",
};

export const useCookieStore = create((set, get) => ({
  campus: Cookies.get("campus") || "deemed",

  setCampus: (value) => {
    Cookies.set("campus", value, {
      expires: 365,
      path: "/",
      sameSite: "strict",
    });
    set({ campus: value });
  },

  getBaseUrl: () => {
    const c = get().campus;
    return BASE_URLS[c] || BASE_URLS.deemed;
  },
}));
