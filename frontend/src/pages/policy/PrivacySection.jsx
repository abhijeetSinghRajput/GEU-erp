import { UserLock } from "lucide-react";
import React from "react";

const PrivacySection = () => {
  return (
    <section id="privacy" className="space-y-4 md:space-y-6">
      <h3>
        <UserLock className="text-primary" />
        Privacy Policy
      </h3>
      <div className="text-muted-foreground space-y-4">
        <p>
          We value your privacy and are committed to protecting your personal
          information:
        </p>

        <ul className="list-disc space-y-2 pl-5">
          <li>
            We do not collect any personal information beyond what is required
            for authentication
          </li>
          <li>We do not use cookies for tracking purposes</li>
          <li>We do not share your data with any third parties</li>
          <li>All session data is cleared when you log out</li>
          <li>
            You can review our source code to verify our privacy practices
          </li>
        </ul>

        <p>
          <strong className="text-foreground">Last Updated:</strong> October 27,
          2023
        </p>
      </div>
    </section>
  );
};

export default PrivacySection;
