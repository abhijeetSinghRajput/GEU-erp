import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";
import { downloadBlob } from "../lib/utils";

export const useFeeStore = create((set, get) => ({
  feeSubmissions: null,
  feeReceipts: null,
  loadingFeeSubmissions: false,
  loadingFeeReceipts: false,
  downloadingReceipt: null,
  errors: {
    getFeeSubmissions: null,
    getFeeReceipts: null,
    downloadReceipt: null,
  },

  // Fetch fee submissions
  getFeeSubmissions: async () => {
    set({
      loadingFeeSubmissions: true,
      errors: { ...get().errors, getFeeSubmissions: null },
    });
    try {
      const res = await axiosInstance.get("/fee");
      set({ feeSubmissions: res.data.feeSubmissions });
      // console.log(get().feeSubmissions);
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to load fee submissions";
      set({ errors: { ...get().errors, getFeeSubmissions: message } });
      toast.error(message);
      console.error("Fee submissions error:", error);
    } finally {
      set({ loadingFeeSubmissions: false });
    }
  },

  // Fetch fee receipts
  getFeeReceipts: async () => {
    set({
      loadingFeeReceipts: true,
      errors: { ...get().errors, getFeeReceipts: null },
    });
    try {
      const res = await axiosInstance.get("/fee/receipts");
      set({ feeReceipts: res.data.feeReceipts });
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to load fee receipts";
      set({ errors: { ...get().errors, getFeeReceipts: message } });
      toast.error(message);
      console.error("Fee receipts error:", error);
    } finally {
      set({ loadingFeeReceipts: false });
    }
  },

  // Download Receipt
  downloadReceipt: async (ReceiptModeID, BookID, CombineReceiptNo) => {
    set({
      downloadingReceipt: CombineReceiptNo,
      errors: { ...get().errors, downloadReceipt: null },
    });

    try {
      const res = await axiosInstance.get("/fee/download", {
        params: { ReceiptModeID, BookID, CombineReceiptNo },
        responseType: "blob",
      });

      // Extract filename from headers or fallback
      const contentDisposition = res.headers["content-disposition"];
      const filename =
        contentDisposition?.match(/filename="?(.+)"?/)?.[1] ||
        `${CombineReceiptNo}-receipt.pdf`;

      const blob = new Blob([res.data], { type: "application/pdf" });
      downloadBlob(blob, filename);

      toast.success("Receipt downloading...");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to download receipt";
      set({ errors: { ...get().errors, downloadReceipt: message } });
      toast.error(message);
      console.error("Download error:", error);
    } finally {
      set({ downloadingReceipt: null });
    }
  },
}));
