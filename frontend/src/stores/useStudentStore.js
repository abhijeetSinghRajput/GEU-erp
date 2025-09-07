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
  uploadingAvatar: false,

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

  updateAvatar: async (file) => {
    set({ uploadingAvatar: true });
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axiosInstance.post("/upload-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res.data);
      toast.success("Avatar uploaded successfully ✅");
      get().getIdCard();
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to upload avatar");
    } finally {
      set({ uploadingAvatar: false });
    }
  },

  getIdCard: async () => {
    set({ loadingIdCard: true });
    try {
      const response = await axiosInstance.get("/idcard");
      const idCard = {
        ...response.data,
        AuthoritySignature: `data:image/bmp;base64,${response.data?.AuthoritySignature}`,
        Photo: `data:image/bmp;base64,${response.data?.Photo}`,
      };
      
      set({ idCard });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loadingIdCard: false });
    }
  },
}));
