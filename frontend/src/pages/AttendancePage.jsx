import { useAttendanceStore } from "@/stores/useAttendanceStore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, parse } from "date-fns";
import { Check, Circle, Clock, X } from "lucide-react";
import Header from "@/components/Header";
import TooltipWrapper from "@/components/TooltipWrapper";

const baseDate = new Date(2025, 6, 17);
const endDate = new Date(baseDate);
endDate.setMonth(baseDate.getMonth() + 1);

const AttendancePage = () => {
  const { SubjectID } = useParams();
  const {
    attendance,
    isLoadingSubjects,
    getAllAttendanceSubjects,
    getAttendanceBySubject,
  } = useAttendanceStore();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [date, setDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState(null);

  // Parse date from "dd/MM/yyyy" format to Date object
  const parseAttendanceDate = (dateString) => {
    return parse(dateString, "dd/MM/yyyy", new Date());
  };

  // Get attendance status for a specific date
  const getAttendanceForDate = (date) => {
    if (!attendanceData?.state) return null;
    const dateStr = format(date, "dd/MM/yyyy");
    return attendanceData.state.find((item) => item.AttendanceDate === dateStr);
  };

  const CustomDay = (props) => {
    const {
      day,
      modifiers,
      onClick,
      onFocus,
      onBlur,
      onKeyDown,
      onKeyUp,
      onMouseEnter,
      onMouseLeave,
    } = props;
    const { disabled, outside, hidden } = modifiers;
    const attendance = getAttendanceForDate(day.date);
    const date = day.date.getDate();

    // Base shadcn classes
    const baseClasses = "relative aspect-square h-9 w-9 p-0 text-center";
    const dayButtonClasses =
      "rdp-button rdp-day h-full w-full rounded-md font-normal focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

    // Handle outbound and disabled dates
    if (outside || disabled || hidden) {
      return (
        <td className={baseClasses}>
          <span
            className={`${dayButtonClasses} text-muted`}
            aria-disabled="true"
          >
            {date}
          </span>
        </td>
      );
    }

    if (!attendance || attendance.AttendanceType === "N/A") {
      return (
        <td className={baseClasses}>
          <button
            className={`${dayButtonClasses} hover:bg-accent hover:text-accent-foreground`}
            onClick={onClick}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            {date}
          </button>
        </td>
      );
    }

    let statusClass = "";
    let StatusIcon = null;
    let iconColor = "";
    let bgClass = "";
    let status = "";
    const detail = attendanceData.dtLecture.find(
      (lecture) => lecture.AttendanceDate === attendance.AttendanceDate
    );

    switch (attendance.AttendanceType) {
      case "P":
        statusClass = "text-primary-foreground";
        StatusIcon = Check;
        iconColor = "text-green-600";
        bgClass =
          "bg-green-600 hover:bg-green-600/90 dark:bg-green-500 dark:hover:bg-green-500/90";
        status = "Present";
        break;
      case "A":
        statusClass = "text-destructive-foreground";
        StatusIcon = X;
        iconColor = "text-red-600";
        bgClass =
          "bg-red-600 hover:bg-red-600/90 dark:bg-red-500 dark:hover:bg-red-500/90";
        status = "Absent";
        break;
      case "L":
        statusClass = "text-yellow-800";
        StatusIcon = Clock;
        iconColor = "text-yellow-600";
        bgClass =
          "bg-yellow-100 hover:bg-yellow-100/90 dark:bg-yellow-900/50 dark:hover:bg-yellow-900/60";
        status = "Leave";
        break;
      default:
        break;
    }

    return (
      <td className={baseClasses}>
        <TooltipWrapper content={`${status}${detail ? ` - ${detail.Employee}` : ""}`}>
          <button
            className={`${dayButtonClasses} ${bgClass} ${statusClass} relative`}
            onClick={onClick}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            {date}
            {StatusIcon && (
              <span
                className={`absolute -top-1 -right-1 bg-background rounded-full p-0.5 border ${iconColor}`}
              >
                <StatusIcon className="h-3 w-3" strokeWidth={3} />
              </span>
            )}
          </button>
        </TooltipWrapper>
      </td>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedSubject) return;

      const data = {
        RegID: 118128,
        // RegID: selectedSubject.RegID,
        SubjectID: selectedSubject.SubjectID,
        PeriodAssignID: selectedSubject.PeriodAssignID,
        TTID: selectedSubject.TTID,
        LectureTypeID: selectedSubject.LectureTypeID,
        DateFrom: baseDate.toISOString(),
        DateTo: endDate.toISOString(),
      };
      const result = await getAttendanceBySubject(SubjectID, data);
      setAttendanceData(result);
      console.log(data);
    };
    fetchData();
  }, [selectedSubject]);

  useEffect(() => {
    if (!attendance?.state) return;
    const { state } = attendance;
    const selected = state.find((s) => s.SubjectID === +SubjectID);
    setSelectedSubject(selected);
  }, [SubjectID, attendance, isLoadingSubjects]);

  if (isLoadingSubjects) {
    return <div>Loading attendance data...</div>;
  }

  if (!attendanceData) {
    return <div>No attendance data available</div>;
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold">
          Attendance for Subject {SubjectID}
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Total Lectures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {attendanceData.data.TotalLecture}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Present</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {attendanceData.data.Present}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Absent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {attendanceData.data.Absent}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Leave</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {attendanceData.data.Leave}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar View */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              month={baseDate}
              disabled={(date) =>
                date < new Date(2025, 6, 1) || date > new Date(2025, 7, 31)
              } // July-Aug 2025
              components={{
                Day: CustomDay,
              }}
            />
          </CardContent>
        </Card>

        {/* Detailed Attendance List */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attendanceData.dtLecture.map((lecture) => (
                <div
                  key={lecture.AttendanceID}
                  className="border rounded-lg p-4"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{lecture.Employee}</h3>
                      <p className="text-sm text-gray-500">
                        {lecture.AttendanceDate} • Period {lecture.Period}
                      </p>
                    </div>
                    <Badge
                      variant={
                        lecture.AttendanceType === "P"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {lecture.AttendanceType === "P" ? "Present" : "Absent"}
                    </Badge>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    Recorded on: {lecture.InsertDate}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttendancePage;
