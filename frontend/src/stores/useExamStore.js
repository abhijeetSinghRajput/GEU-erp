import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useExamStore = create((set, get) => ({
  examSummary: [],
  backlogs: [],
  loadingExamSummary: false,
  loadingBacklogs: false,
  loadingMarksheet: 0,
  loadingAdmitCard: false,
  errors: {
    getExamSummary: null,
    downloadMarksheet: null,
  },
  admitCards: {
    sessional: null,
    endTerm: null,
    midTerm: null,
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
      const res = await axiosInstance.get(`/exam/get-marksheet`, {
        params: { yearSem },
        responseType: "blob", // 👈 important: tells axios to treat it as binary
      });

      // Create a URL for the Blob
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element
      const a = document.createElement("a");
      a.href = url;
      a.download = `marksheet_${yearSem}.pdf`; // suggested filename
      document.body.appendChild(a);
      a.click();

      // Clean up
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to download marksheet";
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
  getAdmitCard: async (examType) => {
    set({ loadingAdmitCard: examType });
    try {
      const res = await axiosInstance.get(`/exam/get-admit-card/${examType}`);
      set({
        admitCards: { ...get().admitCards, [examType]: res.data.admitCard },
      });
    } catch (error) {
      const message =
        error?.response?.data.message || "Failed to fetch backlogs";
      // console.log(message, error);
      toast.error(message);
      set({ errors: { ...get().errors, getAdmitCard: message } });
    } finally {
      set({ loadingAdmitCard: false });
    }
  },
}));
