import { Server } from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "../../lib/utils";

const APIEndpointsSection = () => (
  <section id="api" className="space-y-6">
    <div className="flex items-center gap-3">
      <Server className="w-6 h-6 text-primary flex-shrink-0" />
      <h3>API Endpoints & GEU Integration</h3>
    </div>

    <div className="space-y-6">
      {[
        {
          category: "Authentication",
          color: "border-blue-200 dark:border-blue-800",
          bgColor: "bg-blue-50 dark:bg-blue-950/20",
          endpoints: [
            {
              method: "GET",
              path: "/api/auth/captcha",
              desc: "Get login captcha and initialize session",
            },
            {
              method: "POST",
              path: "/api/auth/login",
              desc: "Authenticate with GEU credentials",
            },
            {
              method: "GET",
              path: "/api/auth/check",
              desc: "Verify current session status",
            },
            {
              method: "POST",
              path: "/api/auth/logout",
              desc: "Clear session and logout",
            },
          ],
        },
        {
          category: "Profile Management",
          color: "border-green-200 dark:border-green-800",
          bgColor: "bg-green-50 dark:bg-green-950/20",
          endpoints: [
            {
              method: "GET",
              path: "/api/profile",
              desc: "Get student profile information",
            },
            {
              method: "GET",
              path: "/api/profile/avatar",
              desc: "Stream profile image",
            },
            {
              method: "POST",
              path: "/api/profile/avatar",
              desc: "Update profile image",
            },
            {
              method: "GET",
              path: "/api/profile/id-card",
              desc: "Get digital ID card data",
            },
          ],
        },
        {
          category: "Academic Data",
          color: "border-purple-200 dark:border-purple-800",
          bgColor: "bg-purple-50 dark:bg-purple-950/20",
          endpoints: [
            {
              method: "GET",
              path: "/api/attendance/subjects",
              desc: "Get all subjects with attendance",
            },
            {
              method: "GET",
              path: "/api/attendance/:subjectId",
              desc: "Get detailed attendance for subject",
            },
            {
              method: "GET",
              path: "/api/exam/summary",
              desc: "Get exam results summary",
            },
            {
              method: "GET",
              path: "/api/exam/backlogs",
              desc: "Get backlog subjects",
            },
          ],
        },
        {
          category: "Notices & Finance",
          color: "border-orange-200 dark:border-orange-800",
          bgColor: "bg-orange-50 dark:bg-orange-950/20",
          endpoints: [
            {
              method: "GET",
              path: "/api/circulars",
              desc: "Get latest notices and circulars",
            },
            {
              method: "GET",
              path: "/api/fee/submissions",
              desc: "Get fee payment history",
            },
            {
              method: "GET",
              path: "/api/fee/receipts",
              desc: "Get fee receipt list",
            },
            {
              method: "GET",
              path: "/api/fee/download",
              desc: "Download fee receipt PDF",
            },
          ],
        },
      ].map((category, idx) => (
        <div
          key={idx}
          className={`bg-card p-4 sm:p-6 rounded-lg border`}
        >
          <h4 className="font-semibold mb-4">{category.category}</h4>
          <div className="space-y-3">
            {category.endpoints.map((endpoint, endIdx) => (
              <div key={endIdx} className="bg-input/30 p-3 rounded-md">
                <div className="flex items-center gap-3 mb-2">
                  <Badge
                    className={cn(
                      endpoint.method === "GET"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    )}
                  >
                    {endpoint.method}
                  </Badge>

                  <code className="text-sm font-mono">{endpoint.path}</code>
                </div>
                <p className="text-sm text-muted-foreground">{endpoint.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default APIEndpointsSection;
