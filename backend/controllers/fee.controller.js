import axios from "axios";
import { fetchGEU } from "../utils/geuApi.js";
import { errorMap } from "../constants/error.js";
import qs from "qs";

export const getFeeSubmissions = async (req, res) => {
  const { feeType = 2, duration = 0 } = req.query;

  try {
    const payload = qs.stringify({ FeeType: feeType, duration });

    const response = await fetchGEU("/Web_StudentFinance/FillHead", req, {
      method: "post",
      customHeaders: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: payload,
    });
    const feeSubmissions = {
      ...response,
      headdata: JSON.parse(response.headdata),
      headdatahostel: JSON.parse(response.headdatahostel),
    };
    return res.status(200).json({ feeSubmissions });
  } catch (error) {
    console.error("Error fetching fee submission:", error);
    return res
      .status(500)
      .json({ message: errorMap[error.code] || "Failed to fetch fee data" });
  }
};

export const getFeeReceipts = async (req, res) => {
  try {
    const response = await fetchGEU(
      "/Web_StudentFinance/GetStudentFeeReceipt_ostulgn",
      req,
      {
        method: "post",
      }
    );

    // Parse the response (assuming it's JSON)
    const feeReceipts = JSON.parse(response);

    return res.status(200).json({ feeReceipts });
  } catch (error) {
    console.error("Error fetching fee receipts:", error);
    return res.status(error.status || 500).json({
      message: errorMap[error.code] || "Failed to fetch fee receipt data",
    });
  }
};

export const downloadReceipt = async (req, res) => {
  const { ReceiptModeID, BookID, CombineReceiptNo } = req.query;

  try {
    // 1️⃣ Get ReceiptNo from ERP
    const ReceiptNo = await fetchGEU(
      `/Web_StudentFinance/ShowFeeReceipt_ostulgn`,
      req,
      {
        method: "post",
        data: { ReceiptModeID, BookID, CombineReceiptNo },
        customHeaders: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (!ReceiptNo) {
      return res.status(400).json({ message: "ReceiptNo not found" });
    }

    // 2️⃣ Request ERP PDF as a stream (no buffering)
    const pdfStream = await axios.get(
      `https://student.geu.ac.in/Web_StudentFinance/DownloadFile?ReceiptNo=${ReceiptNo}`,
      {
        responseType: "stream",
        headers: {
          Cookie: req.headers.cookie, // Reuse same session
        },
      }
    );

    // console.log(pdfStream);
    // 3️⃣ Forward headers & pipe directly to client
    const encodedFilename = encodeURIComponent(`${ReceiptNo}-fee-receipt.pdf`);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${encodedFilename}`
    );
    res.setHeader("Content-Type", "application/pdf");

    pdfStream.data.pipe(res); // Streams directly, no memory bloat
  } catch (error) {
    console.error(
      "Error downloading receipt:",
      errorMap[error.code],
      error.message
    );
    res.status(error.status || 500).json({
      message: errorMap[error.code] || "Failed to download receipt",
    });
  }
};
