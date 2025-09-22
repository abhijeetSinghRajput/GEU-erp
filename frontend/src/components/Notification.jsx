import { useEffect, useMemo } from "react";
import { useExamStore } from "../stores/useExamStore";
import { useNoticeStore } from "../stores/useNoticeStore";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Button } from "./ui/button";
import { Ring } from "ldrs/react";
import { Bell } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "../lib/utils";

const Notification = ({ variant = "outline", className }) => {
  const { getAdmitCard, admitCards, loadingAdmitCard } = useExamStore();
  const { popupCirculars } = useNoticeStore();

  const fetchNotifications = () => {
    ["sessional", "endTerm", "midTerm"].forEach(getAdmitCard);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Prepare admit card notifications
  const admitCardItems = useMemo(() => {
    return Object.entries(admitCards)
      .filter(([_, value]) => value)
      .map(([examType, card]) => ({
        id: `admit-${examType}`,
        type: "admitCard",
        title: `Semester ${card?.YearSem}`,
        subtitle: card?.Course,
        caption: card?.Caption,
        badge: examType,
      }));
  }, [admitCards]);

  // Prepare circular notifications
  const circularItems = useMemo(() => {
    return popupCirculars.map((c) => ({
      id: `circular-${c.CirID}`,
      type: "circular",
      title: `${c.ByDepartment} Department`,
      subtitle: "",
      caption: c.Notice,
    }));
  }, [popupCirculars]);

  const notifications = [...admitCardItems, ...circularItems];
  const hasNotifications = notifications.length > 0;
  const isLoading = loadingAdmitCard;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={variant}
          size="icon"
          className={cn("relative group", className)}
        >
          <Bell className="h-5 w-5" />
          {hasNotifications && (
            <div className="absolute -top-1 -right-1 rounded-full flex justify-center items-center text-xs h-5 min-w-5 px-1 bg-red-500 border border-background group-hover:border-accent transition-colors">
              {notifications.length > 9 ? "9+" : notifications.length}
            </div>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="p-3 rounded-xl w-72">
        <h3 className="font-semibold text-primary/90 mb-3">Notifications</h3>

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Ring
              size={22}
              speed={1.4}
              stroke={2}
              color="hsl(var(--foreground))"
            />
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !hasNotifications && (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <p className="text-sm text-muted-foreground">No notifications</p>
            <Button size="sm" onClick={fetchNotifications}>
              Reload
            </Button>
          </div>
        )}

        {/* Notifications list */}
        {!isLoading && hasNotifications && (
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {notifications.map((n) => (
              <Card key={n.id} className="bg-input/30 shadow-sm">
                <CardHeader className="flex-row items-center justify-between flex-wrap gap-2 p-3 pb-0">
                  <CardTitle className="text-sm font-medium">
                    {n.title}
                  </CardTitle>
                  {n.badge && <Badge className="capitalize">{n.badge}</Badge>}
                </CardHeader>
                <CardContent className="p-3 pt-1 space-y-1">
                  {n.caption &&
                    (n.type === "circular" ? (
                      <div
                        className="text-xs text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: n.caption }}
                      />
                    ) : (
                      <div className="text-xs text-muted-foreground font-semibold">
                        {n.caption}
                      </div>
                    ))}

                  {n.subtitle && (
                    <p className="text-xs text-muted-foreground/70">
                      {n.subtitle}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Notification;
