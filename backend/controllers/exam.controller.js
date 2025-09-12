import { errorMap } from "../constants/error.js";
import { fetchGEU } from "../utils/geuApi.js";
import qs from "qs"; // if not already, install: npm install qs

export const getExamSummary = async (req, res) => {
  try {
    const response = await fetchGEU(
      "/Web_StudentAcademic/GetStudentExamSummary",
      req,
      {
        method: "post",
      }
    );

    const examSummary = JSON.parse(response.ExamSummary);
    res.status(200).json({ examSummary });
  } catch (error) {
    console.error("Error fetching exam summary:", error);
    res
      .status(error.status || 500)
      .json({ message: errorMap[error.code] || "Internal Server Error" });
  }
};

export const downloadMarksheet = async (req, res) => {
  const { yearSem } = req.query;
  try {
    const response = await fetchGEU("/Web_StudentAcademic/FillMarksheet", req, {
      method: "post",
      customHeaders: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: { yearSem },
    });

    const { docNo } = response;

    // Step 2: fetch PDF binary using docNo
    const pdfResponse = await fetchGEU(
      `/Web_StudentAcademic/DownloadFile?docNo=${docNo}`,
      req,
      {
        responseType: "arraybuffer", // raw bytes
        customHeaders: {
          Accept: "application/pdf",
        },
      }
    );

    // Step 3: stream it to client
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="marksheet_${yearSem}.pdf"`,
    });

    res.send(Buffer.from(pdfResponse));
  } catch (error) {
    // console.error("Error fetching exam details:", error);
    return res
      .status(error.status || 500)
      .json({ message: errorMap[error.code] || "Internal Server Error" });
  }
};

export const getBacklogs = async (req, res) => {
  try {
    const response = await fetchGEU(
      "/Web_StudentAcademic/GetStudentBackPapers",
      req,
      {
        method: "post",
      }
    );
    const parsed = JSON.parse(response._backData);

    res.status(200).json({
      backlogs: parsed,
    });
  } catch (error) {
    console.error("Error fetching exam details:", error);
    return res
      .status(error.status || 500)
      .json({ message: errorMap[error.code] || "Internal Server Error" });
  }
};

export const getAdmitCard = async (req, res) => {
  const examTypes = {
    sessional: "1",
    endTerm: "2",
    midTerm: "3",
  };

  try {
    const { examType } = req.params;
    if (!examType || !(examType in examTypes)) {
      return res.status(400).json({ message: "Invalid examType parameter" });
    }

    // prepare payload (as a plain object)
    const payload = {
      ExamType: 1, // 1:main 2:back
      MarksType: examTypes[examType],
      BackSetting: -1,
    };

    const response = await fetchGEU(
      "/Web_Exam/GetAdmitCardSlctStudentRecord",
      req,
      {
        method: "post",
        data: payload,
        customHeaders: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const parsed = JSON.parse(response?.state || "[]");
    const admitCard = Array.isArray(parsed) && parsed.length ? parsed[0] : {};

    res.status(200).json({ admitCard });
  } catch (error) {
    console.error("getAdmitCard error:", error);
    res.status(500).json({ message: "Failed to fetch admit card" });
  }
};
