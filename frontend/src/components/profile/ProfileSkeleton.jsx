"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Phone,
  Cake,
  BookText,
  UserCircle,
  Home,
  WalletCards,
  GraduationCap,
} from "lucide-react";
import { useStudentStore } from "@/stores/useStudentStore";
import { Skeleton } from "../ui/skeleton";

const ProfileSkeleton = () => {
  const { student } = useStudentStore();
  const [activeTab, setActiveTab] = useState(0);

  const TABS = [
    { id: 0, title: "Academic", icon: <GraduationCap className="h-4 w-4" /> },
    { id: 1, title: "Education", icon: <BookText className="h-4 w-4" /> },
    { id: 2, title: "Personal", icon: <UserCircle className="h-4 w-4" /> },
  ];

  return (
    <div className="max-w-screen-lg mx-auto px-2 sm:px-4 md:px-6 py-2">
      <Card className="overflow-hidden">
        {/* Profile Header */}
        <CardHeader className="px-8 py-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="size-32 rounded-full overflow-hidden animate-pulse">
              <img src="/avatar.svg" className="opacity-20" />
            </div>

            <div className="text-center md:text-left space-y-2">
              <CardTitle className="text-3xl font-bold tracking-tight">
                <Skeleton className="h-9" />
              </CardTitle>
              <div className="text-lg font-medium text-muted-foreground">
                <Skeleton className="h-6 w-[250px]" />
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-5 w-12" />
              </div>
            </div>
          </div>
        </CardHeader>

        {/* Tab Navigation */}
        <div className="border-b bg-muted/40">
          <div className="flex p-2 gap-2 justify-center">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-md px-3 py-2 text-sm font-medium flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-background text-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {tab.icon}
                {tab.title}
              </button>
            ))}
          </div>
        </div>

        <CardContent className="p-0">
          {/* Academic Tab */}
          {activeTab === 0 && (
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground uppercase mb-2">
                      Enrollment Details
                    </h3>
                    <dl className="space-y-4">
                      <div className="flex items-start">
                        <dt className="w-40 flex-shrink-0 text-sm font-medium text-muted-foreground">
                          Enrollment No
                        </dt>
                        <dd className="text-sm font-mono">
                          <Skeleton className="h-5 w-24" />
                        </dd>
                      </div>
                      <div className="flex items-start">
                        <dt className="w-40 flex-shrink-0 text-sm font-medium text-muted-foreground">
                          University Roll No
                        </dt>
                        <dd className="text-s font-mono">
                          <Skeleton className="h-5 w-24" />
                        </dd>
                      </div>
                      <div className="flex items-start">
                        <dt className="w-40 flex-shrink-0 text-sm font-medium text-muted-foreground">
                          Registration Id
                        </dt>
                        <dd className="text-s font-mono">
                          <Skeleton className="h-5 w-24" />
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground uppercase mb-2">
                      Contact Information
                    </h3>
                    <dl className="space-y-4">
                      <div className="flex items-start">
                        <dt className="w-40 flex-shrink-0 text-sm font-medium text-muted-foreground">
                          Personal Email
                        </dt>
                        <dd className="text-sm">
                          <Skeleton className="h-5 w-[200px]" />
                        </dd>
                      </div>
                      <div className="flex items-start">
                        <dt className="w-40 flex-shrink-0 text-sm font-medium text-muted-foreground">
                          University Email
                        </dt>
                        <dd className="text-sm">
                          <Skeleton className="h-5 w-[150px]" />
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Education Tab */}
          {activeTab === 1 && (
            <div className="p-8">
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase mb-4">
                    Academic Performance
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">10th Grade</span>
                        <span className="text-sm font-medium">
                          <Skeleton className="h-5 w-12" />
                        </span>
                      </div>
                      <Skeleton className={"w-full h-2"} />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">12th Grade</span>
                        <span className="text-sm font-medium">
                          <Skeleton className="h-5 w-12" />
                        </span>
                      </div>
                      <Skeleton className={"w-full h-2"} />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Graduation</span>
                        <span className="text-sm font-medium">
                          <Skeleton className="h-5 w-12" />
                        </span>
                      </div>
                      <Skeleton className={"w-full h-2"} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Personal Tab */}
          {activeTab === 2 && (
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground uppercase mb-4">
                      Personal Details
                    </h3>
                    <dl className="space-y-4">
                      <div className="flex items-start">
                        <dt className="w-40 flex-shrink-0 text-sm font-medium text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            Mobile
                          </div>
                        </dt>
                        <Skeleton className="h-5 w-20" />
                      </div>

                      <div className="flex items-start">
                        <dt className="w-40 flex-shrink-0 text-sm font-medium text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Cake className="h-4 w-4" />
                            Date of Birth
                          </div>
                        </dt>
                        <Skeleton className="h-5 w-20" />
                      </div>

                      <div className="flex items-start">
                        <dt className="w-40 flex-shrink-0 text-sm font-medium text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <WalletCards className="h-4 w-4" />
                            ABC Account
                          </div>
                        </dt>
                        <Skeleton className="h-5 w-24" />
                      </div>

                      <div className="flex items-start">
                        <dt className="w-40 flex-shrink-0 text-sm font-medium text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Home className="h-4 w-4" />
                            Address
                          </div>
                        </dt>
                        <div className="space-y-1 w-full">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-1/2 max-w-52" />
                        </div>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground uppercase mb-4">
                      Family Details
                    </h3>
                    <dl className="space-y-4">
                      <div className="flex items-start">
                        <dt className="w-40 flex-shrink-0 text-sm font-medium text-muted-foreground">
                          Father's Name
                        </dt>
                        <Skeleton className="h-5 w-20" />
                      </div>

                      <div className="flex items-start">
                        <dt className="w-40 flex-shrink-0 text-sm font-medium text-muted-foreground">
                          Father's Mobile
                        </dt>
                        <Skeleton className="h-5 w-20" />
                      </div>

                      <div className="flex items-start">
                        <dt className="w-40 flex-shrink-0 text-sm font-medium text-muted-foreground">
                          Mother's Name
                        </dt>
                        <Skeleton className="h-5 w-20" />
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSkeleton;
