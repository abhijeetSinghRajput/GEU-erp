import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";
import { useStudentStore } from "./useStudentStore";

// ✅ Centralized error handler
const handleAxiosError = (error, defaultMessage) => {
  const message =
    error?.response?.data?.message ||
    error?.message ||
    defaultMessage ||
    "An unexpected error occurred";
  toast.error(message);
  console.error("❌ Axios Error:", error);
  return message;
};

export const useAuthStore = create((set, get) => ({
  authUser: null,
  captchaImage: null,
  formToken: "",
  loadingCaptcha: false,
  loggingIn: false,
  checkingAuth: false,
  authenticated: false,
  loginingOut: false,
  error: {
    getCaptcha: null,
    login: null,
    logout: null,
  },

  // ✅ Check Auth Status
  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check-auth");
      if (res?.data?.authenticated === undefined) {
        throw new Error("Invalid auth response");
      }
      set({ authenticated: res.data.authenticated, error: { ...get().error, checkAuth: null } });
    } catch (error) {
      const msg = handleAxiosError(error, "Failed to verify session");
      set({ authenticated: false, error: { ...get().error, checkAuth: msg } });
    } finally {
      set({ checkingAuth: false });
    }
  },

  // ✅ Get Captcha
  getCaptcha: async () => {
    set({ loadingCaptcha: true });
    try {
      const res = await axiosInstance.get("/auth");
      const { image, formToken } = res.data;
      if (!image || !formToken) throw new Error("Invalid captcha response");

      set({
        captchaImage: image,
        formToken,
        error: { ...get().error, getCaptcha: null },
      });
    } catch (error) {
      const msg = handleAxiosError(error, "Failed to load captcha");
      set({
        captchaImage: null,
        formToken: "",
        error: { ...get().error, getCaptcha: msg },
      });
    } finally {
      set({ loadingCaptcha: false });
    }
  },

  // ✅ Login
  login: async (data) => {
    set({ loggingIn: true });
    const { formToken } = get();
    try {
      const res = await axiosInstance.post("/auth/login", { ...data, formToken });
      if (!res?.data?.success && res?.status !== 200) throw new Error("Login failed");

      set({ authenticated: true, error: { ...get().error, login: null } });
      toast.success("Login Successful 🎉");

      const { fetchProfile } = useStudentStore.getState();
      await fetchProfile();

      return true;
    } catch (error) {
      const msg = handleAxiosError(error, "Login failed");
      set({ authUser: null, authenticated: false, error: { ...get().error, login: msg } });
      get().getCaptcha(); // refresh captcha after failed login
      return false;
    } finally {
      set({ loggingIn: false });
    }
  },

  // ✅ Logout
  logout: async () => {
    set({ loginingOut: true });
    try {
      await axiosInstance.post("/auth/logout");
      set({ authenticated: false, error: { ...get().error, logout: null } });
      toast.success("Logged out successfully");
    } catch (error) {
      const msg = handleAxiosError(error, "Failed to logout");
      set({ error: { ...get().error, logout: msg } });
    } finally {
      set({ loginingOut: false });
    }
  },
}));
