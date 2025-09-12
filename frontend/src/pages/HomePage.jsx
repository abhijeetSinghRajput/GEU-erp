import Circular from "@/components/circular/Circular";
import ExamSummary from "@/components/exams/ExamSummary";
import FeeSubmissions from "@/components/fees/FeeSubmitions";
import Header from "@/components/Header";
import { StudentProfile } from "@/components/profile/StudentProfile";
import AttendanceTable from "@/components/table/AttendanceTable";
import { Loader2, LogOut } from "lucide-react";
import { Button } from "../components/ui/button";
import TooltipWrapper from "../components/TooltipWrapper";
import { useAuthStore } from "../stores/useAuthStore";

const HomePage = () => {
  const { logout, loginingOut, authenticated } = useAuthStore();
  return (
    <div>
      <Header>
        {authenticated && (
          <TooltipWrapper content="Logout account">
            <Button
              variant="ghost"
              disabled={loginingOut}
              onClick={logout}
              className="size-8"
            >
              {loginingOut ? <Loader2 className="animate-spin" /> : <LogOut />}
            </Button>
          </TooltipWrapper>
        )}
      </Header>
      <div className="space-y-6">
        <StudentProfile />
        <AttendanceTable />
        <Circular />
        <ExamSummary />
        <FeeSubmissions />
      </div>
    </div>
  );
};

export default HomePage;
