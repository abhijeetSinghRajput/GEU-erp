import { axiosInstance } from "@/lib/axios";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useFeeStore = create((set, get) => ({
  feeSubmitions: null,
  feeReceipts: null,
  loadingFeeSubmitions: false,
  loadingFeeSubmitions: false,
  downloadingReceipt: null,

  getFeeSubmissions: async () => {
    set({ loadingFeeSubmitions: true });
    try {
      const res = await axiosInstance.get("/fee");
      const { feeSubmitions } = res.data;
      set({ feeSubmitions });
      // console.log("Fee submissions fetched successfully:", feeSubmitions);
    } catch (error) {
      set({ feeSubmitions: null });
      console.error("Error fetching fee submissions:", error);
      toast.error(
        error?.response?.data.message || "Failed to load fee submissions"
      );
    } finally {
      set({ loadingFeeSubmitions: false });
    }
  },

  getFeeReceipts: async () => {
    set({ loadingFeeReceipts: true });
    try {
      const res = await axiosInstance.get("/fee/receipts");
      const { feeReceipts } = res.data;
      set({ feeReceipts });
    } catch (error) {
      set({ feeReceipts: null });
      console.error("Error fetching fee receipts:", error);
      toast.error(
        error?.response?.data.message || "Failed to load fee receipts"
      );
    } finally {
      set({ loadingFeeReceipts: false });
    }
  },

  downloadReceipt: async (ReceiptModeID, BookID, CombineReceiptNo) => {
    set({ downloadingReceipt: CombineReceiptNo });
    try {
      const res = await axiosInstance.get("/fee/download", {
        params: { ReceiptModeID, BookID, CombineReceiptNo },
        responseType: "blob", // important!
      });

      // Create a download link
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;

      // Optional: Try to grab filename from headers, else fallback
      const contentDisposition = res.headers["content-disposition"];
      let filename = `${CombineReceiptNo}-fee-receipt.pdf`;
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+)"?/);
        if (match) filename = match[1];
      }
      link.setAttribute("download", filename);

      // Append to DOM, click, remove
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Cleanup object URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading receipt:", error);
      toast.error(
        error?.response?.data.message || "Failed to download receipt"
      );
    } finally {
      set({ downloadingReceipt: false });
    }
  },
  
}));
