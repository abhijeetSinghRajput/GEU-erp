import { fetchGEU } from "../utils/geuApi.js";
import qs from "qs";

export const attendanceSubjects = async (req, res) => {
  const {RegID} = req.query;
  if(!RegID) res.status(400).json({message: "RegId required"});
  try {
    const result = await fetchGEU("/Web_StudentAcademic/GetSubjectDetailStudentAcademicFromLive", {
      customHeaders: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      data: qs.stringify({ RegID }), 
    });

    const state = JSON.parse(result.state || "[]");
    const data = JSON.parse(result.data || "[]");

    res.json({ state, data });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch attendance subjects", error: err.message });
  }
};




export const attendanceDates = async (req, res) => {
  try {
    const data = await fetchGEU("/Web_StudentAcademic/FillDates", {
      customHeaders: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      data: "id=Attendance",
      referer: "https://student.geu.ac.in/Web_StudentAcademic/Cyborg_StudentAttendanceAcademic?id=Attendance",
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch attendance dates", error: err.message });
  }
};

export const getAttendanceTable = async (req, res) => {
  const { subjectCode, startDate, endDate } = req.params;
  try {
    const data = await fetchGEU("/Web_StudentAcademic/GetStudentAttendanceDetail", {
      customHeaders: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Requested-With": "XMLHttpRequest",
      },
      data: `id=Attendance&SubjectCode=${subjectCode}&StartDate=${startDate}&EndDate=${endDate}`,
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch attendance data", error: err.message });
  }
};

// 🔥 NEW: Full Attendance Data — Dates, Subjects, and Tables
export const getFullAttendance = async (req, res) => {
  const { startDate, endDate } = req.params;

  try {
    // 1. Fetch subject list
    const subjects = await fetchGEU("/Web_StudentAcademic/GetSubjectDetailStudentAcademicFromLive", {
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
          const detail = await fetchGEU("/Web_StudentAcademic/GetStudentAttendanceDetail", {
            customHeaders: {
              "Content-Type": "application/x-www-form-urlencoded",
              "X-Requested-With": "XMLHttpRequest",
            },
            data: `id=Attendance&SubjectCode=${SubjectCode}&StartDate=${startDate}&EndDate=${endDate}`,
          });
          return { ...subject, attendance: detail };
        } catch (err) {
          return { ...subject, error: "Failed to fetch attendance" };
        }
      })
    );

    res.json({
      range: { startDate, endDate },
      totalSubjects: subjects.length,
      subjects: tableData,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch full attendance", error: err.message });
  }
};


export const fetchCourseAttendance = async (req, res) => {
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

    const result = await fetchGEU("/Web_StudentAcademic/FillAttendanceDetail_ostulgn", {
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
  } catch (err) {
    console.error("❌ Error fetching course attendance:", err.message);
    res.status(500).json({ message: "Failed to fetch course attendance", error: err.message });
  }
};
