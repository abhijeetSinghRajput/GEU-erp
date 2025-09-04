import React from "react";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogTitle,
  MorphingDialogSubtitle,
  MorphingDialogImage,
} from "../../../components/motion-primitives/morphing-dialog";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useStudentStore } from "../../stores/useStudentStore";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import IdCard from "./IdCard";
import { XIcon } from "lucide-react";

const ProfileDialog = () => {
  const { student, loadingAvatar, avatarBlobUrl } = useStudentStore();

  return (
    <MorphingDialog
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <MorphingDialogTrigger>
        {loadingAvatar ? (
          <Skeleton className={"size-32 rounded-full"} />
        ) : (
          <Avatar className="size-32">
            <AvatarImage
              className="w-full h-full object-cover"
              src={avatarBlobUrl}
            />
            <AvatarFallback className="text-4xl text-muted-foreground">
              {student.StudentName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent
          className="relative rounded-none"
          style={{
            maxWidth: "min(100svw, 70svh)",
          }}
        >
          <ScrollArea>
            {/* <img src={avatarBlobUrl} /> */}
            <IdCard />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed right-6 top-6 h-fit w-fit rounded-full bg-white p-1"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.1 },
            },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-500" />
        </MorphingDialogClose>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
};

export default ProfileDialog;
