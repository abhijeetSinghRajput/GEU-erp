import React from "react";
import { CodeBlock } from "@/components/ui/code-block";
import { CheckCircle, Settings } from "lucide-react";
import { useCookieStore } from "../../stores/useCookieStore";

const HeaderMimicingSection = () => {
  const { getBaseUrl } = useCookieStore();
  const baseUrl = getBaseUrl();
  return (
    <section id="headers" className="space-y-6">
      <div className="flex items-center gap-3">
        <Settings className="w-6 h-6 text-primary flex-shrink-0" />
        <h3>Why Header Mimicking is Necessary</h3>
      </div>

      <div className="space-y-6">
        <div className="bg-orange-50 dark:bg-orange-950/20 p-4 sm:p-6 rounded-lg border border-orange-200 dark:border-orange-800">
          <h4 className="font-semibold mb-4 text-orange-800 dark:text-orange-200">
            🛡️ GEU's Security Measures
          </h4>
          <p className="text-orange-700 dark:text-orange-300 mb-4">
            The official GEU ERP has strict security checks that block
            non-browser requests. Here's why we need to mimic legitimate browser
            behavior:
          </p>

          <div className="space-y-4">
            <div>
              <h5 className="font-medium mb-2">1. CSRF Protection</h5>
              <div className="w-full max-w-full overflow-x-auto rounded-md">
                <CodeBlock
                  filename="backend/utils/geuApi.js"
                  language="js"
                  code={`// GEU requires proper CSRF tokens
const defaultHeaders = {
  "__RequestVerificationToken": token,
  "X-Requested-With": "XMLHttpRequest",
  "Origin": "${baseUrl}",
  "Referer": referer,
};`}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Without proper CSRF tokens, all POST requests are rejected.
              </p>
            </div>

            <div>
              <h5 className="font-medium mb-2">2. Content-Type Validation</h5>
              <div className="w-full max-w-full overflow-x-auto rounded-md">
                <CodeBlock
                  filename="backend/utils/geuApi.js"
                  language="js"
                  code={`// Different endpoints expect specific content types
const isFormEncoded = customHeaders["Content-Type"] === 
  "application/x-www-form-urlencoded";

// Data must be properly encoded
data: isFormEncoded ? qs.stringify(data) : data`}
                />
              </div>

              <p className="text-sm text-muted-foreground mt-2">
                Some endpoints only accept form-encoded data, others expect
                JSON.
              </p>
            </div>

            <div>
              <h5 className="font-medium mb-2">3. Session Validation</h5>
              <div className="w-full max-w-full overflow-x-auto rounded-md">
                <CodeBlock
                  filename="backend/utils/geuApi.js"
                  language="js"
                  code={`// Check for unexpected login redirects
if (typeof res.data === "string" && 
    res.data.includes("<title>Graphic Era")) {
  throw new Error("❌ Invalid session or redirected to login page.");
}`}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                GEU silently redirects to login page for invalid sessions - we
                detect and handle this.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 p-4 sm:p-6 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="font-semibold mb-4 text-green-800 dark:text-green-200">
            ✅ Our Solution
          </h4>
          <p className="text-green-700 dark:text-green-300 mb-4">
            We replicate legitimate browser behavior while maintaining security:
          </p>

          <ul className="text-green-700 dark:text-green-300 space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1" />
              <span>
                <strong>Legitimate Authentication:</strong> Users provide real
                credentials
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1" />
              <span>
                <strong>Proper Session Handling:</strong> Maintain official GEU
                sessions
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1" />
              <span>
                <strong>Respect Rate Limits:</strong> Don't overwhelm GEU
                servers
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 mt-1" />
              <span>
                <strong>No Data Storage:</strong> We don't store sensitive user
                data
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HeaderMimicingSection;
