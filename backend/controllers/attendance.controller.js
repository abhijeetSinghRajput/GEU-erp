import { fetchGEU } from "../utils/geuApi.js";
import {errorMap} from "../constants/error.js";

import qs from "qs";

export const getAllAttendanceSubjects = async (req, res) => {
  const {RegID} = req.query;
  if(!RegID) return res.status(400).json({message: "RegId required"});
  
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
    res.status(error.status || 500).json({ message: errorMap[error.code] || "Failed to fetch attendance subjects" });
  }
};


export const getAttendanceBySubject = async (req, res) => {
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
    res.status(error.status || 500).json({
      message: errorMap[error.code] || "Failed to fetch attendance details by subject",
    });
  }
};