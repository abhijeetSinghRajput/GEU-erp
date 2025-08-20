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

export const getExamDetails = async (req, res) => {
  const { yearSem } = req.query;
  try {
    const response = await fetchGEU("/Web_StudentAcademic/FillMarksheet", req, {
      method: "post",
      customHeaders: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: { yearSem },
    });

    res.status(200).json({ ...response });
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
