import { useEffect } from "react";
import { useExamStore } from "../stores/useExamStore";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Bell } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const AdmitCard = () => {
  const { getAdmitCard, admitCards } = useExamStore();
  useEffect(() => {
    getAdmitCard("sessional");
    getAdmitCard("endTerm");
    getAdmitCard("midTerm");
  }, []);
  console.log("Admit Cards:", admitCards);

  const filteredAdmitCard = Object.entries(admitCards || {})
    ?.filter(([key, value]) => Object.keys(value || {}).length !== 0)
    ?.map(([key, value]) => value);

  const notifications = {
    admitCard: filteredAdmitCard,
  };
  console.log("Notifications:", notifications);

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="ghost" size="icon" className="relative group">
          <div className="relative">
            <Bell />
            {notifications?.admitCard?.length > 0 && (
              <span className="rounded-full border group-hover:border-accent transition-colors absolute top-0 right-0  border-background size-2 bg-red-500" />
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        {Object.entries(notifications).map(([key, value]) => (
          <div>
            <h3 className="font-medium capitalize mb-1">{key}</h3>
            {value.map((item, index) => (
              <Card key={index} className="bg-input/50 shadow-md">
                <CardHeader className="p-3 pb-0">
                  <CardTitle>Semester {item?.YearSem}</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-1">
                  <p className="text-muted-foreground text-xs font-semibold">
                    {item?.Caption}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default AdmitCard;
