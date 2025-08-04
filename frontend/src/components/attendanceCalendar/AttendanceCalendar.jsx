import { useAttendanceStore } from "@/stores/useAttendanceStore";
import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format, parse, addMonths, constructNow } from "date-fns";
import { Check, CheckCircle, Circle, Clock, X, XCircle } from "lucide-react";
import CalendarSkeleton from "./CalendarSkeleton";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const baseDate = new Date(2025, 6, 17); // July 17, 2025
const endDate = new Date(baseDate);
endDate.setMonth(baseDate.getMonth() + 1);

const AttendanceCalendar = ({ selectedSubject }) => {
  const { getAttendanceBySubject, isLoadingSubjectDetails } =
    useAttendanceStore();
  const [date, setDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(baseDate); // Track current month
  const [attendanceData, setAttendanceData] = useState(null);
  const { SubjectID, RegID, PeriodAssignID, TTID, LectureTypeID } =
    selectedSubject;

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

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedSubject) return;

      const data = {
        RegID,
        SubjectID,
        PeriodAssignID,
        TTID,
        LectureTypeID,
        DateFrom: currentMonth.toISOString(),
        DateTo: addMonths(currentMonth, 1).toISOString(),
      };
      const result = await getAttendanceBySubject(SubjectID, data);
      console.log(result);
      setAttendanceData(result);
    };
    fetchData();
  }, [selectedSubject, SubjectID, getAttendanceBySubject, currentMonth]);

  if (isLoadingSubjectDetails) {
    return <CalendarSkeleton />;
  }

  if (!attendanceData) {
    return (
      <div className="flex justify-center items-center h-64">
        No attendance data available
      </div>
    );
  }

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
    const baseClasses =
      "p-0 aspect-square flex items-center justify-center h-9 w-full rounded-md overflow-hidden";

    // Handle outbound and disabled dates
    if (outside || disabled || hidden) {
      return (
        <td className={cn("text-muted-foreground", baseClasses)}>{}</td>
      );
    }

    if (!attendance || attendance.AttendanceType === "N/A") {
      return (
        <td className={baseClasses}>
          <button
            className={`w-full h-full hover:bg-accent hover:text-accent-foreground`}
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

    const detail = attendanceData.dtLecture?.find(
      (lecture) => lecture.AttendanceDate === attendance.AttendanceDate
    );

    let statusIcon = null;
    let statusBg = "";
    
    switch (attendance.AttendanceType) {
      case "P":
        statusIcon = <CheckCircle strokeWidth={3} className="text-green-500"/>;
        statusBg="dark:bg-green-800/30 bg-green-500/30";
        break;
      case "A":
        statusIcon = <X strokeWidth={3} className="text-red-500"/>;
        statusBg="dark:bg-red-900/30 bg-red-500/30";
        break;
      case "L":
        break;
      default:
        break;
    }

    return (
      <td className={cn("relative", baseClasses)}>
        <Button
          variant="secondary"
          className={cn("w-full block", statusBg)}
          onClick={onClick}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <span className="absolute bottom-0.5 right-0.5">{statusIcon}</span>
          {date}
        </Button>
      </td>
    );
  };

  return (
    <div className="space-y-4">
      <Calendar
        classNames={"bg-input/30"}
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border w-full bg-input/30"
        month={currentMonth}
        onMonthChange={setCurrentMonth} // Update month when calendar navigation is used
        disabled={(date) =>
          date < new Date(2025, 6, 1) || date > new Date(2025, 7, 31)
        }
        components={{
          Day: CustomDay,
        }}
      />
    </div>
  );
};
