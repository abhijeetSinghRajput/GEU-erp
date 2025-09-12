import { Cookie } from "lucide-react";
import React from "react";
import { CodeBlock } from "@/components/ui/code-block";

const SessionManagementSection = () => (
  <section id="session" className="space-y-6">
    <div className="flex items-center gap-3">
      <Cookie className="w-6 h-6 text-primary flex-shrink-0" />
      <h3>HTTP-Only Cookie Management & Header Manipulation</h3>
    </div>

    <div className="space-y-6">
      <div className="bg-muted/30 p-4 sm:p-6 rounded-lg border">
        <h4 className="font-semibold mb-4">How We Access HTTP-Only Cookies</h4>
        <p className="text-muted-foreground mb-4">
          We don't actually "access" HTTP-only cookies from the frontend - that
          would be a security violation. Instead, we use a sophisticated proxy
          pattern:
        </p>

        <div className="space-y-4">
          <div>
            <h5 className="font-medium mb-2">1. Cookie Jar Strategy</h5>
            <div className="w-full max-w-full overflow-x-auto rounded-md">
              <CodeBlock
                filename="backend/controllers/auth.controller.js"
                language="js"
                code={`// Server-side cookie management
import { CookieJar } from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";

const jar = new CookieJar();
const client = wrapper(axios.create({
  jar,
  withCredentials: true,
}));

// Cookies are stored server-side, never exposed to client`}
              />
            </div>
          </div>

          <div>
            <h5 className="font-medium mb-2">2. Session Persistence</h5>
            <div className="w-full max-w-full overflow-x-auto rounded-md">
              <CodeBlock
                filename="backend/controllers/auth.controller.js"
                language="js"
                code={`// Extract and store GEU session cookies
const cookies = await jar.getCookies("https://student.geu.ac.in/");
cookies.forEach(({ key, value }) => {
  res.cookie(key, value, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
});`}
              />
            </div>
          </div>

          <div>
            <h5 className="font-medium mb-2">3. Automatic Cookie Forwarding</h5>
            <div className="w-full max-w-full overflow-x-auto rounded-md">
              <CodeBlock
                filename="backend/utils/geuApi.js"
                language="js"
                code={`// fetchGEU utility automatically includes session cookies
export const fetchGEU = async (endpoint, req, options = {}) => {
  const sessionId = req.cookies["ASP.NET_SessionId"];
  const token = req.cookies["__RequestVerificationToken"];
  
  const headers = {
    Cookie: req.headers.cookie || 
           \`ASP.NET_SessionId=\${sessionId}; __RequestVerificationToken=\${token}\`
  };
}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SessionManagementSection;
