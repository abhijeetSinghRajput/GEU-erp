import Circular from "@/components/circular/Circular";
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
    </div>
  );
};

export default HomePage;
