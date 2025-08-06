import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useExamStore = create((set, get) => ({
  examSummary: null,
  loadingExamSummary: false,
  loadingDetail: 0,

  getExamSummary: async () => {
    set({ loadingExamSummary: true });
    try {
      const res = await axiosInstance.get("/exam");
      const { examSummary } = res.data;
      set({ examSummary });
    } catch (error) {
      toast.error(
        error?.response?.data.message || "Failed to fetch exam summary"
      );
      console.log(error);
    } finally {
      set({ loadingExamSummary: false });
    }
  },

  getExamDetails: async (yearSem) => {
    set({ loadingDetail: yearSem });
    try {
      const res = await axiosInstance.get(`/exam/get-details`, {
        params: { yearSem },
      });
      const {msg, data, docNo} = res.data;
      if (msg === "OK") {
        window.open(
          `https://student.geu.ac.in/Web_StudentAcademic/DownloadFile?docNo=${docNo}`,
        );
      } else {
        toast.error(msg || "Failed to download exam details");
        console.log(res);
      }
    } catch (error) {
      toast.error(
        error?.response?.data.message || "Failed to fetch exam summary"
      );
      console.log(error);
    } finally {
      set({ loadingDetail: 0 });
    }
  },
}));
