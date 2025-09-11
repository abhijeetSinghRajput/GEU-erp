import { Shield } from "lucide-react";
import React from "react";
import { CodeBlock } from "../../components/ui/code-block";

const SecuritySection = () => (
  <section id="security" className="space-y-6">
    <div className="flex items-center gap-3">
      <Shield className="w-6 h-6 text-primary" />
      <h3>Security & Privacy</h3>
    </div>

    <div className="space-y-6">
      <div className="bg-red-50 dark:bg-red-950/20 p-4 sm:p-6 rounded-lg border border-red-200 dark:border-red-800">
        <h4 className="font-semibold mb-4 text-red-800 dark:text-red-200">
          🔒 What We DON'T Do
        </h4>
        <ul className="text-red-700 dark:text-red-300 space-y-2">
          <li>• Store user passwords or sensitive credentials</li>
          <li>• Log or track user activity beyond error handling</li>
          <li>• Cache sensitive data like exam results or fee information</li>
          <li>• Share data with third parties or external services</li>
          <li>• Modify or alter any data from GEU ERP</li>
        </ul>
      </div>

      <div className="bg-green-50 dark:bg-green-950/20 p-4 sm:p-6 rounded-lg border border-green-200 dark:border-green-800">
        <h4 className="font-semibold mb-4 text-green-800 dark:text-green-200">
          ✅ What We DO
        </h4>
        <ul className="text-green-700 dark:text-green-300 space-y-2">
          <li>• Act as a secure proxy between you and GEU ERP</li>
          <li>• Maintain your session cookies server-side for performance</li>
          <li>• Validate and forward your authenticated requests</li>
          <li>• Provide enhanced error handling and user feedback</li>
          <li>• Implement rate limiting to protect GEU servers</li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold mb-4">Security Implementation</h4>
        <div className="w-full max-w-full overflow-x-auto rounded-md">
          <CodeBlock
            language="js"
            code={`// Session validation before each request
const checkAuth = async (req, res) => {
  const sessionId = req.cookies["ASP.NET_SessionId"];
  const token = req.cookies["__RequestVerificationToken"];
  
  if (!sessionId || !token) {
    return res.status(401).json({ authenticated: false });
  }
  
  // Verify session is still valid with GEU
  const response = await axios.get(GEU_DASHBOARD_URL, {
    headers: { Cookie: \`ASP.NET_SessionId=\${sessionId}; __RequestVerificationToken=\${token}\` },
    maxRedirects: 0,
    validateStatus: (status) => status === 200 || status === 302,
  });
  
  return res.json({ authenticated: response.status === 200 });
};`}
          />
        </div>
      </div>
    </div>
  </section>
);

export default SecuritySection;
