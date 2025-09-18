import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";
import { useStudentStore } from "./useStudentStore";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  captchaImage: null,
  formToken: "",
  loadingCaptcha: false,
  loggingIn: false,
  checkingAuth: false,
  authenticated: false,

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check-auth");
      const { authenticated } = res.data;
      set({ authenticated });
    } catch (error) {
      // console.log(error);
      set({ authenticated: false });
    } finally {
      set({ checkingAuth: false });
    }
  },

  getCaptcha: async () => {
    set({ loadingCaptcha: true });
    try {
      const res = await axiosInstance.get("/auth");
      const { image, formToken } = res.data;
      set({ captchaImage: image, formToken });
    } catch (error) {
      console.error("Error fetching auth data:", error);
      console.log(error);
      toast.error(error?.response?.data.message || "failed to load captcha");
      set({ captchaImage: null, formToken: "" });
    } finally {
      set({ loadingCaptcha: false });
    }
  },

  login: async (data) => {
    set({ loggingIn: true });
    const { formToken } = get();
    try {
      await axiosInstance.post("/auth/login", { ...data, formToken });
      set({ authenticated: true });
      toast.success("Login Successfull");

      const { fetchProfile } = useStudentStore.getState();
      await fetchProfile();

      return true;
    } catch (error) {
      console.error("Error fetching auth data:", error);
      set({ authUser: null, authenticated: false });
      toast.error(error?.response?.data.message || "something went wrong");
      get().getCaptcha();
      return false;
    } finally {
      set({ loggingIn: false });
    }
  },
  
  logout: async () => {
    set({ loginingOut: true });
    try {
      await axiosInstance.post("/auth/logout");
      set({ authenticated: false });
    } catch (error) {
      toast.error(error?.response?.data.message || "failed to logout");
      // console.log(error);
    } finally {
      set({ loginingOut: false });
    }
  },
}));
