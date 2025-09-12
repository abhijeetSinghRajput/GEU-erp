import { FileText } from "lucide-react";
import React from "react";

const TermsSection = () => {
  return (
    <section id="terms" className="space-y-4 md:space-y-6">
      <h3>
        <FileText className="text-primary" />
        Terms of Service
      </h3>
      <div className="text-muted-foreground space-y-4">
        <p>
          By using the GEU Student Portal, you agree to the following terms:
        </p>

        <ul className="list-disc space-y-2 pl-5">
          <li>Use the portal for legitimate educational purposes only</li>
          <li>Not attempt to compromise the security of the system</li>
          <li>Respect the privacy of other users</li>
          <li>Abide by your institution's code of conduct</li>
          <li>
            Understand that this is a community project with no official
            affiliation
          </li>
        </ul>

        <blockquote>          "Your continued use of our services indicates your acceptance of these
          terms."
        </blockquote>
      </div>
    </section>
  );
};

export default TermsSection;
