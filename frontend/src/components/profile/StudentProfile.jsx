"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "../ui/progress";
import {
  Mail,
  Phone,
  Cake,
  School,
  BookText,
  UserCircle,
  Home,
  WalletCards,
  GraduationCap,
  XIcon,
} from "lucide-react";

import { useStudentStore } from "@/stores/useStudentStore";
import { Link } from "react-router-dom";
import ProfileSkeleton from "./ProfileSkeleton";
import { useAuthStore } from "@/stores/useAuthStore";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import ProfileError from "./ProfileError";
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

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const tabContentVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

export function StudentProfile() {
  const [activeTab, setActiveTab] = useState(0);
  const {
    student,
    isFetchingProfile,
    fetchProfile,
    errors,
    loadAvatar,
    loadingAvatar,
    avatarBlobUrl,
  } = useStudentStore();
  const { authenticated } = useAuthStore();

  useEffect(() => {
    if (authenticated) {
      fetchProfile();
      loadAvatar();
    }
  }, [authenticated]);

  const TABS = [
    { id: 0, title: "Academic", icon: <GraduationCap className="h-4 w-4" /> },
    { id: 1, title: "Education", icon: <BookText className="h-4 w-4" /> },
    { id: 2, title: "Personal", icon: <UserCircle className="h-4 w-4" /> },
  ];

  if (isFetchingProfile) {
    return <ProfileSkeleton />;
  }

  if (errors.fetchProfile || !student) {
    return (
      <ProfileError description={errors.fetchProfile} onReload={fetchProfile} />
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto px-2 sm:px-4 md:px-6 py-2">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        <motion.div variants={textVariants}>
          <Card className="overflow-hidden">
            {/* Profile Header */}
            <CardHeader className="px-8 py-6">
              <motion.div
                className="flex flex-col md:flex-row items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <MorphingDialog
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                >
                  <MorphingDialogTrigger>
                    <Avatar className="size-32">
                      <AvatarImage className="w-full h-full object-cover" src={avatarBlobUrl}/>
                      <AvatarFallback className="text-4xl text-muted-foreground">
                        {student.StudentName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </MorphingDialogTrigger>
                  <MorphingDialogContainer>
                    <MorphingDialogContent className="relative rounded-3xl" style={{
                      maxWidth: "min(100svw, 70svh)"
                    }}>
                      <img src={avatarBlobUrl}/>
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

                <div className="text-center md:text-left space-y-2">
                  <CardTitle className="text-3xl font-bold tracking-tight">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {student.StudentName}
                    </motion.div>
                  </CardTitle>
                  <motion.div
                    className="text-lg font-medium text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {student.Course}
                  </motion.div>
                  <motion.div
                    className="flex flex-wrap justify-center md:justify-start gap-2 mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Badge variant="secondary">ID: {student.StudentID}</Badge>
                    <Badge>Semester {student.YearSem}</Badge>
                    <Badge>{student.Section}</Badge>
                  </motion.div>
                </div>
              </motion.div>
            </CardHeader>

            {/* Tab Navigation */}
            <motion.div
              className="border-b bg-muted/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex p-2 gap-2 justify-center">
                {TABS.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-md px-3 py-2 text-sm font-medium flex items-center gap-2 ${
                      activeTab === tab.id
                        ? "bg-background text-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + tab.id * 0.1 }}
                  >
                    {tab.icon}
                    {tab.title}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <CardContent className="p-0">
              <ScrollArea>
                <AnimatePresence mode="wait">
                  {/* Academic Tab */}
                  {activeTab === 0 && (
                    <motion.div
                      key="academic"
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="p-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                          className="space-y-6"
                          variants={{
                            visible: {
                              transition: {
                                staggerChildren: 0.1,
                              },
                            },
                          }}
                        >
                          <motion.div variants={textVariants}>
                            <h3 className="text-sm font-medium text-muted-foreground uppercase mb-2">
                              Enrollment Details
                            </h3>
                            <dl className="space-y-4">
                              <motion.div
                                className="flex items-start"
                                variants={textVariants}
                              >
                                <dt className="w-40 flex-shrink-0 text-sm font-medium text-muted-foreground">
                                  Enrollment No
                                </dt>
                                <dd className="text-sm font-mono">
                                  {student.EnrollmentNo}
                                </dd>
                              </motion.div>
                              <motion.div
                                className="flex items-start"
                                variants={textVariants}
                              >
                                <dt className="w-40 flex-shrink-0 text-sm font-medium text-muted-foreground">
                                  University Roll No
                                </dt>
                                <dd className="text-s font-mono">
                                  {student.PRollNo}
                                </dd>
                              </motion.div>

                              <motion.div
                                className="flex items-start"
                                variants={textVariants}
                              >
                                <dt className="w-40 flex-shrink-0 text-sm font-medium text-muted-foreground">
                                  Registration Id
                                </dt>
                                <dd className="text-s font-mono">
                                  {student.RegID}
                                </dd>
                              </motion.div>
                            </dl>
                          </motion.div>
                        </motion.div>

                        <motion.div
                          className="space-y-6"
                          variants={{
                            visible: {
                              transition: {
                                staggerChildren: 0.1,
                                delayChildren: 0.2,
                              },
                            },
                          }}
                        >
                          <motion.div variants={textVariants}>
                            <h3 className="text-sm font-medium text-muted-foreground uppercase mb-2">
                              Contact Information
                            </h3>
                            <dl className="space-y-4">
                              <motion.div
                                className="flex items-start"
                                variants={textVariants}
                              >
                                <dt className="w-40 flex-shrink-0 text-sm font-medium text-muted-foreground">
                                  Personal Email
                                </dt>
                                <dd className="text-sm">
                                  <Link
                                    href={`mailto:${student.Email}`}
                                    className="text-primary hover:underline"
                                  >
                                    {student.Email}
                                  </Link>
                                </dd>
                              </motion.div>
                              <motion.div
                                className="flex items-start"
                                variants={textVariants}
                              >
                                <dt className="w-40 flex-shrink-0 text-sm font-medium text-muted-foreground">
                                  University Email
                                </dt>
                                <dd className="text-sm">
                                  <Link
                                    href={`mailto:${student.OfficialMailID}`}
                                    className="text-primary hover:underline"
                                  >
                                    {student.OfficialMailID}
                                  </Link>
                                </dd>
                              </motion.div>
                            </dl>
                          </motion.div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {/* Education Tab */}
                  {activeTab === 1 && (
                    <motion.div
                      key="education"
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="p-8"
                    >
                      <div className="space-y-8">
                        <motion.div variants={textVariants}>
                          <h3 className="text-sm font-medium text-muted-foreground uppercase mb-4">
                            Academic Performance
                          </h3>
                          <div className="space-y-6">
                            <motion.div variants={textVariants}>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">
                                  10th Grade
                                </span>
                                <span className="text-sm font-medium">
                                  {student["10"]}%
                                </span>
                              </div>
                              <Progress value={student["10"]} />
                            </motion.div>

                            <motion.div variants={textVariants}>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">
                                  12th Grade
                                </span>
                                <span className="text-sm font-medium">
                                  {student["10+2"]}%
                                </span>
                              </div>
                              <Progress value={student["10+2"]} />
                            </motion.div>

                            <motion.div variants={textVariants}>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">
                                  Graduation
                                </span>
                                <span className="text-sm font-medium">
                                  {student.Graduation}%
                                </span>
                              </div>
                              <Progress value={student.Graduation} />
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {/* Personal Tab */}
                  {activeTab === 2 && (
                    <motion.div
                      key="personal"
                      variants={tabContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="p-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                          className="space-y-6"
                          variants={{
                            visible: {
                              transition: {
                                staggerChildren: 0.1,
                              },
                            },
                          }}
                        >
                          <motion.div variants={textVariants}>
                            <h3 className="text-sm font-medium text-muted-foreground uppercase mb-4">
                              Personal Details
                            </h3>
                            <dl className="space-y-4">
                              <motion.div
                                className="flex items-start"
                                variants={textVariants}
                              >
                                <dt className="w-40 flex-shrink-0 text-sm font-medium text-muted-foreground">
                                  <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    Mobile
                                  </div>
                                </dt>
                                <dd className="text-sm">{student.MobileNO}</dd>
                              </motion.div>

                              {student.AlternateMobileNO && (
                                <motion.div
                                  className="flex items-start"
                                  variants={textVariants}
                                >
                                  <dt className="w-40 flex-shrink-0 text-sm font-medium text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                      <Phone className="h-4 w-4" />
                                      Alternate Mobile
                                    </div>
                                  </dt>
                                  <dd className="text-sm">
                                    {student.AlternateMobileNO}
                                  </dd>
                                </motion.div>
                              )}

                              <motion.div
                                className="flex items-start"
                                variants={textVariants}
                              >
                                <dt className="w-40 flex-shrink-0 text-sm font-medium text-muted-foreground">
                                  <div className="flex items-center gap-2">
                                    <Cake className="h-4 w-4" />
                                    Date of Birth
                                  </div>
                                </dt>
                                <dd className="text-sm">{student.DOB}</dd>
                              </motion.div>

                              <motion.div
                                className="flex items-start"
                                variants={textVariants}
                              >
                                <dt className="w-40 flex-shrink-0 text-sm font-medium text-muted-foreground">
                                  <div className="flex items-center gap-2">
                                    <WalletCards className="h-4 w-4" />
                                    ABC Account
                                  </div>
                                </dt>
                                <dd className="text-sm">
                                  {student.ABCAccountNo}
                                </dd>
                              </motion.div>

                              <motion.div
                                className="flex items-start"
                                variants={textVariants}
                              >
                                <dt className="w-40 flex-shrink-0 text-sm font-medium text-muted-foreground">
                                  <div className="flex items-center gap-2">
                                    <Home className="h-4 w-4" />
                                    Address
                                  </div>
                                </dt>
                                <dd className="text-sm">{student.PAddress}</dd>
                              </motion.div>
                            </dl>
                          </motion.div>
                        </motion.div>

                        <motion.div
                          className="space-y-6"
                          variants={{
                            visible: {
                              transition: {
                                staggerChildren: 0.1,
                                delayChildren: 0.2,
                              },
                            },
                          }}
                        >
                          <motion.div variants={textVariants}>
                            <h3 className="text-sm font-medium text-muted-foreground uppercase mb-4">
                              Family Details
                            </h3>
                            <dl className="space-y-4">
                              <motion.div
                                className="flex items-start"
                                variants={textVariants}
                              >
                                <dt className="w-40 flex-shrink-0 text-sm font-medium text-muted-foreground">
                                  Father's Name
                                </dt>
                                <dd className="text-sm">
                                  {student.FatherHusName}
                                </dd>
                              </motion.div>

                              <motion.div
                                className="flex items-start"
                                variants={textVariants}
                              >
                                <dt className="w-40 flex-shrink-0 text-sm font-medium text-muted-foreground">
                                  Father's Mobile
                                </dt>
                                <dd className="text-sm">{student.FMobileNo}</dd>
                              </motion.div>

                              <motion.div
                                className="flex items-start"
                                variants={textVariants}
                              >
                                <dt className="w-40 flex-shrink-0 text-sm font-medium text-muted-foreground">
                                  Mother's Name
                                </dt>
                                <dd className="text-sm">
                                  {student.MotherName}
                                </dd>
                              </motion.div>
                            </dl>
                          </motion.div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
