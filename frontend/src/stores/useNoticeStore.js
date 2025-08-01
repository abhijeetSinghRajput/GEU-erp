import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

export const useNoticeStore = create((set) => ({
  circulars: [],
  isLoadingCirculars: false,
  getCirculars: async () => {
    set({ isLoadingCirculars: true });
    try {
        const res = await axiosInstance.get('/circulars');
        const {circular} = res.data;
        set({circulars: circular || []})
    } catch (error) {
        console.log(error);
        set({circular: []});
    } finally {
      set({ isLoadingCirculars: false });
    }
  },
}));
