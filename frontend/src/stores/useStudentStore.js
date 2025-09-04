import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useStudentStore = create((set, get) => ({
  student: null,
  isFetchingProfile: false,
  avatarBlobUrl: null,
  errors: {
    fetchProfile: null,
  },
  loadingAvatar: false,
  idCard: null,
  loadingIdCard: false,

  fetchProfile: async () => {
    set({
      isFetchingProfile: true,
      errors: { ...get().errors, fetchProfile: null },
    });
    try {
      const res = await axiosInstance.get("/");
      set({ student: res.data });
    } catch (error) {
      const message =
        error?.response?.data.message ||
        "Something went wrong while fetching profile";
      set({ errors: { ...get().errors, fetchProfile: message } });
      // console.log(message, error);
      toast.error(message);
    } finally {
      set({ isFetchingProfile: false });
    }
  },

  loadAvatar: async () => {
    set({ loadingAvatar: true });
    try {
      const response = await axiosInstance.get("/avatar", {
        responseType: "blob",
      });
      const blobUrl = URL.createObjectURL(response.data);

      set({ avatarBlobUrl: blobUrl });
      return blobUrl;
    } catch (error) {
      // console.log("failed to load avatar");
      set({ avatarBlobUrl: null });
      return null;
    } finally {
      set({ loadingAvatar: false });
    }
  },

  getIdCard: async () => {
    set({ loadingIdCard: true });
    try {
      const response = await axiosInstance.get("/idcard");
      set({idCard: response.data});
    } catch (error) {
      console.log(error);
    } finally {
      set({ loadingIdCard: false });
    }
  },
}));
