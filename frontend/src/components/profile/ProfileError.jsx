"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";

const ProfileError = ({
  heading = "Something went wrong",
  description,
  onReload,
}) => {
  return (
    <div className="max-w-screen-lg mx-auto px-4 sm:px-6 md:px-4 py-2">
      <Card className="relative overflow-hidden bg-destructive/10">
        <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
          <div className="text-center space-y-4">
            <AlertTriangle className="h-12 w-12 mx-auto text-destructive" />
            <h3 className="text-3xl font-medium text-destructive">{heading}</h3>
            <p className="max-w-[380px] text-destructive">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi
              molestias soluta animi totam.
            </p>
            {onReload && (
              <Button onClick={onReload} className="mt-4 gap-2">
                <RefreshCw />
                Retry
              </Button>
            )}
          </div>
        </div>

        {/* Profile Header */}
        <CardHeader className="px-8 py-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Skeleton className="animate-none bg-destructive/30 size-24 rounded-full" />

            <div className="text-center md:text-left space-y-2">
              <CardTitle className="text-3xl font-bold tracking-tight">
                <Skeleton className="animate-none bg-destructive/30 h-9" />
              </CardTitle>
              <div className="text-lg font-medium text-muted-foreground">
                <Skeleton className="animate-none bg-destructive/30 h-6 w-[250px]" />
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                <Skeleton className="animate-none bg-destructive/30 h-5 w-12" />
                <Skeleton className="animate-none bg-destructive/30 h-5 w-12" />
                <Skeleton className="animate-none bg-destructive/30 h-5 w-12" />
              </div>
            </div>
          </div>
        </CardHeader>

        {/* Tab Navigation */}
        <div className="border-b bg-destructive/10">
          <div className="flex p-2 gap-2 justify-center">
            <Skeleton
              className={"animate-none w-full max-w-28 h-8 bg-destructive/30"}
            />
            <Skeleton
              className={"animate-none w-full max-w-28 h-8 bg-destructive/30"}
            />
            <Skeleton
              className={"animate-none w-full max-w-28 h-8 bg-destructive/30"}
            />
          </div>
        </div>

        <CardContent className="p-0">
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <Skeleton className="animate-none w-[150px] h-6 bg-destructive/30 mb-2" />
                  <dl className="space-y-4">
                    <div className="flex items-start">
                      <dt className="w-40 flex-shrink-0 text-sm font-medium text-muted-foreground">
                        Enrollment No
                      </dt>
                      <dd className="text-sm font-mono">
                        <Skeleton className="animate-none bg-destructive/30 h-5 w-24" />
                      </dd>
                    </div>
                    <div className="flex items-start">
                      <dt className="w-40 flex-shrink-0 text-sm font-medium text-muted-foreground">
                        University Roll No
                      </dt>
                      <dd className="text-s font-mono">
                        <Skeleton className="animate-none bg-destructive/30 h-5 w-24" />
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <Skeleton className="animate-none w-[150px] h-6 bg-destructive/30 mb-2" />
                  <dl className="space-y-4">
                    <div className="flex items-start">
                      <dt className="w-40 flex-shrink-0 text-sm font-medium text-muted-foreground">
                        Personal Email
                      </dt>
                      <dd className="text-sm">
                        <Skeleton className="animate-none bg-destructive/30 h-5 w-[200px]" />
                      </dd>
                    </div>
                    <div className="flex items-start">
                      <dt className="w-40 flex-shrink-0 text-sm font-medium text-muted-foreground">
                        University Email
                      </dt>
                      <dd className="text-sm">
                        <Skeleton className="animate-none bg-destructive/30 h-5 w-[150px]" />
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileError;
