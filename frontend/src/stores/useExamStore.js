import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useExamStore = create((set, get) => ({
  examSummary: [],
  backlogs: [],
  loadingExamSummary: false,
  loadingBacklogs: false,
  loadingMarksheet: 0,
  errors: {
    getExamSummary: null,
    downloadMarksheet: null,
  },

  getExamSummary: async () => {
    set({
      loadingExamSummary: true,
      errors: { ...get().errors, getExamSummary: null },
    });
    try {
      const res = await axiosInstance.get("/exam");
      const { examSummary } = res.data;
      set({ examSummary });
    } catch (error) {
      const message =
        error?.response?.data.message || "Failed to fetch exam summary";
      // console.log(message, error);
      toast.error(message);
      set({
        examSummary: [],
        errors: { ...get().errors, getExamSummary: message },
      });
    } finally {
      set({ loadingExamSummary: false });
    }
  },

  downloadMarksheet: async (yearSem) => {
    set({
      loadingMarksheet: yearSem,
      errors: { ...get().errors, downloadMarksheet: null },
    });
    try {
      const res = await axiosInstance.get(`/exam/get-details`, {
        params: { yearSem },
      });
      const { msg, data, docNo } = res.data;
      if (msg === "OK") {
        window.open(
          `https://student.geu.ac.in/Web_StudentAcademic/DownloadFile?docNo=${docNo}`
        );
      } else {
        toast.error(msg || "Failed to download exam details");
        // console.log(res);
      }
    } catch (error) {
      const message =
        error?.response?.data.message || "Failed to fetch exam summary";
      // console.log(message, error);
      toast.error(message);
      set({
        errors: { ...get().errors, downloadMarksheet: message },
        backlogs: [],
      });
    } finally {
      set({ loadingMarksheet: 0 });
    }
  },

  getBacklogs: async () => {
    set({
      loadingBacklogs: true,
      errors: { ...get().errors, getBacklogs: null },
    });
    try {
      const res = await axiosInstance.get("/exam/get-back-papers");
      const { backlogs } = res.data;
      set({ backlogs });
    } catch (error) {
      const message =
        error?.response?.data.message || "Failed to fetch backlogs";
      // console.log(message, error);
      toast.error(message);
      set({ errors: { ...get().errors, getBacklogs: message } });
    } finally {
      set({ loadingBacklogs: false });
    }
  },
}));
