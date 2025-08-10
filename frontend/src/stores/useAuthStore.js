import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";
import { useStudentStore } from "./useStudentStore";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  captchaImage: null,
  formToken: "",
  loadingCaptcha: false,
  logningIn: false,
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
    } catch (err) {
      console.error("Error fetching auth data:", err);
      toast.error(err?.response?.data.message || "failed to load captcha");
      set({ captchaImage: null, formToken: "" });
    } finally {
      set({ loadingCaptcha: false });
    }
  },

  login: async (data) => {
    set({ logningIn: true });
    const { formToken } = get();
    try {
      await axiosInstance.post("/auth/login", { ...data, formToken });
      set({ authenticated: true });
      toast.success("Login Successfull");

      const { fetchProfile } = useStudentStore.getState();
      await fetchProfile();

      return true;
    } catch (err) {
      console.error("Error fetching auth data:", err);
      set({ authUser: null, authenticated: false });
      toast.error(err?.response?.data.message || "something went wrong");
      return false;
    } finally {
      set({ logningIn: false });
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
