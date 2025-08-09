import { fetchGEU } from "../utils/geuApi.js";
import {errorMap} from "../constants/error.js";

import qs from "qs";

export const getAllAttendanceSubjects = async (req, res) => {
  const {RegID} = req.query;
  if(!RegID) res.status(400).json({message: "RegId required"});
  try {
    const result = await fetchGEU("/Web_StudentAcademic/GetSubjectDetailStudentAcademicFromLive", req, {
      customHeaders: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      data: qs.stringify({ RegID }), 
    });
    
    const state = JSON.parse(result.state || "[]");
    const data = JSON.parse(result.data || "[]");

    res.json({ state, data });
  } catch (error) {
    res.status(500).json({ message: errorMap[error.code] || "Failed to fetch attendance subjects" });
  }
};


export const getAttendanceBySubject = async (req, res) => {
  console.log("getAttendanceBySubject");
  const { SubjectID } = req.params;
  
  if (!SubjectID) return res.status(400).json({ message: "SubjectID required" });
  
  const payload = {
    SubjectID,
    RegID: req.body.RegID || 0,
    PeriodAssignID: req.body.PeriodAssignID,
    TTID: req.body.TTID,
    LectureTypeID: req.body.LectureTypeID,
    DateFrom: req.body.DateFrom,
    DateTo: req.body.DateTo,
  };

  try {
    const result = await fetchGEU("/Web_StudentAcademic/FillAttendanceDetail_ostulgn", req, {
      customHeaders: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      data: qs.stringify(payload),
    });

    const state = JSON.parse(result.state || "[]");
    const data = JSON.parse(result.data || "[]")[0] || {};
    const dtLecture = JSON.parse(result.dtLecture || "[]");

    res.status(200).json({ state, data, dtLecture });
  } catch (error) {
    res.status(500).json({
      message: errorMap[error.code] || "Failed to fetch attendance details by subject",
    });
  }
};



export const attendanceDates = async (req, res) => {
  console.log("attendanceDates");
  try {
    const data = await fetchGEU("/Web_StudentAcademic/FillDates", req, {
      customHeaders: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      data: "id=Attendance",
      referer: "https://student.geu.ac.in/Web_StudentAcademic/Cyborg_StudentAttendanceAcademic?id=Attendance",
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: errorMap[error.code] || "Failed to fetch attendance dates" });
  }
};

export const getAttendanceTable = async (req, res) => {
  console.log("getAttendanceTable");
  const { subjectCode, startDate, endDate } = req.params;
  try {
    const data = await fetchGEU("/Web_StudentAcademic/GetStudentAttendanceDetail", req, {
      customHeaders: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Requested-With": "XMLHttpRequest",
      },
      data: `id=Attendance&SubjectCode=${subjectCode}&StartDate=${startDate}&EndDate=${endDate}`,
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: errorMap[error] || "Failed to fetch attendance data" });
  }
};

// 🔥 NEW: Full Attendance Data — Dates, Subjects, and Tables
export const getFullAttendance = async (req, res) => {
  console.log("getFullAttendance");
  const { startDate, endDate } = req.params;

  try {
    // 1. Fetch subject list
    const subjects = await fetchGEU("/Web_StudentAcademic/GetSubjectDetailStudentAcademicFromLive", req, {
      customHeaders: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: "id=Attendance",
    });

    // 2. For each subject, fetch its attendance table
    const tableData = await Promise.all(
      subjects.map(async (subject) => {
        const { SubjectCode } = subject;
        try {
          const detail = await fetchGEU("/Web_StudentAcademic/GetStudentAttendanceDetail", req, {
            customHeaders: {
              "Content-Type": "application/x-www-form-urlencoded",
              "X-Requested-With": "XMLHttpRequest",
            },
            data: `id=Attendance&SubjectCode=${SubjectCode}&StartDate=${startDate}&EndDate=${endDate}`,
          });
          return { ...subject, attendance: detail };
        } catch (error) {
          return { ...subject, error: "Failed to fetch attendance" };
        }
      })
    );

    res.json({
      range: { startDate, endDate },
      totalSubjects: subjects.length,
      subjects: tableData,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch full attendance" });
  }
};


export const fetchCourseAttendance = async (req, res) => {
  console.log("fetchCourseAttendance");
  try {
    const {
      RegID,
      SubjectID,
      PeriodAssignID,
      TTID,
      LectureTypeID,
      DateFrom,
      DateTo,
    } = req.body;

    if (!RegID || !SubjectID || !DateFrom || !DateTo) {
      return res.status(400).json({ message: "Missing required parameters." });
    }

    const result = await fetchGEU("/Web_StudentAcademic/FillAttendanceDetail_ostulgn", req, {
      customHeaders: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      data: qs.stringify({
        RegID,
        SubjectID,
        PeriodAssignID,
        TTID,
        LectureTypeID,
        DateFrom,
        DateTo,
      }),
      referer: "https://student.geu.ac.in/Web_StudentAcademic/Cyborg_StudentAttendanceDetail",
    });

    console.log("📚 Course Attendance Result →", result);

    const state = JSON.parse(result.state || "[]");
    const data = JSON.parse(result.data || "[]");
    const dtLecture = JSON.parse(result.dtLecture || "[]");

    res.json({ state, data, dtLecture });
  } catch (error) {
    console.error("❌ Error fetching course attendance:", err.message);
    res.status(500).json({ message: errorMap[error.code] || "Failed to fetch course attendance" });
  }
};
