import { CheckCircle, Globe, Star } from "lucide-react";
import React from "react";

// Documentation Components
const OverviewSection = () => (
  <section id="overview" className="space-y-6">
    <div className="flex items-center gap-3">
      <Globe className="w-6 h-6 text-primary" />
      <h3>Project Overview</h3>
    </div>
    <div className="bg-muted/30 p-4 sm:p-6 rounded-lg border">
      <p className="text-lg font-medium mb-4">
        A high-performance proxy middleware that transforms the official GEU ERP
        into a modern, lightning-fast student portal.
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            What We Built
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Modern React frontend with priority-based modules</li>
            <li>• Express.js proxy server maintaining GEU sessions</li>
            <li>• Single-page architecture with drawers/dialogs</li>
            <li>• Optimized data fetching and caching strategies</li>
          </ul>
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" />
            Key Improvements
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• 3x faster than official website</li>
            <li>• Zero page reloads for core functions</li>
            <li>• Mobile-first responsive design</li>
            <li>• Intelligent session management</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default OverviewSection;
