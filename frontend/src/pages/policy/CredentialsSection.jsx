import { ShieldCheck } from "lucide-react";
import React from "react";
import { useCookieStore } from "../../stores/useCookieStore";

const CredentialsSection = () => {
  const {getBaseUrl} = useCookieStore();
  const baseUrl = getBaseUrl();

  return (
    <section id="credentials" className="space-y-4 md:space-y-6">
      <h3>
        <ShieldCheck className="text-primary" />
        Credentials & Security
      </h3>
      <div className="text-muted-foreground space-y-4">
        <p>
          Your login credentials are{" "}
          <strong className="text-foreground">
            never stored, shared, or sold
          </strong>
          . They are used only to securely authenticate with the official GEU
          ERP system.
        </p>

        <p>Security measures we implement:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Secure encryption for all data transmissions</li>
          <li>Hashed password storage using industry-standard algorithms</li>
          <li>Regular security audits of our codebase</li>
          <li>Continuous monitoring for potential vulnerabilities</li>
        </ul>

        <p>
          All authentication happens directly with the official GEU ERP at{" "}
          <a
            href={baseUrl}
            className="text-primary hover:underline"
          >
            {baseUrl}
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default CredentialsSection;
