import React from "react";
import { CodeBlock } from "../../components/ui/code-block";
import { Layers } from "lucide-react";

const ArchitectureSection = () => (
  <section id="architecture" className="space-y-6">
    <div className="flex items-center gap-3">
      <Layers className="w-6 h-6 text-primary" />
      <h3>System Architecture</h3>
    </div>

    <div className="space-y-6">
      <div className="bg-muted/30 p-4 sm:p-6 rounded-lg border">
        <h4 className="font-semibold mb-4">Priority-Based Module System</h4>
        <p className="text-muted-foreground mb-4">
          We analyzed student usage patterns and prioritized the most frequently
          accessed features:
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="bg-muted p-4 rounded-lg border">
            <h5 className="font-semibold text-primary mb-2">
              Priority 0 (Instant)
            </h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Profile Information</li>
              <li>• Quick Stats</li>
              <li>• Navigation Menu</li>
            </ul>
          </div>
          <div className="bg-muted p-4 rounded-lg border">
            <h5 className="font-semibold mb-2">Priority 1 (Fast)</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Attendance Records</li>
              <li>• Current Notices</li>
              <li>• Recent Activity</li>
            </ul>
          </div>
          <div className="bg-muted p-4 rounded-lg border">
            <h5 className="font-semibold mb-2">Priority 2 (Lazy)</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Exam Results</li>
              <li>• Fee History</li>
              <li>• Document Downloads</li>
            </ul>
          </div>
        </div>

        <div className="w-full max-w-full overflow-x-auto rounded-md">
          <CodeBlock
            language="text"
            code={`Data Flow Architecture:

Client Request → Load Balancer → API Gateway
     ↓
Authentication Middleware → Session Validator
     ↓
Priority Router:
  ├── Priority 0: Immediate response from cache
  ├── Priority 1: Quick fetch with background update
  └── Priority 2: On-demand loading

GEU ERP ← Proxy Layer ← Request Processor`}
          />
        </div>
      </div>
    </div>
  </section>
);

export default ArchitectureSection;
