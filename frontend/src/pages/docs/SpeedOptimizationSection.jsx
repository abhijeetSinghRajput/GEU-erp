import { ArrowRight, Clock, Zap } from "lucide-react";
import React from "react";
import { CodeBlock } from "../../components/ui/code-block";

const SpeedOptimizationSection = () => (
  <section id="speed" className="space-y-6">
    <div className="flex items-center gap-3">
      <Zap className="w-6 h-6 text-primary" />
      <h3>Why We're Faster Than Official GEU Website</h3>
    </div>

    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 p-4 sm:p-6 rounded-lg border">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Performance Optimizations
        </h4>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium mb-2">Frontend Optimizations</h5>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-start gap-2">
                <ArrowRight className="w-3 h-3 mt-1 text-primary" />
                <span>
                  <strong>Single Page Application:</strong> No page reloads for
                  core modules [Profile, Attendance, Notices, Exam, Fee]
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-3 h-3 mt-1 text-primary" />
                <span>
                  <strong>Priority-Based Loading:</strong> Critical data loads
                  first, secondary data in background
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-3 h-3 mt-1 text-primary" />
                <span>
                  <strong>Component-Level Caching:</strong> Avoid redundant API
                  calls with intelligent state management
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-3 h-3 mt-1 text-primary" />
                <span>
                  <strong>Modular UI:</strong> Drawers, dialogs, and tabs
                  eliminate navigation overhead
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-medium mb-2">Backend Optimizations</h5>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-start gap-2">
                <ArrowRight className="w-3 h-3 mt-1 text-primary" />
                <span>
                  <strong>Persistent Sessions:</strong> Maintain GEU cookies to
                  avoid repeated logins
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-3 h-3 mt-1 text-primary" />
                <span>
                  <strong>Optimized Headers:</strong> Minimal necessary headers
                  reduce request size
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-3 h-3 mt-1 text-primary" />
                <span>
                  <strong>Direct Streaming:</strong> PDFs and images streamed
                  without buffering
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-3 h-3 mt-1 text-primary" />
                <span>
                  <strong>Error Prevention:</strong> Session validation prevents
                  failed requests
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h5 className="font-medium mb-2">Performance Comparison</h5>
        <div className="w-full max-w-full overflow-x-auto rounded-md">
          <CodeBlock
            language="text"
            code={`Official GEU Website:
• Page Load: ~3-5 seconds
• Navigation: Full page reload (2-3s each)
• Session Handling: Frequent timeouts
• Mobile Experience: Poor responsiveness

Our Implementation:
• Initial Load: ~1-2 seconds
• Navigation: Instant (0ms - no reload)
• Session Handling: Intelligent management
• Mobile Experience: Native-like performance`}
          />
        </div>
      </div>
    </div>
  </section>
);

export default SpeedOptimizationSection;
