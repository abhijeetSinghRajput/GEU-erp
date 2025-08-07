import Circular from "@/components/circular/Circular";
import ExamSummary from "@/components/exams/ExamSummary";
import FeeSubmitions from "@/components/exams/fees/FeeSubmitions";
import Header from "@/components/Header";
import { StudentProfile } from "@/components/profile/StudentProfile";
import AttendanceTable from "@/components/table/AttendanceTable";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <Header />
      <StudentProfile />
      <AttendanceTable />
      <Circular />
      <ExamSummary/>
      <FeeSubmitions/>
    </div>
  );
};

export default HomePage;
