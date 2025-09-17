import { useEffect } from "react";
import { useExamStore } from "../stores/useExamStore";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Ring, Ring2 } from "ldrs/react";
import { Bell, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "../lib/utils";

const AdmitCard = ({ variant = "outline", className }) => {
  const { getAdmitCard, admitCards, loadingAdmitCard } = useExamStore();

  const pingAdmitCard = () => {
    ["sessional", "endTerm", "midTerm"].forEach(getAdmitCard);
  };

  useEffect(() => {
    pingAdmitCard();
  }, []);

  const filteredAdmitCard = Object.fromEntries(
    Object.entries(admitCards).filter(([_, value]) => value)
  );

  const hasCards = Object.keys(filteredAdmitCard).length > 0;

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant={variant}
          size="icon"
          className={cn("relative group", className)}
        >
          <div className="relative">
            <Bell />
            {hasCards && (
              <span className="rounded-full border group-hover:border-accent transition-colors absolute top-0 right-0 border-background size-2 bg-red-500" />
            )}
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="p-2 rounded-xl w-64">
        <h3 className="font-medium capitalize mb-2 text-primary/90">
          Admit Card
        </h3>

        {/* --- Loading state --- */}
        {loadingAdmitCard && (
          <div className="flex items-center justify-center py-6">
            <Ring
              size={20}
              speed={1.5}
              stroke={2}
              color="hsl(var(--foreground))"
            />
          </div>
        )}

        {/* --- Empty state --- */}
        {!loadingAdmitCard && !hasCards && (
          <div className="flex flex-col items-center gap-3 py-6">
            <p className="text-sm text-muted-foreground">
              No admit card available
            </p>
            <Button size="sm" onClick={pingAdmitCard}>
              Reload
            </Button>
          </div>
        )}

        {/* --- Admit cards list --- */}
        {!loadingAdmitCard && hasCards && (
          <div className="space-y-2">
            {Object.entries(filteredAdmitCard).map(([examType, admitCard]) => (
              <Card key={examType} className="bg-input/30 shadow-SM">
                <CardHeader className="flex-row gap-2 justify-between items-center mb-2 p-3 pb-0">
                  <CardTitle className="text-sm">
                    Semester {admitCard?.YearSem}
                  </CardTitle>
                  <Badge>{examType}</Badge>
                </CardHeader>
                <CardContent className="p-3 pt-1 space-y-1">
                  <p className="text-muted-foreground text-xs font-semibold">
                    {admitCard?.Caption}
                  </p>
                  <p className="text-muted-foreground/60 text-xs">
                    {admitCard?.Course}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default AdmitCard;
